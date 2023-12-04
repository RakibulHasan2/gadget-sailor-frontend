import { Link } from "react-router-dom";
import { IPayment, IPayments } from "../../types/PaymentType";

const OrderHistoryCard = ({ data }: IPayment) => {

    const { payment_code, totalPrice, _id } = data as IPayments;

    const product = (Object.keys(data) as (keyof typeof data)[])
        .filter(key => (key as string).endsWith("_product"))
        .map(key => data[key]);

    const image = (Object.keys(data) as (keyof typeof data)[])
        .filter(key => (key as string).endsWith("_image")
        )
        .map(key => data[key]);
    console.log(image);



    return (
        <div className="p-2">

            <div className="flex justify-center p-3">
                <div className="w-full mt-2 border lg:w-4/6 rounded-tr-2xl rounded-tl-2xl">
                    <div className="p-5 text-white bg-blue-900 rounded-tr-2xl rounded-tl-2xl">
                        <h1 className="text-lg font-bold">Order# {payment_code}</h1>
                    </div>
                    <div className="items-center justify-between p-4 lg:flex">
                        <div className="flex items-center pb-2 border-b-2 lg:border-b-0 lg:pb-0">
                            <img src={image[0]} className="w-28" alt="" />
                            <div >
                                <p className="font-bold">{product[0]}</p>
                                <div>
                                    {
                                        product.length > 1 &&
                                        <small>{`...+${product.length - 1} more`} items</small>
                                    }
                                </div>

                            </div>
                        </div>

                        <div className="flex justify-center mt-4 lg:flex-none lg:mt-0">
                            <p>Total Cost: {totalPrice}৳</p>
                        </div>

                        <div className="flex justify-center mt-4 lg:flex-none lg:mt-0">
                            <Link to={`/payment/orderDetails/${_id}`}> <button className="p-2 text-white bg-blue-700 border rounded-xl">View Details</button></Link>
                        </div>
                    </div>


                </div>

            </div>

        </div>


    );
};

export default OrderHistoryCard;