/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx";
import useProductData from "../../hooks/useProductData";
import { baseUrl } from "../../routes/Routes";

export default function DownloadProductListXLSX() {
    const { data: productList } = useProductData(`${baseUrl}/allProducts`);

    const downloadExcel = () => {
        if (!productList || productList.length === 0) return;

        const formattedData = productList.map((product: any, index: number) => ({
            "#": index + 1,
            "Product Name": product.product_name,
            "Model": product.model,
            "Brand": product.brand_name || "—",
            "Category": product.category_name,
            "Subcategory": product.sub_category_name || "—",
            "Price ($)": product.price,
            "Status": !product.quantity
                ? "Out of Stock"
                : product.status === "In Stock" || product.status === "In-stock"
                    ? "In Stock"
                    : "Out of Stock",
            "Quantity": product.quantity ?? "N/A",
            "Warranty": product.warranty,
            "Product Code": product.product_code,
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

        XLSX.writeFile(workbook, "Product_List.xlsx");
    };

    return (
        <div className="flex justify-end mb-5">
            <button
                className="border px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-800 hover:border-primary"
                onClick={downloadExcel}
            >
                Download Product Excel
            </button>
        </div>
    );
}
