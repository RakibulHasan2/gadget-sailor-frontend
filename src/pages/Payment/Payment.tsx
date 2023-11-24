import { useLoaderData } from "react-router-dom"
import { ICartDetails } from "../../types/CartModalType"

export default function Payment() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = useLoaderData() as any;
    const CartDetails = data.data as ICartDetails;
    console.log(CartDetails);
    return (
        <div>
            Payment Route
        </div>
    )
}
