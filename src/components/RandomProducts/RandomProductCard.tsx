import { FaCartPlus } from "react-icons/fa";
import { IProduct } from "../../types/ProductsType";
import { Link } from "react-router-dom";
import React from "react";
import { userData } from "../../hooks/getUserData";
import CartModal from "../Products/CartModal";



const RandomProductCard = ({ data }: IProduct) => {
    const { product_name, price, image,model } = data;
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

        // <div className="items-center text-center border rounded-md card w-72 bg-base-100 shadow-slate-400 hover:border-blue-400 " >
        //     <figure className="w-full h-full px-10 pt-10">
        //         <img src={data.image[0]} className="rounded-xl" />
        //     </figure>
        //     <h2 className="mt-2 card-title">{data.product_name}</h2>
        //     <div className="grid items-center content-end grid-cols-1 gap-4 text-center card-body">


        //         <div className="flex-col card-actions">
        //             <p className="mb-0">Price: {data.price}</p>
        //             <button className="btn btn-primary">Buy Now</button>
        //         </div>
        //     </div>
        // </div>
        <div>
            <div className="relative w-full overflow-hidden transition-all duration-300 border border-transparent shadow-md card bg-base-100 hover:border-blue-400 hover:shadow-customBlue card-height rounded-xl">
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
    );
};

export default RandomProductCard;