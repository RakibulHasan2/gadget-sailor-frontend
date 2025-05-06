import { userData } from "../../hooks/getUserData";
import usePaymentInfo from "../../hooks/orderGet";


export default function OrderList() {
    const user = userData()
    const userEmail = user?.email;
    const order = usePaymentInfo(userEmail)
    console.log(order)
    return (
        <div>
            this is order list page
        </div>
    )
}
