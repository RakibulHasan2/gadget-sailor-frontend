import { FaTimes } from "react-icons/fa";

import { userData } from "../../hooks/getUserData";
import { MdDelete } from "react-icons/md";
import useFavData from "../../hooks/getFavData";


// interface FavModalProps {
//     onClose: () => void;
// }

const FavModal = () => {
    const user = userData();
    const { data, refetch } = useFavData(`http://localhost:5000/api/v1/getFav/${user.email}`);
    console.log(data)

    const handleDeleteFav = (id: string | undefined) => {

        console.log(id)

    }

    return (
        <div className="flex justify-center mt-10 mb-10">
            <div className=" w-9/12 lg:p-10 shadow-2xl">
                <p className="text-3xl font-bold">My favourites</p>
                <div className="overflow-x-auto mt-5">
                    <table className="table">
                        {/* head */}
                        <thead className="heading">
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Model</th>
                                <th>Price</th>
                                <th>Details</th>
                                <th>Delete</th>
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


                                        <td>{item.price}৳</td>
                                        <td><button className="btn">Details</button></td>
                                        <th><button onClick={() => handleDeleteFav(item._id)} className='text-2xl text-blue-900'>x</button></th>
                                        {/* <td>{item.total_price}৳	</td> */}
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {/* <div className="flex justify-end">
                        <div>
                            <p className="text-lg font-bold mb-4">Total: {calculateTotalPrice()}৳</p>
                            <button className="border p-3 rounded-lg bg-blue-900 text-white hover:bg-sky-700">Confirm Order</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default FavModal;