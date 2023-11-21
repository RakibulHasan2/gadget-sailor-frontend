import { FaCartPlus } from "react-icons/fa";
import { IProduct } from "../../types/ProductsType";
import { Link } from "react-router-dom";
import LikeButton from "../Shared/LikeButton/LikeButton";



const RandomProductCard = ({ data }: IProduct) => {
    // console.log(data)
    return (

        // <div className="items-center text-center border rounded-md card w-72 bg-base-100 shadow-slate-400 hover:border-blue-400 " >
        //     <figure className="w-full h-full px-10 pt-10">
        //         <img src={data.image[0]} className="rounded-xl" />
        //     </figure>
        //     <h2 className="mt-2 card-title">{data.product_name}</h2>
        //     <div className="grid items-center content-end grid-cols-1 gap-4 text-center card-body">


        //         <div className="flex-col card-actions">
        //             <p className="mb-0">Price: {data.price}</p>
        //             <button className="btn btn-primary">Buy Now</button>
        //         </div>
        //     </div>
        // </div>
        <div>
            <div className="relative w-full overflow-hidden transition-all duration-300 border border-transparent shadow-md card bg-base-100 hover:border-blue-400 hover:shadow-customBlue card-height rounded-xl">
                <figure className="h-full px-10 pt-10 transition-transform transform hover:scale-110">
                    <img src={data?.image[0]} alt="" className="rounded-xl" />
                </figure>

                <div className="items-center text-center card-body">
                    <Link to={`/product/${data?._id}`}>
                        <p className='w-full h-20 font-bold border-b-2 hover:text-blue-700'>{data?.product_name}</p>
                    </Link>
                    <div className="mt-5 card-actions">
                        <p className="font-bold text-yellow-700">{data?.price}৳</p>
                    </div>
                    <div>
                        <button className='flex items-center justify-center p-2 text-lg text-blue-700 bg-gray-100 rounded-md gap-x-3 w-44 hover:bg-blue-700 hover:text-white'><FaCartPlus></FaCartPlus> Buy now</button>
                    </div>
                    <LikeButton></LikeButton>
                </div>

            </div>


        </div>
    );
};

export default RandomProductCard;