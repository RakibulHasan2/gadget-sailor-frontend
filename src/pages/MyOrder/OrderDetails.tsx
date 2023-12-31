import { FaShippingFast } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { SiVirustotal } from "react-icons/si";
import { useLoaderDataType } from "../../types/useLoaderDataType";
import { useLoaderData } from "react-router-dom";
import { IPayments } from "../../types/PaymentType";
import OrderCancellationModal from "../../components/OrderCancellationModal/OrderCancellationModal";

export default function OrderDetails() {
    const orders = useLoaderData() as useLoaderDataType;
    const order = orders.data as unknown as IPayments;
    const { payment_code, firstName, lastName, phoneNumber, district, totalPrice, city, paymentMethod } = order;
    const subtotalPrice = (totalPrice as number - 60).toFixed(2) // d

    const product = (Object.keys(order) as (keyof typeof order)[])
        .filter(key => (key as string).endsWith("_product"))
        .map(key => order[key]);

    const image = (Object.keys(order) as (keyof typeof order)[])
        .filter(key => (key as string).endsWith("_image")
        )
        .map(key => order[key]);

    const quantity = (Object.keys(order) as (keyof typeof order)[])
        .filter(key => (key as string).endsWith("_quantity")
        )
        .map(key => order[key]);


    const price = (Object.keys(order) as (keyof typeof order)[])
        .filter(key => (key as string).endsWith("_price")
        )
        .map(key => order[key]);
    const delivary = 60;

    // cancellation modal
    const openCancelModal = () => {
        const modal = document.getElementById('cancelOrder') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };






    return (
        <div className="flex justify-center p-5 mt-3">

            <div className="w-full rounded-md shadow-xl lg:p-10 lg:w-2/3">
                <div className="flex justify-center p-2 text-3xl text-white bg-blue-800 border-b-2 rounded-tr-2xl rounded-tl-2xl">
                    <h1>Order Details #{payment_code}</h1>
                </div>
                <div className="border flex justify-center mt-2 bg-blue-500 p-2 text-white rounded-md">
                    <div>
                        <h2 className="flex justify-center font-bold">Shop Address:</h2>
                        <p>Shop : 211 & 213, 1st Floor, Aloka Nadi Bangla Complex, 4 Ram Babu Rd, Mymensingh 2200</p>
                    </div>

                </div>
                <div className="justify-between lg:flex">
                    <div className="flex justify-center p-5 mt-5 shadow-2xl lg:w-96 rounded-xl">
                        <div className="">
                            <div className="flex justify-center p-2 mb-2 font-bold text-white bg-blue-500 rounded-tr-2xl rounded-tl-2xl gap-x-1">
                                <span><FaShippingFast className='text-2xl animate-bounce' /></span> <h1>Shipping Address</h1>
                            </div>
                            <div className="flex border-b-2">
                                <h1 className="flex items-center gap-1 p-1 w-28"><MdPerson className='text-2xl text-blue-600' />To</h1>
                                <h1 className="w-40 p-2 ">: {firstName}{lastName}</h1>
                            </div>
                            <div className="flex border-b-2">
                                <h1 className="flex items-center gap-1 p-2 w-28"><FaCity className='text-lg text-blue-600' />District</h1>
                                <h1 className="w-40 p-2 ">: {district}</h1>
                            </div>
                            <div className="flex border-b-2">
                                <h1 className="flex gap-1 p-2 w-28"><FaLocationCrosshairs className='mt-1 text-lg text-blue-600 animate-spin' />Location</h1>
                                <h1 className="w-40 p-2">: {city}</h1>
                            </div>
                            <div className="flex">
                                <h1 className="flex items-center gap-1 p-2 w-28"><FaPhoneVolume className='text-lg text-blue-600' />Phone NO</h1>
                                <h1 className="w-40 p-2">: {phoneNumber}</h1>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-center p-5 mt-5 shadow-2xl lg:w-96 rounded-xl">
                        <div className="">
                            <div className="flex justify-center p-2 mb-2 font-bold text-white bg-blue-500 rounded-tr-2xl rounded-tl-2xl gap-x-1">
                                <span><MdPayment className='text-2xl animate-bounce' /></span> <h1>Order Summary</h1>
                            </div>
                            <div className="flex ">
                                <h1 className="flex items-center w-40 gap-1 p-3"><FaBangladeshiTakaSign className='text-lg text-blue-600' />Cost</h1>
                                <h1 className="w-40 p-2 ">: {totalPrice !== undefined ? `${subtotalPrice}৳` : 'N/A'}৳  </h1>
                            </div>
                            <div className="flex">
                                <h1 className="flex items-center w-40 gap-1 p-2"><MdDeliveryDining className='text-2xl text-blue-600' />Home Delivary</h1>
                                <h1 className="w-40 p-2">: <span>{delivary}৳</span></h1>
                            </div>
                            <div className="flex font-bold border-t-2">
                                <h1 className="flex items-center w-40 gap-2 p-2"><SiVirustotal className='text-lg text-blue-600' />Sub Total</h1>
                                <h1 className="w-40 p-2">: {totalPrice}৳</h1>
                            </div>
                            <div className="flex font-bold border-t-2">
                                <h1 className="flex items-center w-40 gap-2 p-2">
                                    Payment Status
                                </h1>
                                {
                                    paymentMethod === "Card Payment" ?
                                        <h1 className="w-40 p-2 ">: <span className="text-green-700">Paid</span></h1>
                                        : order?.cancelled ?
                                            <h1 className="w-40 p-2 ">: <span className="text-red-500">Order Cancelled</span></h1>
                                            :
                                            <h1 className="w-40 p-2 ">: <span className="text-red-500">Pending</span></h1>
                                }

                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-8 shadow-2xl">
                    <div className="flex justify-center p-2 text-lg font-bold text-white bg-blue-800 rounded-md">
                        <h1>Products</h1>
                    </div>
                    <div>
                        <div className="flex justify-between p-4">
                            <div className="">
                                <div className="flex justify-center p-1 mb-2 text-sm font-bold bg-blue-100 rounded-md lg:text-lg">
                                    <h1>Image</h1>
                                </div>

                                <div className="">
                                    {
                                        image.map(images =>
                                            <img src={images as string} className="h-24 p-2 border-b-2 lg:h-20 lg:w-20" alt="" />
                                        )
                                    }
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-center p-1 mb-2 text-sm font-bold bg-blue-100 rounded-md lg:text-lg">
                                    <h1 className="">Product Name</h1>
                                </div>

                                <div className="">
                                    {
                                        product.map(products =>
                                            <p className="h-24 p-2 pt-6 text-sm border-b-2 lg:h-20 lg:text-lg">{products}</p>
                                        )
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-center p-1 mb-2 text-sm font-bold bg-blue-100 rounded-md lg:text-lg">
                                    <h1>Quantity</h1>
                                </div>

                                <div>
                                    {
                                        quantity.map(q =>
                                            <p className="h-24 p-2 pt-6 border-b-2 lg:h-20 ">{q}</p>
                                        )
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-center p-1 mb-2 text-sm font-bold bg-blue-100 rounded-md lg:text-lg">
                                    <h1>Cost</h1>
                                </div>

                                <div>
                                    {
                                        price.map(cost =>
                                            <p className="h-24 p-2 pt-6 border-b-2 lg:h-20">{cost}৳</p>
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
                {
                    order?.cancelled ?
                        <></> :
                        <span className="flex justify-center mt-2 font-bold"><small>Want to cancel the order? <button onClick={openCancelModal} className="text-red-500">Cancel</button></small></span>
                }

            </div>
            {/* for all modal dialog */}
            <div>
                {
                    paymentMethod === "Card Payment" ?
                        <dialog id="cancelOrder" className="modal">
                            <div className="flex justify-center border modal-box rounded-3xl">
                                <div>
                                    <form method="dialog">
                                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                                            ✕
                                        </button>
                                    </form>
                                    <div className="flex justify-center p-5 mt-5 shadow-2xl lg:min-w-max rounded-xl">
                                        <div className="lg:w-96">
                                            <div className="flex justify-center p-2 mb-2 font-bold text-white bg-blue-500 rounded-tr-2xl rounded-tl-2xl gap-x-1">
                                                <h1>Cancel Order !!!</h1>
                                            </div>
                                            <div className="flex justify-center font-semibold bg-blue-100">Order Id #{payment_code}</div>
                                            <div className="p-2 font-semibold border-b-2">
                                                <p>"As this payment was done by the card gateway. If you Want to cancel the order and get the return money, Please Contact with us by the  phone number or email that is given below."</p>
                                                <p><span className="text-red-400">NB:</span> You have to contact with us within 2 days. </p>
                                            </div>
                                            <div className="flex pt-1">
                                                <h1 className="flex items-center gap-2 font-semibold w-36">
                                                    Phone Number
                                                </h1>
                                                <h1 className="">: 1580587952</h1>
                                            </div>
                                            <div className="flex items-center pt-1">
                                                <h1 className="flex content-center gap-2 font-semibold w-36">
                                                    Email
                                                </h1>
                                                <h1 className="">: gadgetsailoradmin@gmail.com</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </dialog>
                        :
                        <dialog id="cancelOrder" className="modal">
                            <div className="flex justify-center modal-box rounded-3xl">
                                <div>
                                    <form method="dialog">
                                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                                            ✕
                                        </button>
                                    </form>
                                    <div className="flex justify-center p-5 mt-5 shadow-2xl lg:w-96 rounded-xl">

                                        <OrderCancellationModal
                                            order={order}
                                        />
                                    </div>
                                </div>

                            </div>
                        </dialog>
                }





            </div>




        </div>

    )
}