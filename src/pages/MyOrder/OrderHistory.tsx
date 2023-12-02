/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { userData } from "../../hooks/getUserData"
import { IPayment } from "../../types/PaymentType";
// import { IPayment } from "../../types/PaymentType";




export default function OrderHistory() {

const user = userData()

const [order, setOrder] = useState< IPayment[]>([]);

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
console.log(order.email)



  return (
    <div>
      <h1>order history</h1>
    </div>
  )
}
