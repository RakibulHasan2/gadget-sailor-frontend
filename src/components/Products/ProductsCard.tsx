import { Link } from 'react-router-dom';
import '../../styles/ProductsCard.css'
import { IProduct } from '../../types/ProductsType';
import { FaCartPlus } from 'react-icons/fa';


export default function ProductsCard({ product }: IProduct) {
    const { product_name, price, _id } = product;
   
    return (
        <div>

            <div className="relative w-full overflow-hidden transition-all duration-300 border border-transparent shadow-md card bg-base-100 hover:border-blue-400 hover:shadow-customBlue card-heigth">
                <figure className="px-10 pt-10 transition-transform transform hover:scale-110">
                    <img src="https://globalexpressbd.com/wp-content/uploads/2021/10/i7-11700k-gaming-pc-500x500-1.jpg" alt="Shoes" className="rounded-xl" />
                </figure>
               
                    <div className="items-center text-center card-body">
                         <Link to={`/product/${_id}`}>
                         <p className='w-full h-20 font-bold border-b-2 hover:text-blue-700'>{product_name}</p>
                           </Link>
                        <div className="mt-5 card-actions">
                            <p className="font-bold text-yellow-700">{price}৳</p>
                        </div>
                        <div>
                            <button className='flex items-center justify-center p-2 text-lg text-blue-700 bg-gray-100 rounded-md gap-x-3 w-44 hover:bg-blue-700 hover:text-white'><FaCartPlus></FaCartPlus> Buy now</button>
                        </div>
                    </div>
             
            </div>


        </div>

    )
}
