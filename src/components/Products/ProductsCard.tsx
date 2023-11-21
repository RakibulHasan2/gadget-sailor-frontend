import { Link } from 'react-router-dom';
import '../../styles/ProductsCard.css'
import { IProduct } from '../../types/ProductsType';
import { FaCartPlus } from 'react-icons/fa';
import React from 'react';
import CartModal from './CartModal';
import { userData } from '../../hooks/getUserData';
import LikeButton from '../Shared/LikeButton/LikeButton';

export default function ProductsCard({ product }: IProduct) {
    const { product_name, price, _id, image, model } = product;
    const user = userData()
    const CartDetails = async () => {
        const cartData = {
            product_name: product_name,
            image: image[0],
            unit_price: price,
            total_price: price,
            quantity: 1,
            model: model,
            email: user.email
        }
        fetch('http://localhost:5000/api/v1/addCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartData),
        })

    }
    // for cart modal
    const [isCartModalOpen, setIsCartModalOpen] = React.useState(false);
    const openImageModal = () => {
        setIsCartModalOpen(true);
    };
    const closeCartModal = () => {
        setIsCartModalOpen(false);
    };

    const handleClick = () => {
        openImageModal();
        CartDetails();
    };
    return (
        <div>
            <div className="relative w-full overflow-hidden transition-all duration-300 border border-transparent shadow-md card bg-base-100 hover:border-blue-400 hover:shadow-customBlue card-height rounded-xl">
                <figure className="h-full px-10 pt-10 transition-transform transform hover:scale-110">
                    <img src={image[0]} alt="" className="rounded-xl" />
                </figure>

                <div className="items-center text-center card-body">
                    <Link to={`/product/${_id}`}>
                        <p className='w-full h-20 font-bold border-b-2 hover:text-blue-700'>{product_name}</p>
                    </Link>
                    <div className="mt-5 card-actions">
                        <p className="font-bold text-yellow-700">{price}৳</p>
                    </div>
                    <div>
                        <button onClick={handleClick} className='flex items-center justify-center p-2 text-lg text-blue-700 bg-gray-100 rounded-md gap-x-3 w-44 hover:bg-blue-700 hover:text-white'><FaCartPlus></FaCartPlus> Buy now</button>
                    </div>
                    <LikeButton
                        info={product} _id={''} category_name={''} sub_category_name={''} brand_name={''} product_name={''} image={[]} model={''} description={''} price={0} product_code={0} status={''} reviews={[]} warranty={''} __v={''} others_info={[]}                    ></LikeButton>
                    <CartModal
                        closeCartModal={closeCartModal}
                        isCartModalOpen={isCartModalOpen}
                        product_name={product_name}
                        count={1}
                        total={price}
                    ></CartModal>
                </div>

            </div>


        </div>

    )
}
