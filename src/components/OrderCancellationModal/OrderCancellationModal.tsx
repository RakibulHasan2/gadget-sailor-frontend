import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { IPayment, IPayments } from "../../types/PaymentType";
import { useEffect, useState } from "react";
import { UpdateProductValues, UpdateProductValuesResponse } from "../../types/ProductTypes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OrderCancellationModal = ({ order }: IPayment) => {
    const { payment_code, totalPrice, _id } = order as IPayments;
    const [iData, setIData] = useState<UpdateProductValues[]>([]);
    const navigate = useNavigate();

    const I_ids = (Object.keys(order) as (keyof typeof order)[])
        .filter(key => (key as string).endsWith("_I-id"))
        .map(key => order[key]);

    const Qunatities = (Object.keys(order) as (keyof typeof order)[])
        .filter(key => (key as string).endsWith("_quantity"))
        .map(key => order[key]);
    console.log(Qunatities)

    useEffect(() => {
        fetch('https://gadget-sailor-backend.onrender.com/api/v1/allProducts')
            .then(res => res.json())
            .then((data: UpdateProductValuesResponse) => {
                //console.log(data.data)
                const Data = data.data;
                setIData(Data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const filteredDataArray: UpdateProductValues[] = [];
    iData.map(d => {
        I_ids.forEach(i => {
            if (d._id === i) {
                filteredDataArray.push(d)
            }
        })
    })
    console.log(filteredDataArray)




    const handleAddPayment = async () => {

        const paymentData: IPayments = {
            cancelled: "cancelled",

        }
        const response = fetch(`https://gadget-sailor-backend.onrender.com/api/v1/getPayment/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        });
        const updatedPayment = await (await response).json();

        if (updatedPayment.statusCode === 200) {

            filteredDataArray.map(async d => {
                if (d.product_name === order[`${d.product_name}_product`]) {
                    const d_quantity = d.quantity as number;
                    const Quantity = d_quantity + order[`${d.product_name}_quantity`]
                    const productData: UpdateProductValues = {
                        quantity: Quantity
                    }
                    const response = fetch(`https://gadget-sailor-backend.onrender.com/api/v1/allProducts/${d._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(productData)
                    });
                    const product = await (await response).json();

                    if (product.statusCode === 200) {
                        toast.success(`${payment_code} : order is cancelled`)
                        navigate('/payment/orderHistory')
                    } else {
                        toast.error(product.message)
                    }
                }
            })
            // update data end


        } else {
            console.log(updatedPayment.message)
        }
    }




    return (
        <div className="">
            <div className="flex justify-center p-2 mb-2 font-bold text-white bg-blue-500 rounded-tr-2xl rounded-tl-2xl gap-x-1">
                <h1>Cancel Order</h1>
            </div>
            <div className="flex justify-center p-2 font-semibold bg-blue-100">Order Id #{payment_code}</div>
            <div className="flex p-2 border-b-2">
                <h1 className="flex items-center w-40 gap-1 "><FaBangladeshiTakaSign className='text-lg text-blue-600' />Total Price</h1>
                <h1 className="w-40 ">: {totalPrice}৳  </h1>
            </div>
            <div className="flex p-2 font-bold">
                <h1 className="flex items-center w-40 gap-2 ">
                    Payment Status
                </h1>
                <h1 className="w-40">: <span className="text-red-500">Pending</span></h1>
            </div>
            <div className="flex items-center justify-center w-full gap-2 pt-2 ">
                <button onClick={handleAddPayment} className="p-2 bg-blue-400 rounded hover:bg-red-700 hover:text-white">Cancel</button>
            </div>
        </div>
    );
};

export default OrderCancellationModal;