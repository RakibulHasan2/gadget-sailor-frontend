/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import useProductData from "../../hooks/useProductData"
import { baseUrl } from "../../routes/Routes"
import DownloadProductListXLSX from "../../components/ProductList/DownloadProductListXLSX"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { FiDelete } from "react-icons/fi"

const ITEMS_PER_PAGE = 20

export default function ProductList() {
    const { data, isLoading } = useProductData(`${baseUrl}/allProducts`)
    const [currentPage, setCurrentPage] = useState(1)

    const totalItems = data?.length || 0
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    const paginatedData = data?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const handleDelete = async (id: string, product_name: string) => {
        const filteredFav = data?.filter(f => f?.product_name === product_name);
        fetch(`${baseUrl}/allProducts/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok && filteredFav.length > 0) {
                    fetch(`${baseUrl}/getFav/${filteredFav[0]._id}`, {
                        method: 'DELETE'
                    })
                        .then(anotherResponse => {
                            if (anotherResponse.ok) {
                                toast.success("Successfully deleted");
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000);
                            }
                        })
                }
                else {
                    toast.success("Successfully deleted");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            })
    };

    return (
        <div className="p-6">
            <div className="flex justify-between p-4">
                <h2 className="text-3xl font-semibold mb-10">Product List</h2>
                <div>
                    <DownloadProductListXLSX />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner text-primary"></span>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Model</th>
                                    <th>Brand</th>
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th>Price ($)</th>
                                    <th>Status</th>
                                    <th>Quantity</th>
                                    <th>Warranty</th>
                                    <th>Code</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData?.map((product: any, index: number) => (
                                    <tr key={product._id}>
                                        <th>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</th>
                                        <td>
                                            <div className="w-16 h-16 rounded">
                                                <img
                                                    src={product.image?.[0]}
                                                    alt={product.product_name}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            </div>
                                        </td>
                                        <td>{product.product_name}</td>
                                        <td>{product.model}</td>
                                        <td>{product.brand_name || "—"}</td>
                                        <td>{product.category_name}</td>
                                        <td>{product.sub_category_name || "—"}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <span
                                                className={`font-semibold ${!product.quantity
                                                    ? "text-red-500"
                                                    : product.status === "In Stock" || product.status === "In-stock"
                                                        ? "text-green-600"
                                                        : "text-red-500"
                                                    }`}
                                            >
                                                {!product.quantity ? "Out of Stock" : product.status}
                                            </span>
                                        </td>
                                        <td>
                                            {product.quantity === undefined || product.quantity === null
                                                ? "N/A"
                                                : product.quantity}
                                        </td>
                                        <td>{product.warranty}</td>
                                        <td>{product.product_code}</td>
                                        <td>
                                            <Link to={`/product/${product._id}`}>
                                                <button>Details</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(product?._id, product?.product_name)} className="text-red-500"><FiDelete /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination controls */}
                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={handlePrev}
                            className="btn btn-sm"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="text-sm font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            className="btn btn-sm"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
