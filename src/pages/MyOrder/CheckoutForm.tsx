import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

//import { StripeError } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UpdateProductValues, UpdateProductValuesResponse } from "../../types/ProductTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckoutForm = ({ data }: any) => {
    const { totalPrice, firstName, lastName, email, phoneNumber } = data;
    console.log("Dattaaaa", data)   
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState<string | null>('')
    const [success, setSuccess] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [processing, setProcessing] = useState(false);
    const [iData, setIData] = useState<UpdateProductValues[]>([]);


    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    console.log(totalPrice)

    const ids = Object.keys(data)
        .filter(key => key.endsWith("_id"))
        .map(key => data[key]);

    const I_ids = Object.keys(data)
        .filter(key => key.endsWith("_I-id"))
        .map(key => data[key]);

    const Qunatities = Object.keys(data)
        .filter(key => key.endsWith("_quantity"))
        .map(key => data[key]);

    console.log(ids);
    console.log(I_ids);
    console.log(Qunatities);


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://gadget-sailor-backend.onrender.com/api/v1/payment/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${sessionStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                totalPrice
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                const Data = data.data;
                setClientSecret(Data.clientSecret)

            });
    }, [totalPrice]);


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







    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        console.log(event);
        event.preventDefault();
        if (!stripe || !elements) {

            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error?.message ?? '');
            console.log('cardError:', cardError);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('')
        }

        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: firstName + " " + lastName,
                        email: email,
                        phone: phoneNumber

                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError?.message ?? '');
            console.log('cardError:', cardError);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            console.log("card", card)

            const paymentData = {
                ...data,
                transactionId: paymentIntent.id
            }
            console.log("payment dataaaa",paymentData)
            // const productData: UpdateProductValues = {

            //     quantity:


            // }
            // console.log(paymentData)
            //console.log(productData)

            const response = await fetch(`https://gadget-sailor-backend.onrender.com/api/v1/addPayment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${sessionStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(paymentData)

            });
            const donePayment = await response.json();
            console.log(donePayment)
            if (donePayment.statusCode === 200 && ids.length > 0) {
                setSuccess('Congrats! Your payment is done')
                toast.success(donePayment.message);
                setTransactionId(paymentIntent.id)

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
                                navigate('/payment/orderHistory')
                            }
                        })
                })



                // update data

                filteredDataArray.map(async d => {
                    console.log(d)
                    if (d.product_name === data[`${d.product_name}_product`]) {
                        const d_quantity = d.quantity as number;
                        const Quantity = d_quantity - data[`${d.product_name}_quantity`]
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
                            navigate('/payment/orderHistory')
                        } else {
                            toast.error(product.message)
                        }
                    }
                })

            } else {
                toast.error("Payment isn't completed")
            }

        }
        setProcessing(false);
        console.log('paymentIntent', paymentIntent);

    }


    return (
        <>
            <form onSubmit={handleSubmit} className="">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',

                                },

                            },
                            invalid: {
                                color: '#9e2146',
                            },

                        },
                    }}
                    className="p-2 border"
                />
                <div className="flex justify-center">
                    <button className='mt-5 btn-flip speed' type="submit" data-front="Confirm Click" data-back="PAY" disabled={!stripe || !clientSecret || processing}>

                    </button>
                </div>

            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success &&
                <div>
                    <p className="text-green-500">{success}</p>
                    <p>Your TransactionId: <span className="font-bold">{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;