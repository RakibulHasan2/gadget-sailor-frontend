import { IProduct } from "../../types/ProductsType";
import "./RandomProductCard.css"


const RandomProductCard = ({ data }: IProduct) => {
    // console.log(data)
    return (
        <div className="card">
            <div className="image">
                <img src={data.image[0]} alt="/#" />
            </div>
            <div className="content">
                <h3>{data.category_name}</h3>
                <p>{ }</p>
            </div>
        </div>
    );
};

export default RandomProductCard;