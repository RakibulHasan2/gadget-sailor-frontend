import { FaCartPlus } from "react-icons/fa";
import { IProduct } from "../../../types/ProductsType";
import { Link } from "react-router-dom";
import LikeButton from "../../Shared/LikeButton/LikeButton";
import React from "react";
import { userData } from "../../../hooks/getUserData";
import CartModal from "../../Products/CartModal";

const RandomProductCard = ({ data }: IProduct) => {
    const { product_name, price, image, model } = data;
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
        fetch('https://gadget-sailor-backend.onrender.com/api/v1/addCart', {
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

    const handleLike = () => {
        alert('Please log in to add into the favourite.');

    }

    return (
        <div>
            <div className="relative w-full overflow-hidden transition-all duration-300 border border-transparent shadow-md card bg-base-100 hover:border-blue-400 hover:shadow-customBlue card-height rounded-xl lg:mt-0 mt-10">
                <figure className="h-full px-10 pt-10 transition-transform transform hover:scale-110">
                    <img src={data?.image[0]} alt="" className="rounded-xl" />
                </figure>

                <div className="items-center text-center card-body">
                    <Link to={`/product/${data?._id}`}>
                        <p className='w-full h-20 font-bold border-b-2 hover:text-blue-700'>{data?.product_name}</p>
                    </Link>
                    <div className="mt-5 card-actions">
                        <p className="font-bold text-yellow-700">{data?.price}৳</p>
                    </div>
                    <div>
                        <button onClick={handleClick} className='flex items-center justify-center p-2 text-lg text-blue-700 bg-gray-100 rounded-md gap-x-3 w-44 hover:bg-blue-700 hover:text-white'><FaCartPlus></FaCartPlus> Buy now</button>
                    </div>
                    {
                        user ?
                            <LikeButton
                                info={data} _id={""} category_name={""} sub_category_name={""} brand_name={""} product_name={""} image={[]} model={""} description={""} price={0} product_code={0} status={""} reviews={[]} warranty={""} __v={""} others_info={[]}                    ></LikeButton>

                            :
                            <button className="" title="add to favourite"
                                onClick={handleLike}
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            </button>
                    }
                </div>
                {/* cart modal */}
                <CartModal
                    closeCartModal={closeCartModal}
                    isCartModalOpen={isCartModalOpen}
                    product_name={product_name}
                    count={1}
                    total={price}
                ></CartModal>
            </div>
        </div>
    );
};

export default RandomProductCard;