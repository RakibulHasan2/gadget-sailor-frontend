import { userData } from "../../hooks/getUserData";
import usePaymentInfo from "../../hooks/orderGet";
import { FaShippingFast } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { SiVirustotal } from "react-icons/si";

export default function OrderDetails() {
    const user = userData()
    const userEmail = user?.email;
    const order = usePaymentInfo(userEmail);
    const { email, payment_code, firstName, lastName, phoneNumber, district, comments, paymentMethod, deliveryMethod, transactionId, total_price, address, city, __v, _id, ...others } = order;

    console.log(order)

    const product = Object.keys(others)
        .filter(key => key.endsWith("_product")
        )
        .map(key => others[key]);
    console.log(product)

    const image = Object.keys(others)
        .filter(key => key.endsWith("_image")
        )
        .map(key => others[key]);
    console.log(image);

    const quantity = Object.keys(others)
        .filter(key => key.endsWith("_quantity")
        )
        .map(key => others[key]);
    const price = Object.keys(others)
        .filter(key => key.endsWith("_price")
        )
        .map(key => others[key]);

    console.log(quantity)
    console.log(image);
    const delivary = 60
    return (
        <div className="flex justify-center p-5 mt-3">

            <div className="w-2/3 p-10 rounded-md shadow-xl">
                <div className="flex justify-center p-2 text-3xl text-white bg-blue-800 border-b-2 rounded-tr-2xl rounded-tl-2xl">
                    <h1>Order Details #{payment_code}</h1>
                </div>
                <div className="flex justify-between">
                    <div className="flex justify-center p-5 mt-5 shadow-2xl w-96 rounded-xl">
                        <div className="">
                            <div className="flex justify-center p-2 mb-2 font-bold text-white bg-blue-500 rounded-tr-2xl rounded-tl-2xl gap-x-1">
                                <span><FaShippingFast className='text-2xl animate-bounce' /></span> <h1>Shipping Address</h1>
                            </div>
                            <div className="flex border-b-2">
                                <h1 className="flex items-center gap-1 p-1 w-28"><MdPerson className='text-2xl text-blue-600' />To</h1>
                                <h1 className="w-40 p-2 ">: {firstName}{lastName}</h1>
                            </div>
                            <div className="flex border-b-2">
                                <h1 className="flex items-center gap-1 p-2 w-28"><FaCity className='text-lg text-blue-600' />Distrcit</h1>
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
                    <div className="flex justify-center p-5 mt-5 shadow-2xl w-96 rounded-xl">
                        <div className="">
                            <div className="flex justify-center p-2 mb-2 font-bold text-white bg-blue-500 rounded-tr-2xl rounded-tl-2xl gap-x-2">
                                <span><MdPayment className='text-2xl animate-bounce' /></span> <h1>Order Summary</h1>
                            </div>
                            <div className="flex ">
                                <h1 className="flex items-center w-40 gap-1 p-3"><FaBangladeshiTakaSign className='text-lg text-blue-600' />Cost</h1>
                                <h1 className="w-40 p-2 ">: {total_price - 60}৳  </h1>
                            </div>
                            <div className="flex">
                                <h1 className="flex items-center w-40 gap-1 p-2"><MdDeliveryDining className='text-2xl text-blue-600' />Home Delivary</h1>
                                <h1 className="w-40 p-2">: <span>{delivary}৳</span></h1>
                            </div>
                            <div className="flex font-bold border-t-2">
                                <h1 className="flex items-center w-40 gap-2 p-2"><SiVirustotal className='text-lg text-blue-600' />Sub Total</h1>
                                <h1 className="w-40 p-2">: {total_price}৳</h1>
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
                                <div className="flex justify-center p-1 mb-2 font-bold bg-blue-100 rounded-md">
                                    <h1>Image</h1>
                                </div>

                                <div className="">
                                    {
                                        image.map(images =>
                                            <img src={images} className="w-24 h-20 p-2 border-b-2" alt="" />
                                        )
                                    }
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-center p-1 mb-2 font-bold bg-blue-100 rounded-md">
                                    <h1 className="">Product Name</h1>
                                </div>

                                <div className="">
                                    {
                                        product.map(products =>
                                            <p className="h-20 p-2 pt-6 border-b-2">{products}</p>
                                        )
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-center p-1 mb-2 font-bold bg-blue-100 rounded-md">
                                    <h1>Quantity</h1>
                                </div>

                                <div>
                                    {
                                        quantity.map(q =>
                                            <p className="h-20 p-2 pt-6 border-b-2 ">{q}</p>
                                        )
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-center p-1 mb-2 font-bold bg-blue-100 rounded-md">
                                    <h1>Cost</h1>
                                </div>

                                <div>
                                    {
                                        price.map(cost =>
                                            <p className="h-20 p-2 pt-6 border-b-2">{cost}৳</p>
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

            </div>

        </div>
    )
}
