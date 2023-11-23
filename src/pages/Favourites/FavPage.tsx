
import { userData } from "../../hooks/getUserData";
import useFavData from "../../hooks/getFavData";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";



// interface FavModalProps {
//     onClose: () => void;
// }

const FavPage = () => {
    const user = userData();
    const { data, refetch } = useFavData(`http://localhost:5000/api/v1/getFav/${user.email}`);
    console.log(data)


    const handleDeleteFav = (id: string | undefined) => {

        console.log(id)
        fetch(`http://localhost:5000/api/v1/getFav/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    toast.error("Removed from your favourite list")
                    refetch();

                }
            })

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
                                        <td><Link to={`/product/${item.I_id}`}><button className="btn">Details</button></Link></td>
                                        <th><button onClick={() => handleDeleteFav(item._id)} className='text-2xl text-blue-900'>x</button></th>

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default FavPage;