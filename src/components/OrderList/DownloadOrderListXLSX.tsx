/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx";
import { userData } from "../../hooks/getUserData";
import usePaymentInfo from "../../hooks/orderGet";

export default function DownloadOrderListXLSX() {
    const user = userData();
    const userEmail = user?.email;
    const orderList = usePaymentInfo(userEmail);

    const downloadExcel = () => {
        if (!orderList || orderList.length === 0) return;

        const formattedData = orderList.map((order: any, index: number) => {
            const totalProducts = Object.keys(order).filter(key => key.includes("_product")).length;

            return {
                "#": index + 1,
                Name: `${order.firstName} ${order.lastName}`,
                Email: order.email,
                Phone: order.phoneNumber,
                "Total Products": totalProducts,
                "Total Price ($)": order.totalPrice,
                "Transaction ID": order.cancelled
                    ? "N/A"
                    : order.paymentMethod === "Cash On Delivery"
                        ? "Cash Payment"
                        : order.transactionId,
                "Payment Method": order.paymentMethod,
                "Delivery Method": order.deliveryMethod,
                "Payment Status": order.cancelled ? "Canceled" : "Paid",
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

        XLSX.writeFile(workbook, "Order_List.xlsx");
    };

    return (
        <div className="flex justify-end mb-5">
            <button
                className="border px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-900  hover:border-primary"
                onClick={downloadExcel}
            >
                Download Excel Sheet
            </button>
        </div>
    );
}
