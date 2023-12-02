import { useLoaderData } from "react-router-dom"

import { useForm } from 'react-hook-form';
import { CheckoutFormValues } from "../../types/FormType";
import { userData } from "../../hooks/getUserData";
import { ICartResponse } from "../../types/CartModalType";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";


const stripePromise = loadStripe('pk_test_51M8NuoDiyv5tmMKuNdL0GTfndh3lFLwZKkkSn2ITrLo3HjeSIyf7tjD0vTCQqf6x6dGXKjgqm0XCTJdmFJEmgCge00LyoHRros');
//console.log(stripePromise)

export default function MyOrder() {

    const data = useLoaderData() as ICartResponse;
    const [userInfo, setUserInfo] = useState<CheckoutFormValues[]>([]);
    const [count, setCount] = useState(0);
    const user = userData()
    const CartDetails = data.data;
    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>();
    console.log(CartDetails);

    const calculateTotalPrice = () => {
        let totalPrice: number = 0;
        let withDeliveryPrice: number = 0;

        const hasCashOnDelivery = userInfo.some(item => item.paymentMethod === "Cash On Delivery");

        CartDetails.forEach((item) => {
            const price = Number(item.total_price);
            // const withDeliveryPrice = price + 60;
            totalPrice += price;
            withDeliveryPrice = totalPrice + 60;
        });

        return hasCashOnDelivery ? withDeliveryPrice.toFixed(2) : totalPrice.toFixed(2);
    };




    const checkoutInfo = CartDetails.map(item => (
        {
            [item.product_name]: item.product_name,
            [`${item.product_name}_price`]: item.unit_price,
            total_price: calculateTotalPrice(),

        }
    ));

    const checkoutInfoArray = Object.assign({}, ...checkoutInfo);

    const combinedObject = Object.assign({}, ...userInfo, checkoutInfoArray);

    const handleCount = () => {
        if (count === 0) {
            setCount(1)
        }
        else {
            setCount(0)
        }
    }

    const handleCheckout = async (data: CheckoutFormValues) => {

        console.log(data)
        // console.log(checkoutInfoArray)
        setUserInfo([data])
        handleCount();
    }



    // const handleFunctions = () => {
    //     handleCount();
    //     handleCheckout(info);
    // }

    console.log(userInfo)
    console.log(count)
    console.log(combinedObject)
    return (
        <div className="p-3 lg:p-5 lg:flex justify-evenly">
            <div className="mt-5 rounded-lg shadow-2xl lg:mt-0 lg:p-2">
                <div className="flex justify-center pt-3 lg:pt-0">
                    <p className="text-2xl font-bold">Customer Information</p>
                </div>

                <div className='w-full bg-transparent rounded-2xl lg:w-96 p-7'>
                    <form onSubmit={handleSubmit(handleCheckout)} className="">
                        <div className="flex gap-2 mb-4 ">

                            {/*User First Name */}
                            <div className="w-full max-w-xs form-control ">
                                <label htmlFor="">First Name</label>
                                <input defaultValue={user?.name?.firstName} type="text" {...register("firstName", {
                                    required: "First Name is Required !"
                                })} className="w-full max-w-xs bg-transparent input input-bordered input-info rounded-3xl" placeholder="First name..." />
                                {errors.firstName && <small className='mt-1 ml-2 text-red-500'>{errors.firstName?.message}</small>}
                            </div>

                            {/*User Last Name */}
                            <div className="w-full max-w-xs form-control">
                                <label htmlFor="">Last Name</label>
                                <input defaultValue={user?.name?.lastName} type="text" {...register("lastName", {
                                    required: "Last Name is Required !"
                                })} className="w-full max-w-xs bg-transparent input input-bordered input-info rounded-3xl" placeholder="Last name..." />
                                {errors.lastName && <small className='mt-1 ml-2 text-red-500'>{errors.lastName?.message}</small>}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="w-full max-w-xs mb-4 form-control">
                            <label htmlFor="">Email</label>
                            <input defaultValue={user?.email} type="email" {...register("email", {
                                required: "Email is Required !"
                            })} className="w-full max-w-xs bg-transparent input input-bordered input-info rounded-3xl" placeholder="✉ Email..." />
                            {errors.email && <small className='mt-1 ml-2 text-red-500'>{errors.email.message}</small>}
                        </div>

                        {/* Phone Number */}
                        <div className="w-full max-w-xs mb-4 form-control">
                            <label htmlFor="">Phone Number</label>
                            <input defaultValue={user?.phoneNumber} type="text" {...register("phoneNumber", {
                                required: "Phone Number is Required !",
                            })} className="w-full max-w-xs bg-transparent input input-bordered input-info rounded-3xl" placeholder="☏ Phone number..." />
                            {errors.phoneNumber && <small className='mt-1 ml-2 text-red-500'>{errors.phoneNumber.message}</small>}
                        </div>

                        {/* Address */}
                        <div className="w-full max-w-xs form-control">
                            <label htmlFor="">Address</label>
                            <input defaultValue={user?.present_address} type="text" {...register("address", {
                                required: "Address is Required !",
                            })} className="w-full max-w-xs bg-transparent input input-bordered input-info rounded-3xl" placeholder="House no, Road No/Name..." />
                            {errors.address && <small className='mt-1 ml-2 text-red-500'>{errors.address.message}</small>}
                        </div>

                        {/* City */}
                        <div className="flex gap-2 mt-5 mb-4">
                            <div className="w-full max-w-xs form-control ">
                                <label htmlFor="">City</label>
                                <input type="text" {...register("city", {
                                    required: "City is Required !"
                                })} className="w-full max-w-xs bg-transparent input input-bordered input-info rounded-3xl" placeholder="City..." />
                                {errors.firstName && <small className='mt-1 ml-2 text-red-500'>{errors.firstName?.message}</small>}
                            </div>


                            {/* District */}
                            <div className="w-full max-w-xs form-control">
                                <label htmlFor="">District</label>
                                <input type="text" {...register("district", {
                                    required: "District is Required !"
                                })} className="w-full max-w-xs bg-transparent input input-bordered input-info rounded-3xl" placeholder="District..." />
                                {errors.lastName && <small className='mt-1 ml-2 text-red-500'>{errors.lastName?.message}</small>}
                            </div>

                        </div>



                        {/* Comments */}
                        <div className="w-full max-w-xs form-control">
                            <label htmlFor="">Comments</label>
                            <textarea placeholder="Descriptions"
                                {...register("comments", {

                                })}
                                className="w-full max-w-xs pt-3 h-28 input input-bordered input-info rounded-3xl" />
                            {errors.comments && <p className='text-red-600'>{errors.comments?.message}</p>}
                        </div>


                        {/* Payment Method */}
                        <div className="w-full max-w-xs form-control pt-3">
                            <p>Payment Method:</p>

                            <label htmlFor="field-CashOnDelivery ">
                                <input
                                    {...register('paymentMethod', { required: 'Please select a payment method' })}
                                    type="radio"
                                    name="paymentMethod"
                                    value="Cash On Delivery"
                                    id="field-CashOnDelivery"
                                />
                                Cash On Delivery
                            </label>

                            <label htmlFor="field-CardPayment">
                                <input
                                    {...register('paymentMethod', { required: 'Please select a payment method' })}
                                    type="radio"
                                    name="paymentMethod"
                                    value="Card Payment"
                                    id="field-CardPayment"
                                />
                                Card Payment
                            </label>

                            {errors.paymentMethod && <p>{errors.paymentMethod.message}</p>}

                        </div>

                        {/* Delivery Method */}
                        <div className="w-full max-w-xs form-control pt-3">
                            <p>Delivery Method:</p>

                            <label htmlFor="field-HomeDelivery ">
                                <input
                                    {...register('deliveryMethod', { required: 'Please select delivery method' })}
                                    type="radio"
                                    name="deliveryMethod"
                                    value="Home Delivery"
                                    id="field-HomeDelivery"
                                />
                                Home Delivery
                            </label>

                            <label htmlFor="field-StorePickUp">
                                <input
                                    {...register('deliveryMethod', { required: 'Please select delivery method' })}
                                    type="radio"
                                    name="deliveryMethod"
                                    value="Store PickUp"
                                    id="field-StorePickUp"
                                />
                                Store PickUp
                            </label>

                            {errors.deliveryMethod && <p>{errors.deliveryMethod.message}</p>}

                        </div>

                        {/* Submit Button */}

                        <input className='w-full p-2 mt-4 mb-4 text-black bg-blue-400 btn rounded-3xl' value="Submit" type="submit" />
                    </form>
                </div>
            </div>
            <div className="p-5 shadow-lg rounded-xl">
                <div className="overflow-x-auto border-b-2">
                    <div className="flex justify-center p-2 mb-3 border-b-2">
                        <h2 className="text-lg font-semibold">Selected Products for payment:</h2>
                    </div>

                    <table className="table">
                        <thead className="heading">
                            <tr>
                                <th></th>
                                <th>Product Name</th>
                                <th>Model</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>



                        </thead>
                        <tbody className="row-info">
                            {
                                CartDetails.map((item, index) =>
                                    // row
                                    <tr key={item._id}>
                                        <th>{index + 1}</th>

                                        <td>{item.product_name}</td>
                                        <td>{item.model}</td>
                                        <td>{item.quantity}</td>

                                        <td>{item.unit_price}৳</td>
                                        <td>{item.total_price}৳	</td>
                                    </tr>

                                )
                            }
                            {
                                combinedObject?.paymentMethod === "Cash On Delivery" &&
                                <tr>
                                    Delivery Cost: 60 ৳
                                </tr>
                            }
                        </tbody>
                    </table>

                    {
                        combinedObject?.paymentMethod === "Cash On Delivery" ?
                            <p className="mb-4 text-lg font-bold">Total: {calculateTotalPrice()}৳</p>
                            :
                            <p className="mb-4 text-lg font-bold">Total: {calculateTotalPrice()}৳</p>
                    }

                </div>


                {
                    userInfo.length === 0 ?
                        <div className='my-12 lg:w-96' >
                            <button onClick={() => alert('Please fill up the customer information form at first.')} className='w-40 mt-4 btn btn-sm btn-primary'>Pay</button>
                        </div>
                        :
                        <>
                            {
                                combinedObject?.paymentMethod === "Card Payment" &&
                                <div className='p-3 my-12 border rounded-lg lg:w-full bg-slate-100' >
                                    <div className="flex justify-center p-3 mb-3 text-2xl font-bold text-blue-700 border-b-2">
                                        <h1 className="animate-pulse">Please enter the card details</h1>
                                    </div>
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm
                                            data={combinedObject} />
                                    </Elements>

                                </div>
                            }

                        </>


                }
            </div>

        </div>
    )
}
