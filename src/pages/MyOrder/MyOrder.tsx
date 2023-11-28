import { useLoaderData } from "react-router-dom"

import { useForm } from 'react-hook-form';
import { CheckoutFormValues } from "../../types/FormType";
import { userData } from "../../hooks/getUserData";
import { ICartResponse } from "../../types/CartModalType";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe('pk_test_51M8NuoDiyv5tmMKuNdL0GTfndh3lFLwZKkkSn2ITrLo3HjeSIyf7tjD0vTCQqf6x6dGXKjgqm0XCTJdmFJEmgCge00LyoHRros');

export default function MyOrder() {

    const data = useLoaderData() as ICartResponse;
    const user = userData()
    const CartDetails = data.data;
    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>();
    console.log(CartDetails);

    const calculateTotalPrice = () => {
        let totalPrice: number = 0;
        CartDetails.forEach((item) => {
            const price = Number(item.total_price);
            totalPrice += price;
        });
        return totalPrice.toFixed(2);
    };

    const handleCheckout = async (data: CheckoutFormValues) => {

        console.log(data)
        const checkoutInfo = {
            name: {
                firstName: data.firstName,
                lastName: data.lastName
            },
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            city: data.city,
            comments: data.comments
        }
        console.log(checkoutInfo)
    }
    return (
        <div className="flex gap-2">
            <div className="">
                <p className="text-2xl font-bold">Customer Information</p>
                <div className='bg-transparent rounded-2xl w-96 p-7'>
                    <form onSubmit={handleSubmit(handleCheckout)}>
                        <div className="flex gap-2 mb-4">

                            {/*User First Name */}
                            <div className="w-full max-w-xs form-control ">
                                <label htmlFor="">First Name</label>
                                <input defaultValue={user?.name?.firstName} type="text" {...register("firstName", {
                                    required: "First Name is Required !"
                                })} className="w-full max-w-xs bg-transparent input input-bordered" placeholder="First name..." />
                                {errors.firstName && <small className='mt-1 ml-2 text-red-500'>{errors.firstName?.message}</small>}
                            </div>

                            {/*User Last Name */}
                            <div className="w-full max-w-xs form-control">
                                <label htmlFor="">Last Name</label>
                                <input defaultValue={user?.name?.lastName} type="text" {...register("lastName", {
                                    required: "Last Name is Required !"
                                })} className="w-full max-w-xs bg-transparent  input input-bordered" placeholder="Last name..." />
                                {errors.lastName && <small className='mt-1 ml-2 text-red-500'>{errors.lastName?.message}</small>}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="w-full max-w-xs mb-4 form-control">
                            <label htmlFor="">Email</label>
                            <input defaultValue={user?.email} type="email" {...register("email", {
                                required: "Email is Required !"
                            })} className="w-full max-w-xs bg-transparent input input-bordered" placeholder="✉ Email..." />
                            {errors.email && <small className='mt-1 ml-2 text-red-500'>{errors.email.message}</small>}
                        </div>

                        {/* Phone Number */}
                        <div className="w-full max-w-xs mb-4 form-control">
                            <label htmlFor="">Phone Number</label>
                            <input defaultValue={user?.phoneNumber} type="text" {...register("phoneNumber", {
                                required: "Phone Number is Required !",
                            })} className="w-full max-w-xs bg-transparent input input-bordered" placeholder="☏ Phone number..." />
                            {errors.phoneNumber && <small className='mt-1 ml-2 text-red-500'>{errors.phoneNumber.message}</small>}
                        </div>

                        {/* Address */}
                        <div className="w-full max-w-xs form-control">
                            <label htmlFor="">Address</label>
                            <input type="text" {...register("address", {
                                required: "Password is Required !",
                            })} className="w-full max-w-xs bg-transparent input input-bordered" placeholder="House no, Road No/Name..." />
                            {errors.address && <small className='mt-1 ml-2 text-red-500'>{errors.address.message}</small>}
                        </div>

                        {/* City */}
                        <div className="flex gap-2 mb-4 mt-5">
                            <div className="w-full max-w-xs form-control ">
                                <label htmlFor="">City</label>
                                <input type="text" {...register("city", {
                                    required: "City is Required !"
                                })} className="w-full max-w-xs bg-transparent input input-bordered" placeholder="City..." />
                                {errors.firstName && <small className='mt-1 ml-2 text-red-500'>{errors.firstName?.message}</small>}
                            </div>


                            {/* District */}
                            <div className="w-full max-w-xs form-control">
                                <label htmlFor="">District</label>
                                <input type="text" {...register("district", {
                                    required: "District is Required !"
                                })} className="w-full max-w-xs bg-transparent  input input-bordered" placeholder="District..." />
                                {errors.lastName && <small className='mt-1 ml-2 text-red-500'>{errors.lastName?.message}</small>}
                            </div>
                        </div>

                        {/* Comments */}
                        <div className="w-full max-w-xs form-control">
                            <label htmlFor="">Comments</label>
                            <textarea placeholder="Descriptions"
                                {...register("comments", {

                                })}
                                className="w-full max-w-xs input input-bordered " />
                            {errors.comments && <p className='text-red-600'>{errors.comments?.message}</p>}
                        </div>
                        <input className='w-full p-2 mt-4 mb-4 text-black bg-blue-400 btn rounded-3xl' value="Submit" type="submit" />
                    </form>
                </div>
            </div>
            <div>
                <h2 className="text-lg font-semibold">Selected Products for payment:</h2>
                <table className="table">
                    {/* head */}
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
                    </tbody>
                </table>
                <p className="text-lg font-bold mb-4">Total: {calculateTotalPrice()}৳</p>
            </div>
        </div>
    )
}
