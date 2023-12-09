import { Link, useLoaderData } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { CheckoutFormValues } from "../../types/FormType";
import { userData } from "../../hooks/getUserData";
import { ICartResponse } from "../../types/CartModalType";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UpdateProductValues, UpdateProductValuesResponse } from "../../types/ProductTypes";


const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PK);
//console.log(stripePromise)

export default function MyOrder() {

    const data = useLoaderData() as ICartResponse;
    const [userInfo, setUserInfo] = useState<CheckoutFormValues[]>([]);
    const [count, setCount] = useState(0);
    const user = userData()
    const [iData, setIData] = useState<UpdateProductValues[]>([]);
    const CartDetails = data.data;
    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>();
    //console.log(CartDetails);
    // console.log(data);

    const calculateTotalPrice = () => {
        let totalPrice: number = 0;
        let withDeliveryPrice: number = 0;

        const hasCashOnDelivery = userInfo.some(item => item.deliveryMethod === "Home Delivery");

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
            [`${item.product_name}_product`]: item.product_name,
            [`${item.product_name}_price`]: item.unit_price,
            [`${item.product_name}_quantity`]: item.quantity,
            [`${item.product_name}_id`]: item._id,
            [`${item.product_name}_I-id`]: item.I_id,
            [`${item.product_name}_image`]: item.image,

            totalPrice: calculateTotalPrice(),
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

    const ids = Object.keys(combinedObject)
        .filter(key => key.endsWith("_id"))
        .map(key => combinedObject[key]);

    const I_ids = Object.keys(combinedObject)
        .filter(key => key.endsWith("_I-id"))
        .map(key => combinedObject[key]);

    useEffect(() => {
        fetch('https://gadget-sailor-backend.onrender.com/api/v1/allProducts')
            .then(res => res.json())
            .then((data: UpdateProductValuesResponse) => {
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

    const handleAddPayment = async () => {
        const response = await fetch(`https://gadget-sailor-backend.onrender.com/api/v1/addPayment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${sessionStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(combinedObject)

        });
        const donePayment = await response.json();
        console.log(donePayment)
        if (donePayment.statusCode === 200 && ids.length > 0) {

            toast.success(donePayment.message);


            // deleting from the cart

            ids.forEach(async (id) => {

                fetch(`https://gadget-sailor-backend.onrender.com/api/v1/getCart/${id}`, {
                    method: 'DELETE'
                })
                    .then(anotherResponse => {
                        if (anotherResponse.ok) {

                            // setTimeout(() => {
                            //     toast.success("Successfully deleted");
                            // }, 1000);
                            //navigate('/home')
                        }
                    })
            })



            // update data

            filteredDataArray.map(async d => {
                //console.log(d)
                if (d.product_name === combinedObject[`${d.product_name}_product`]) {
                    const d_quantity = d.quantity as number;
                    const Quantity = d_quantity - combinedObject[`${d.product_name}_quantity`]
                    //console.log(Quantity)
                    const productData: UpdateProductValues = {
                        quantity: Quantity
                    }
                    //console.log(productData)

                    const response = fetch(`https://gadget-sailor-backend.onrender.com/api/v1/allProducts/${d._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(productData)
                    });
                    const product = await (await response).json();

                    if (product.statusCode === 200) {
                        //toast.success(product.message)
                        // navigate('/home')
                    } else {
                        toast.error(product.message)
                    }
                }
            })

        } else {
            toast.error("Payment isn't completed")
        }
    }

    // console.log(userInfo)
    // console.log(checkoutInfo)
    // console.log(checkoutInfoArray)
    // console.log(checkoutInfoArray.length)
    // console.log(Object.keys(checkoutInfoArray).length);
    //console.log(combinedObject)


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
                                combinedObject?.deliveryMethod === "Home Delivery" &&
                                <tr>
                                    Delivery Cost: 60 ৳
                                </tr>
                            }
                        </tbody>
                    </table>

                    {
                        combinedObject?.deliveryMethod === "Home Delivery" ?
                            <p className="mb-4 text-lg font-bold">Total: {calculateTotalPrice()}৳</p>
                            :
                            <p className="mb-4 text-lg font-bold">Total: {calculateTotalPrice()}৳</p>
                    }

                </div>


                {
                    userInfo.length !== 0 && Object.keys(checkoutInfoArray).length !== 0 ?
                        (<div>
                            {
                                combinedObject?.paymentMethod === "Card Payment" ?
                                    <div className='p-3 my-12 border rounded-lg lg:w-full bg-slate-100' >
                                        <div className="flex justify-center p-3 mb-3 text-2xl font-bold text-blue-700 border-b-2">
                                            <h1 className="animate-pulse">Please enter the card details</h1>
                                        </div>
                                        <Elements stripe={stripePromise}>
                                            <CheckoutForm
                                                data={combinedObject} />
                                        </Elements>


                                    </div>
                                    :
                                    <div className='my-12 lg:w-96' >
                                        <Link to='/payment/orderHistory'>
                                            <button onClick={handleAddPayment} className='w-40 mt-4 btn btn-sm btn-primary'>Confirm Order</button>
                                        </Link>
                                    </div>
                            }

                        </div>)
                        :


                        (
                            userInfo.length !== 0 && Object.keys(checkoutInfoArray).length === 0
                                ? (
                                    <div className='my-12 lg:w-96'>
                                        <button onClick={() => alert("You haven't chosen any product.")} className='w-40 mt-4 btn btn-sm btn-primary'>Confirm Order</button>
                                    </div>
                                )
                                : (
                                    <div className='my-12 lg:w-96'>
                                        <button onClick={() => alert('Please fill up the customer information form first.')} className='w-40 mt-4 btn btn-sm btn-primary'>Confirm Order</button>
                                    </div>
                                )
                        )



                }
            </div>

        </div>
    )
}
