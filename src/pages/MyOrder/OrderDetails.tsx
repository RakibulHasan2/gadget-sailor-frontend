import { userData } from "../../hooks/getUserData";
import usePaymentInfo from "../../hooks/orderGet";
export default function OrderDetails() {
    const user = userData()
    const userEmail = user?.email;
    const order = usePaymentInfo(userEmail);
    const { email, payment_code, firstName, lastName, phoneNumber, district, comments, paymentMethod, deliveryMethod, transactionId, total_price, address, city, __v, _id, ...others } = order;
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
    return (
        <div className="flex justify-center p-5 mt-3">
            
            <div className="w-2/3 p-10 rounded-md shadow-xl">
                <div className="flex justify-center p-2 text-3xl text-white bg-blue-800 border-b-2 rounded-tr-2xl rounded-tl-2xl">
                    <h1>Order Details #{payment_code}</h1>
                </div>
                <div className="flex justify-between">
                    <div className="flex justify-center p-5 mt-5 shadow-lg w-96 rounded-xl">
                        <div className="">
                            <div className="flex justify-center mb-2">
                                <h1>Shipping Address</h1>
                            </div>
                            <div className="flex border-b-2">
                                <h1 className="p-2 w-28 ">To</h1>
                                <h1 className="w-40 p-2 ">: {firstName}{lastName}</h1>
                            </div>
                            <div className="flex border-b-2">
                                <h1 className="p-2 w-28 ">Distrcit</h1>
                                <h1 className="w-40 p-2 ">: {district}</h1>
                            </div>
                            <div className="flex border-b-2">
                                <h1 className="p-2 w-28">Location</h1>
                                <h1 className="w-40 p-2">: {city}</h1>
                            </div>
                            <div className="flex border-b-2">
                                <h1 className="p-2 w-28">Phone NO</h1>
                                <h1 className="w-40 p-2">: {phoneNumber}</h1>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-center p-5 mt-5 shadow-lg w-96 rounded-xl">
                        <div className="">
                            <div className="flex justify-center mb-2">
                                <h1>Order Summary</h1>
                            </div>
                            <div className="flex ">
                                <h1 className="p-2 w-28 ">Cost</h1>
                                <h1 className="w-40 p-2 ">: {total_price}৳  </h1>
                            </div>
                            <div className="flex">
                                <h1 className="p-2 w-28 ">Distrcit</h1>
                                <h1 className="w-40 p-2 ">: {district}</h1>
                            </div>
                            <div className="flex border-b-2">
                                <h1 className="p-2 w-28">Location</h1>
                                <h1 className="w-40 p-2">: {city}</h1>
                            </div>
                            <div className="flex border-b-2">
                                <h1 className="p-2 w-28">Phone NO</h1>
                                <h1 className="w-40 p-2">: {phoneNumber}</h1>
                            </div>
                        </div>

                    </div>
                </div>


            </div>

        </div>
    )
}
