import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

//import { StripeError } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckoutForm = ({ data }: any) => {
    const { total_price, firstName, lastName, email, phoneNumber } = data;
    console.log(data)
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState<string | null>('')
    const [success, setSuccess] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    console.log(total_price)



    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/api/v1/payment/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${sessionStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                total_price
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                const Data = data.data;
                setClientSecret(Data.clientSecret)
                console.log(data.data.clientSecret)
            });
    }, [total_price]);


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
        }
        console.log(clientSecret)

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
            setSuccess('Congrats! Your payment is done')
            setTransactionId(paymentIntent.id)
        }
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
                    <button className='mt-5 btn-flip speed' type="submit" data-front="Confirm Click" data-back="PAY" disabled={!stripe || !clientSecret}>

                    </button>
                </div>

            </form>
            <p className="text-red-500">{cardError}</p>
        </>
    );
};

export default CheckoutForm;