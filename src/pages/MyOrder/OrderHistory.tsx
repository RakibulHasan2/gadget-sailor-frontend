import { userData } from "../../hooks/getUserData"
import usePaymentInfo from "../../hooks/orderGet";
import OrderHistoryCard from "./OrderHistoryCard";
import '../../styles/Text-shadow.css'
export default function OrderHistory() {
  const user = userData()
  const userEmail = user?.email;
  const order = usePaymentInfo(userEmail)
  return (
    <div>
      <div className="flex justify-center mt-5 text-3xl font-bold text-shadow-blue">
        <h1>Order History</h1>
      </div>
      <div>
        {
          order.map(data => (
            <OrderHistoryCard
              key={String(data._id)}
              data={data}
            />
          ))
        }
      </div>
    </div>
  )
}
