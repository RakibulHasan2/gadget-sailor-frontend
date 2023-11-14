import { Link } from 'react-router-dom';
import '../../styles/ProductsCard.css'
import { IProduct } from '../../types/ProductsType';


export default function ProductsCard({ product }: IProduct) {
    const { product_name, price, _id } = product;
    // console.log(product.image[0])
    return (
        <div>
            {/* <div className="w-full shadow-2xl card h-96 bg-base-100">
            <figure className="px-10 pt-10">
                <img src="https://globalexpressbd.com/wp-content/uploads/2021/10/i7-11700k-gaming-pc-500x500-1.jpg" alt="Shoes" className="rounded-xl" />
            </figure>
            <Link to={`/product/${_id}`}>
                <div className="items-center text-center card-body">
                    <p>{product_name}</p>
                    <div className="card-actions">
                        <p className="font-bold text-yellow-700">{price}৳</p>
                    </div>
                </div>
            </Link>
        </div> */}

            <div className="relative w-full overflow-hidden transition-all duration-300 border border-transparent shadow-md card h-96 bg-base-100 hover:border-blue-400 hover:shadow-customBlue">
                <figure className="px-10 pt-10 transition-transform transform hover:scale-110">
                    <img src="https://globalexpressbd.com/wp-content/uploads/2021/10/i7-11700k-gaming-pc-500x500-1.jpg" alt="Shoes" className="rounded-xl" />
                </figure>
               
                    <div className="items-center text-center card-body">
                         <Link to={`/product/${_id}`}>
                        <p>{product_name}</p>
                           </Link>
                        <div className="card-actions">
                            <p className="font-bold text-yellow-700">{price}৳</p>
                        </div>
                    </div>
             
            </div>


        </div>

    )
}
