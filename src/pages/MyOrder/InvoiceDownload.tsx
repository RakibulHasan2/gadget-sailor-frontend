import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { useLoaderDataType } from "../../types/useLoaderDataType";
import { IPayments } from "../../types/PaymentType";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InvoiceDownload() {
    const orders = useLoaderData() as useLoaderDataType;
    const order = orders.data as unknown as IPayments;
    const { totalPrice, paymentMethod } = order;
    const subtotalPrice = (totalPrice as number - 60).toFixed(2);
    const deliveryFee = 60;

    const products = Object.entries(order).filter(([key]) => key.endsWith('_product'));
    const images = Object.entries(order).filter(([key]) => key.endsWith('_image'));
    const quantities = Object.entries(order).filter(([key]) => key.endsWith('_quantity'));
    const prices = Object.entries(order).filter(([key]) => key.endsWith('_price'));


    const invoiceRef = React.useRef<HTMLDivElement | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleDownload = async () => {
        if (!invoiceRef.current) return;
        try {
            setIsDownloading(true);

            const element = invoiceRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true,
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4",
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Invoice-${order.payment_code}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    console.log(order)
    return (
        <div className="mt-10 mb-10 lg:w-[80%] w-[90%] mx-auto">
            <div
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#c7d0f2",
                    padding: "2rem",
                    border: "1px solid #0d1a49",
                }}
            >
                <div
                    ref={invoiceRef}
                    style={{
                        maxWidth: "64rem",
                        margin: "0 auto",
                        backgroundColor: "white",
                        borderRadius: "0.75rem",
                        boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        overflow: "hidden",
                    }}
                >
                    {/* Invoice Header */}
                    <div style={{ borderBottom: "1px solid #e5e7eb", padding: "2rem" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "1.5rem",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <h1
                                    style={{
                                        fontSize: "1.875rem",
                                        fontFamily: "serif",
                                        fontWeight: "bold",
                                        color: "#1f2937",
                                    }}
                                >
                                    Gadget Sailor
                                </h1>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "2rem",
                                fontSize: "0.875rem",
                            }}
                        >
                            <div>
                                <p style={{ fontWeight: "500" }}>Rakibul Hasan, Inc.</p>
                                <p style={{ color: "#4b5563" }}>123 Fashion Avenue</p>
                                <p style={{ color: "#4b5563" }}>Uttara, Dhaka</p>
                                <p style={{ color: "#4b5563" }}>Bangladesh</p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <p>
                                    <span style={{ color: "#6b7280" }}>Web:</span>{" "}
                                    gadgetsailor.com
                                </p>
                                <p>
                                    <span style={{ color: "#6b7280" }}>Email:</span>{" "}
                                    contact@gadgetsailor.com
                                </p>
                                <p>
                                    <span style={{ color: "#6b7280" }}>Phone:</span> +880 1788 756299
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div
                        style={{
                            padding: "2rem",
                            borderBottom: "1px solid #e5e7eb",
                            backgroundColor: "#f9fafb",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "1.25rem",
                                fontFamily: "serif",
                                color: "#1f2937",
                                marginBottom: "1rem",
                            }}
                        >
                            Customer Information
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <p style={{ marginBottom: "0.5rem" }}>
                                    <span style={{ color: "#6b7280" }}>Name:</span>{" "}
                                    <span style={{ fontWeight: "500" }}>{order?.firstName}</span>
                                </p>
                                <p style={{ marginBottom: "0.5rem" }}>
                                    <span style={{ color: "#6b7280" }}>Email:</span>{" "}
                                    <span style={{ fontWeight: "500" }}>
                                        {order?.email}
                                    </span>
                                </p>
                                <p style={{ marginBottom: "0.5rem" }}>
                                    <span style={{ color: "#6b7280" }}>Phone:</span>{" "}
                                    <span style={{ fontWeight: "500" }}>
                                        {order?.phoneNumber}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p style={{ marginBottom: "0.5rem" }}>
                                    <span style={{ color: "#6b7280" }}>Order ID:</span>{" "}
                                    <span style={{ fontWeight: "500" }}>{order?.payment_code}</span>
                                </p>
                                <p style={{ marginBottom: "0.5rem" }}>
                                    <span style={{ color: "#6b7280" }}>Transaction ID:</span>{" "}
                                    <span style={{ fontWeight: "500" }}>
                                        {order?.transactionId}
                                    </span>
                                </p>
                                <p style={{ marginBottom: "0.5rem" }}>
                                    <span style={{ color: "#6b7280" }}>Payment Status:</span>{" "}
                                    <span style={{
                                        fontWeight: "600",
                                        color:
                                            order?.cancelled
                                                ? "#dc2626"
                                                : paymentMethod === "Card Payment"
                                                    ? "#15803d"
                                                    : "#dc2626"
                                    }}>
                                        {
                                            paymentMethod === "Card Payment"
                                                ? "Paid"
                                                : order?.cancelled
                                                    ? "Order Cancelled"
                                                    : "Pending"
                                        }
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div style={{ padding: "2rem" }}>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "separate",
                                borderSpacing: "0",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            padding: "0.75rem",
                                            textAlign: "left",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                            color: "#6b7280",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        Product
                                    </th>
                                    <th
                                        style={{
                                            padding: "0.75rem",
                                            textAlign: "left",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                            color: "#6b7280",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        SKU
                                    </th>
                                    <th
                                        style={{
                                            padding: "0.75rem",
                                            textAlign: "right",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                            color: "#6b7280",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        Qty
                                    </th>
                                    <th
                                        style={{
                                            padding: "0.75rem",
                                            textAlign: "right",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                            color: "#6b7280",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        Price
                                    </th>
                                    <th
                                        style={{
                                            padding: "0.75rem",
                                            textAlign: "right",
                                            fontSize: "0.75rem",
                                            fontWeight: "500",
                                            color: "#6b7280",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            {products.map(([, name], index) => (
                                <tr key={index}>
                                    <td style={{ padding: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                        <img
                                            src={images[index][1] as string}
                                            alt={name as string}
                                            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
                                        />
                                        <span>{name}</span>
                                    </td>
                                    <td style={{ padding: "0.75rem", fontSize: "0.875rem", color: "#374151" }}>
                                        SKU-{index + 1}
                                    </td>
                                    <td style={{ padding: "0.75rem", textAlign: "right", fontSize: "0.875rem", color: "#374151" }}>
                                        {quantities[index][1]}
                                    </td>
                                    <td style={{ padding: "0.75rem", textAlign: "right", fontSize: "0.875rem", color: "#374151" }}>
                                        {prices[index][1]}৳
                                    </td>
                                    <td style={{ padding: "0.75rem", textAlign: "right", fontSize: "0.875rem", color: "#374151" }}>
                                        {Number(prices[index][1]) * Number(quantities[index][1])}৳
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>

                    {/* Totals */}
                    <div
                        style={{
                            padding: "2rem",
                            backgroundColor: "#f9fafb",
                            borderTop: "1px solid #e5e7eb",
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Downloaded Date: {today}
                        </div>
                        <div>
                            <div style={{ maxWidth: "16rem", marginLeft: "auto" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    <span style={{ color: "#4b5563" }}>Cost:</span>
                                    <span style={{ fontWeight: "500" }}>
                                        ${subtotalPrice}
                                    </span>
                                </div>
                            </div>
                            <div style={{ maxWidth: "16rem", marginLeft: "auto" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    <span style={{ color: "#4b5563" }}>Delivery Fee:</span>
                                    <span style={{ fontWeight: "500" }}>
                                        ${deliveryFee}
                                    </span>
                                </div>
                            </div>
                            <div style={{ maxWidth: "16rem", marginLeft: "auto" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    <span style={{ color: "#4b5563" }}>Total:</span>
                                    <span style={{ fontWeight: "500" }}>
                                        ${order.totalPrice}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            padding: "2rem",
                            textAlign: "center",
                            fontSize: "0.875rem",
                            color: "#6b7280",
                            borderTop: "1px solid #e5e7eb",
                        }}
                    >
                        <p>Thank you for shopping with Gadget Sailor.</p>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {/* Button */}
                    <div
                        style={{
                            maxWidth: "64rem",
                            margin: "2rem auto 0",
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "1rem",
                        }}
                    >
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.625rem 1.5rem",
                                backgroundColor: "#2d51d1",
                                color: "white",
                                borderRadius: "0.5rem",
                                cursor: isDownloading ? "not-allowed" : "pointer",
                                opacity: isDownloading ? "0.75" : "1",
                            }}
                        >
                            {isDownloading ? (
                                <>
                                    <svg
                                        style={{
                                            animation: "spin 1s linear infinite",
                                            height: "1rem",
                                            width: "1rem",
                                        }}
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            style={{ opacity: "0.25" }}
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            style={{ opacity: "0.75" }}
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Download Invoice
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
