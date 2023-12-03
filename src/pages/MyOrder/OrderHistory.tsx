import { userData } from "../../hooks/getUserData"
import { Link } from "react-router-dom";
import usePaymentInfo from "../../hooks/orderGet";
export default function OrderHistory() {
  const user = userData()
  const userEmail = user?.email;
  const order = usePaymentInfo(userEmail);
  const { email, payment_code, firstName, lastName, phoneNumber, district, comments, paymentMethod, deliveryMethod, transactionId, total_price, address, city, __v, _id, ...others } = order;
  const product = Object.keys(others)
    .filter(key => key.endsWith("_product")
    )
    .map(key => others[key]);
  const image = Object.keys(others)
    .filter(key => key.endsWith("_image")
    )
    .map(key => others[key]);
  console.log(image);

  return (
    <div className="p-2">
      <div className="flex justify-center text-3xl">
        <h1>Order History</h1>
      </div>
      <div className="flex justify-center p-3">
        <div className="w-4/6 mt-2 border rounded-tr-2xl rounded-tl-2xl">
          <div className="p-5 text-white bg-blue-900 rounded-tr-2xl rounded-tl-2xl">
            <h1 className="text-lg font-bold">Order# {payment_code}</h1>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <img src={image[0]} className="w-28" alt="" />
              <div >
              <p className="font-bold">{ product[0]}</p>
              <div>
                <small>{`...+${product.length - 1} more`} items</small>
              </div>
             
            </div>
            </div>
            
            <div>
              <p>Total Cost: {total_price}৳</p>
            </div>

           <div>
             <Link to='/payment/orderDetails'> <button className="p-2 text-white bg-blue-700 border rounded-xl">View Details</button></Link>
            </div>
          </div>


        </div>

      </div>

    </div>
  )
}
