import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
//import { StripeError } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckoutForm = ({ data }: any) => {

    console.log(data)
    const [clientSecret, setClientSecret] = useState("");
    // const [cardError, setCardError] = useState<string | null>(null)
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/api/v1/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);


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
            //setCardError(error)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }


    }


    return (
        <>
            <form onSubmit={handleSubmit}>
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
                />
                <button className='btn btn-sm mt-4 btn-primary' type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {/* <p className="text-red-50">{cardError}</p> */}
        </>
    );
};

export default CheckoutForm;