import { Link } from "react-router-dom";
import { IProduct } from "../../types/ProductsType";
import { CgChevronRight } from "react-icons/cg";

const SuggestedData = ({ data }: IProduct) => {
    return (
        <div className=" lg:mr-0">
            <div className="mb-2 shadow-xl card lg:w-96 bg-base-100">
                <div className="card-body">
                    <div className="flex items-center">
                        <img src={data.image[0]} alt="Product" className="mr-4 rounded-xl w-14" />
                        <div className="w-3/4 mr-4">
                            <h2 className="text-lg font-semibold">{data.model}</h2>
                            <p>Price: {data.price}</p>
                        </div>
                        <Link to={`/product/${data._id}`} className=""><button className="flex items-center justify-center p-2 px-2 text-white bg-blue-900 rounded-xl"> <span>Details</span> <CgChevronRight className='mt-1'></CgChevronRight></button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuggestedData;