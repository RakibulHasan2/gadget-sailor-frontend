import '../../styles/MyOrder.css';
import { Link } from 'react-router-dom';
import { userData } from './../../hooks/getUserData';
import useCartData from "../../hooks/useCartData";

export default function MyOrder() {
  const { data, refetch } = useCartData("http://localhost:5000/api/v1/getCart");
  const user = userData()
  const calculateTotalPrice = () => {
    let totalPrice: number = 0;
    data.forEach((item) => {
      const price = Number(item.total_price);
      totalPrice += price;
    });
    return totalPrice.toFixed(2);
  };
  const handleDeleteCart = (id: string) => {
    fetch(`http://localhost:5000/api/v1/getCart/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          refetch();
        }
      })
  }

  return (
    <div className="flex justify-center mt-10 mb-10">
      <div className="lg:w-9/12 lg:p-10 shadow-2xl">
        <p className="text-3xl font-bold">Shopping Cart</p>
        <div className="overflow-x-auto mt-5">
          <table className="table">
            {/* head */}
            <thead className="heading">
              <tr>
                <th></th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Model</th>
                <th>Quantity</th>
                <th></th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="row-info">
              {
                data.map((item, index) =>
                  // row
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td> {item.image && typeof item.image === 'string' ? (
                      <img className="w-16" src={item.image} alt="" />
                    ) : (
                      <span>No Image</span>
                    )}</td>
                    <td>{item.product_name}</td>
                    <td>{item.model}</td>
                    <td>{item.quantity}</td>
                    <th><button onClick={() => handleDeleteCart(item._id)} className='text-2xl text-blue-900'>x</button></th>
                    <td>{item.unit_price}৳</td>
                    <td>{item.total_price}৳	</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <div className="flex justify-end">
            <div>
              <p className="text-lg font-bold mb-4">Total: {calculateTotalPrice()}৳</p>
              {/* <Link to={`/payment/${user?.email}`}> */}
              <Link to="/payment/pay">
                <button className="border p-3 rounded-lg bg-blue-900 text-white hover:bg-sky-700">Confirm Order</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
