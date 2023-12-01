import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckoutForm = ({ data }: any) => {
    console.log(data)
    const stripe = useStripe();
    const elements = useElements();


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
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }


    }


    return (
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
            <button className='mt-5 btn-flip speed' type="submit" data-front="Confirm Click" data-back="PAY" disabled={!stripe}>
                Pay
            </button>
            </div>
            
        </form>
    );
};

export default CheckoutForm;