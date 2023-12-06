import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { IPayments } from "../../types/PaymentType";

const OrderCancellationModal = ({ payment_code, totalPrice }: IPayments) => {

    //console.log(data)

    //const { payment_code, totalPrice } = data;
    return (
        <div className="">
            <div className="flex justify-center p-2 mb-2 font-bold text-white bg-blue-500 rounded-tr-2xl rounded-tl-2xl gap-x-1">
                <h1>Cancel Order</h1>
            </div>
            <div className="bg-blue-100 font-semibold">Order Id #{payment_code}</div>
            <div className="flex ">
                <h1 className="flex items-center w-40 gap-1 "><FaBangladeshiTakaSign className='text-lg text-blue-600' />Total Price</h1>
                <h1 className="w-40  ">: {totalPrice}৳  </h1>
            </div>
            <div className="flex font-bold ">
                <h1 className="flex items-center w-40 gap-2 ">
                    Payment Status
                </h1>
                <h1 className="w-40">: <span className="text-red-500">Pending</span></h1>
            </div>
            <div className="flex justify-center items-center w-40 gap-2 ml-12 pt-2">
                <button className="bg-blue-400 p-1 rounded">Cancel</button>
            </div>
        </div>
    );
};

export default OrderCancellationModal;