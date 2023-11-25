import { Link } from "react-router-dom";
import { IProduct } from "../../types/ProductsType";


const SingleCards = ({ data }: IProduct) => {
    console.log(data)
    return (
        <div>
            <div className=" w-60 max-h-64 border border-transparent shadow-md card bg-base-100 hover:border-blue-400 hover:shadow-customBlue card-height rounded-xl mr-10 ">
                <figure className="h-full px-10 mt-4 transition-transform transform hover:scale-110">
                    <img src={data?.image} alt="" className="rounded-xl" />
                </figure>

                <div className="items-center text-center card-body p-2">
                    <Link to={`/product/${data?.I_id}`}>
                        <p className='w-full h-16 font-bold  hover:text-blue-700'>{data?.product_name}</p>
                    </Link>
                    <p className="font-bold text-yellow-700">{data?.price}৳</p>

                </div>


            </div>
        </div>
    );
};

export default SingleCards;