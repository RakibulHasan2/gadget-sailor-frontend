import { Link } from 'react-router-dom';
import '../../styles/ProductsCard.css'
import { IProduct } from '../../types/ProductsType';
import { FaCartPlus } from 'react-icons/fa';
import React from 'react';
import CartModal from './CartModal';
import { userData } from '../../hooks/getUserData';
import LikeButton from '../Shared/LikeButton/LikeButton';
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from 'react-hot-toast';
import useFavData from '../../hooks/getFavData';

export default function ProductsCard({ product }: IProduct) {
    const { product_name, price, _id, image, model } = product;
    //console.log(product.quantity)
    const user = userData()
    const { data } = useFavData(`https://gadget-sailor-backend.onrender.com/api/v1/getFav/${user?.email}`);
    const CartDetails = async () => {
        const cartData = {
            product_name: product_name,
            image: image[0],
            unit_price: price,
            total_price: price,
            quantity: 1,
            model: model,
            email: user?.email,
            u_id: user.id,
            I_id: _id,

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

    const handleDelete = async (id: string, product_name: string) => {
        const filteredFav = data?.filter(f => f?.product_name === product_name);
        fetch(`https://gadget-sailor-backend.onrender.com/api/v1/allProducts/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok && filteredFav.length > 0) {
                    fetch(`https://gadget-sailor-backend.onrender.com/api/v1/getFav/${filteredFav[0]._id}`, {
                        method: 'DELETE'
                    })
                        .then(anotherResponse => {
                            if (anotherResponse.ok) {
                                toast.success("Successfully deleted");
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000);
                            }
                        })
                }
                else {
                    toast.success("Successfully deleted");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            })
    };

    return (
        <div className=''>
            {
                user?.email === 'gadgetsailoradmin@gmail.com' &&
                <div className='flex justify-end'>
                    <p onClick={() => handleDelete(_id, product_name)} className='text-lg mt-2 mr-4 mb-2'><RiDeleteBin5Line /></p>
                </div>

            }
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
                    {
                        user ?
                            <LikeButton
                                info={product} _id={''} category_name={''} sub_category_name={''} brand_name={''} product_name={''} image={[]} model={''} description={''} price={0} product_code={0} status={''} reviews={[]} warranty={''} __v={''} others_info={[]}                    ></LikeButton>

                            :
                            <button className="" title="add to favourite"
                                onClick={handleLike}
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            </button>
                    }
                    <CartModal
                        closeCartModal={closeCartModal}
                        isCartModalOpen={isCartModalOpen}
                        product_name={product_name}
                        count={1}
                        total={price}
                        _id={user?.id}
                    ></CartModal>
                </div>
            </div>
        </div>
    )
}
