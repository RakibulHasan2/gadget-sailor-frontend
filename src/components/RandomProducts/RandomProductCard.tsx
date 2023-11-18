import { IProduct } from "../../types/ProductsType";



const RandomProductCard = ({ data }: IProduct) => {
    // console.log(data)
    return (
        <div className="card w-72 bg-base-100 shadow-xl  ">
            <figure className="px-10 pt-10 w-full h-40">
                <img src={data.image[0]} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Shoes!</h2>

                <div className="card-actions ">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default RandomProductCard;