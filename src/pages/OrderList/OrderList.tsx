/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { userData } from "../../hooks/getUserData";
import usePaymentInfo from "../../hooks/orderGet";
import { Link } from 'react-router-dom';
import DownloadOrderListXLSX from "../../components/OrderList/DownloadOrderListXLSX";

export default function OrderList() {
    const user = userData();
    const userEmail = user?.email;
    const orderList = usePaymentInfo(userEmail);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate paginated data
    const totalItems = orderList?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentOrders = orderList?.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between p-4">
                <h2 className="text-3xl font-semibold mb-10">Order List</h2>
                <div>
                    <DownloadOrderListXLSX />
                </div>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Total Products</th>
                            <th>Total Price ($)</th>
                            <th>Transaction ID</th>
                            <th>Payment</th>
                            <th>Delivery</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders?.map((order: any, index: number) => (
                            <tr key={order._id}>
                                <th>{startIndex + index + 1}</th>
                                <td>{order.firstName} {order.lastName}</td>
                                <td>{order.email}</td>
                                <td>{order.phoneNumber}</td>
                                <td>
                                    {Object.keys(order).filter(key => key.includes("_product")).length}
                                </td>
                                <td>{order.totalPrice}</td>
                                <td>
                                    {order.cancelled ? (
                                        "N/A"
                                    ) : order.paymentMethod === "Cash On Delivery" ? (
                                        "Cash Payment"
                                    ) : (
                                        order.transactionId
                                    )}
                                </td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.deliveryMethod}</td>
                                <td>
                                    {order.cancelled ? (
                                        <span className="text-red-500 font-semibold">Canceled</span>
                                    ) : (
                                        <span className="text-green-600 font-semibold">Paid</span>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/payment/orderDetails/${order?._id}`}> <button className="px-4 py-2 text-white bg-blue-700 border rounded-xl hover:bg-blue-900">Details</button></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center mt-6 gap-2">
                <button
                    className="btn btn-sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={`btn btn-sm ${currentPage === i + 1 ? "btn-active btn-primary" : ""}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className="btn btn-sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
