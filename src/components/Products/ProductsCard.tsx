import { Link } from 'react-router-dom';
import '../../styles/ProductsCard.css'
import { IProduct } from '../../types/ProductsType';


export default function ProductsCard({ product }: IProduct) {
    const { product_name, price, _id } = product;
    // console.log(product.image[0])
    return (
        <div className="card w-72 h-96 bg-base-100 shadow-2xl">
            <figure className="px-10 pt-10">
                <img src="https://globalexpressbd.com/wp-content/uploads/2021/10/i7-11700k-gaming-pc-500x500-1.jpg" alt="Shoes" className="rounded-xl" />
            </figure>
            <Link to={`/product/${_id}`}>
                <div className="card-body items-center text-center">
                    <p>{product_name}</p>
                    <div className="card-actions">
                        <p className="text-yellow-700 font-bold">{price}৳</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
