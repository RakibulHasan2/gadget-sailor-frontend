import { IProduct } from "../../types/ProductsType";


const RandomProductCard = ({ data }: IProduct) => {
    console.log(data)
    return (
        <div>
            {data.product_name}
        </div>
    );
};

export default RandomProductCard;