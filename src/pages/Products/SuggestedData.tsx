import { Link } from "react-router-dom";
import { IProduct } from "../../types/ProductsType";
import { CgChevronRight } from "react-icons/cg";

const SuggestedData = ({ data }: IProduct) => {
    console.log(data)
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl mb-2">
                <div className="card-body">
                    <div className="flex items-center">
                        <img src={data.image[0]} alt="Shoes" className="rounded-xl w-14 mr-4" />
                        <div className="mr-4 w-3/4">
                            <h2 className="text-lg font-semibold">{data.model}</h2>
                            <p>Price: {data.price}</p>
                        </div>

                        <Link to={`/product/${data._id}`} className="flex items-center border d"><button className="">Details </button><CgChevronRight /></Link>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default SuggestedData;