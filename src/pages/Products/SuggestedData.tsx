import { IProduct } from "../../types/ProductsType";

const SuggestedData = ({ data }: IProduct) => {
    console.log(data)
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl mb-2">
                <div className="card-body">
                    <div className="flex justify-between items-center">
                        <img src={data.image[0]} alt="Shoes" className="rounded-xl w-14" />
                        <div>
                            <h2 className="text-lg font-semibold">{data.brand_name}</h2>
                            <p>Price: {data.price}</p>
                        </div>

                        <button className="btn">Detail</button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default SuggestedData;