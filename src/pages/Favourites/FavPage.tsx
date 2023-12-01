
import { userData } from "../../hooks/getUserData";
import useFavData from "../../hooks/getFavData";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import '../../styles/Loader.css'
const FavPage = () => {
    const user = userData();
    const { data, refetch, isLoading } = useFavData(`http://localhost:5000/api/v1/getFav/${user.email}`);
    const handleDeleteFav = (id: string | undefined) => {
        fetch(`http://localhost:5000/api/v1/getFav/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    toast.success("Removed from your favorite list")
                    refetch();
                }
            })
    }



    console.log(data)

    return (
        <div className="flex justify-center mt-10 mb-10">
            <div className="w-9/12 shadow-2xl lg:p-10">
                <p className="p-2 text-3xl font-bold border-b-2">My favourites</p>
                {!isLoading ?
                    <div className="mt-5 overflow-x-auto">
                       { data.length !== 0 ? 
                        <table className="table">
                            <thead className="heading">
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Model</th>
                                    <th>Price</th>
                                    <th>Details</th>
                                    <th>Remove</th>
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

                        </table>: 
                                <div className="flex justify-center p-4">
                                    <h1>You do not add any favourites Products</h1>
                                </div>}
                    </div>
                    :
                    <div className="flex justify-center w-full p-3">
                        
                            <span className="loader-love"></span>
                     
                    </div>}

            </div>
        </div>
    );
};

export default FavPage;