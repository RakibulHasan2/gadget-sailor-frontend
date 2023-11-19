import { IProduct } from "../../types/ProductsType";



const RandomProductCard = ({ data }: IProduct) => {
    // console.log(data)
    return (
        <div className="card w-72 bg-base-100 shadow-xl rounded-md shadow-slate-400 items-center text-center border hover:border-blue-400" >
            <figure className="px-10 pt-10 w-full h-40">
                <img src={data.image[0]} className="rounded-xl" />
            </figure>
            <h2 className="card-title mt-2">{data.product_name}</h2>
            <div className="card-body items-center text-center grid grid-cols-1 gap-4 content-end">


                <div className="card-actions flex-col">
                    <p className="mb-0">Price: {data.price}</p>
                    <button className="btn btn-outline bg-blue-300">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default RandomProductCard;