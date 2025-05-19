import '../../styles/MyCart.css';
import { Link } from 'react-router-dom';
import { userData } from '../../hooks/getUserData';
import useCartData from "../../hooks/useCartData";
import '../../styles/Text-shadow.css'
import { baseUrl } from '../../routes/Routes';
export default function MyCart() {
  const user = userData()
  const { data, refetch, isLoading } = useCartData(`${baseUrl}/getCart/${user?.id}`);

  console.log(data)
  const calculateTotalPrice = () => {
    let totalPrice: number = 0;
    data.forEach((item) => {
      const price = Number(item.total_price);
      totalPrice += price;
    });
    return totalPrice.toFixed(2);
  };
  const handleDeleteCart = (id: string) => {
    fetch(`${baseUrl}/getCart/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          refetch();
        }
      })
  }

  const handleUpdateQuantity = (id: string, quantity: number, unit_price: number) => {
    const payload = {
      quantity,
      total_price: quantity * unit_price
    }
    if (quantity < 1) return;

    fetch(`${baseUrl}/getCart/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.ok) {
          console.log(response)
          refetch();
        }
      })
  }

  return (
    <div className="flex justify-center mt-10 mb-10">
      <div className="w-11/12 shadow-2xl lg:w-9/12 lg:p-10 rounded-2xl">
        <div className='flex justify-center pb-2 mb-3 border-b-2'>
          <p className="text-3xl font-bold text-shadow-blue">Shopping Cart</p>
        </div>
        {!isLoading ?
          <div className="mt-5 overflow-x-auto">
            {data.length !== 0 ?
              <table className="table">
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
                        <td>
                          <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1, item?.unit_price)} className="px-2 py-1 bg-gray-200 rounded-lg mr-2">-</button>
                          {item.quantity}
                          <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1, item?.unit_price)} className="px-2 py-1 bg-gray-200 rounded-lg ml-2">+</button>
                        </td>
                        <th><button onClick={() => handleDeleteCart(item._id)} className='text-2xl text-blue-900'>x</button></th>
                        <td>{item.unit_price}৳</td>
                        <td>{item.total_price}৳	</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              :
              <div className="flex justify-center p-4 text-2xl">
                <h1>(Your shopping cart is empty...)</h1>
              </div>}
            <div className="flex justify-end border-t-2">
              <div>
                <p className="mb-4 text-lg font-bold">Total: {calculateTotalPrice()}৳</p>

                {
                  data.length !== 0 ?
                    <Link to={`/payment/myOrder/${user?.id}`}>
                      <button className="p-3 mb-3 text-white bg-blue-900 border rounded-lg hover:bg-sky-700">Confirm Order</button>
                    </Link>
                    :

                    <button disabled className="p-3 mb-3 text-white bg-blue-900 border rounded-lg hover:bg-sky-700">Confirm Order</button>

                }


              </div>
            </div>
          </div> :
          <div className="flex justify-center w-full p-3">

            <span className="loader-love"></span>

          </div>}
      </div>
    </div>
  )
}
