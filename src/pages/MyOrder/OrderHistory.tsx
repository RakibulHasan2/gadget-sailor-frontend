/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { userData } from "../../hooks/getUserData"
import { IPayment } from "../../types/PaymentType";
import { Link } from "react-router-dom";
// import { IPayment } from "../../types/PaymentType";




export default function OrderHistory() {

  const user = userData()

  const [order, setOrder] = useState<IPayment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/getPayment/${user?.email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const info = result.data[0]
        setOrder(info);
      } catch (error) {
        throw new Error("Network response failed: " + JSON.stringify(error));
      }
    };

    fetchData();

  }, [user?.email]);



  const { email, payment_code, firstName, lastName, phoneNumber, district, comments, paymentMethod, deliveryMethod, transactionId, total_price, address, city, __v, _id, ...others } = order;

  // const othersLength = Object.keys(others).length;
console.log(order)

  const product = Object.keys(others)
  .filter(key =>  key.endsWith("_product")
  )
  .map(key => others[key]);
  console.log(product);

  return (
    <div className="p-2">
      <div className="flex justify-center text-3xl">
        <h1>Order History</h1>
      </div>
      <div className="flex justify-center p-3">
        <div className="w-4/6 mt-2 border rounded-tr-2xl rounded-tl-2xl">


          <div className="p-3 text-white bg-blue-900 rounded-tr-2xl rounded-tl-2xl">
            <h1 className="text-lg font-bold">Order# {payment_code}</h1>
          </div>
          <div>
            {
              product[0]
            }{`...+${product.length-1} more`}
          </div>
          <div>
            <h1>{total_price}</h1>
          </div>

          <div>
            <Link to='/payment/orderHistory-details'><button className="btn">View Details</button></Link>
          </div>

        </div>

      </div>

    </div>
  )
}
