import useApiData from "../../hooks/getAPIData";
import '../../styles/MyOrder.css';

export default function MyOrder() {
  const { data, refetch } = useApiData("http://localhost:5000/api/v1/getCart");

  const calculateTotalPrice = () => {
    let totalPrice: number = 0;
    data.forEach((item) => {
      const price = parseFloat(item.total_price);
      totalPrice += price;
    });
    return totalPrice;
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
      <div className=" w-9/12 lg:p-10 shadow-2xl">
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
                  <tr>
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
              <button className="border p-3 rounded-lg bg-blue-900 text-white hover:bg-sky-700">Confirm Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
