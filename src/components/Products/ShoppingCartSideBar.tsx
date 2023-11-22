import { FaCartPlus, FaShoppingBag, FaTimes } from "react-icons/fa";
import CartIcon from "./CartIcon";
import { useState } from 'react';
import useApiData from "../../hooks/getAPIData";
import { MdDelete } from "react-icons/md";

export default function ShoppingCartSideBar() {
    const { data, refetch } = useApiData("http://localhost:5000/api/v1/getCart");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart: () => void = () => {
        refetch();
        setIsOpen(!isOpen);
    };

    const handleDeleteCart = (id: string) => {
        fetch(`http://localhost:5000/api/v1/getCart/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    refetch();
                }
            })
    }

    // Function to calculate total price
    const calculateTotalPrice = () => {
        let totalPrice : number = 0;
        data.forEach((item) => {
          const price = parseFloat(item.total_price);
          totalPrice += price;
        });
        return totalPrice;
      };
    return (
        <div>
            <CartIcon
                toggleCart={toggleCart}
                
            />
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        height: '100%',
                        width: '38%',
                        backgroundColor: 'white',
                        zIndex: '999',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        overflowY: 'scroll',
                    }}
                >
                    <div className="flex justify-between p-5 border" style={{ backgroundColor: 'rgb(5, 28, 77)' }}>
                        <h1 className="flex items-center text-lg font-bold text-white gap-x-3">Your Cart <FaCartPlus></FaCartPlus></h1>
                        {/* Close button */}
                        <button className="text-xl text-white" onClick={toggleCart} ><FaTimes /></button>
                    </div>
                    <div>
                        {
                            data.length > 0 ?
                                <>
                                    {
                                        data.map((data) =>
                                            <div className="flex items-center justify-between p-3 mt-3 border-b-2">
                                                <div>
                                                    <img className="w-12" src={data.image} alt="" />
                                                </div>
                                                <div>
                                                    <p>{data.product_name}</p>
                                                    <div className="flex justify-center font-bold">
                                                        <p>{data.unit_price}৳  x {data.quantity} = {data.total_price}৳</p>
                                                    </div>
                                                </div>
                                                <div className="p-2 border rounded-full hover:text-red-600 bg-slate-100" onClick={() => handleDeleteCart(data._id)}>
                                                    <MdDelete />
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                                :
                                <div className="flex justify-center p-2 mt-20">
                                    <p className="text-xl">Your shopping cart is empty!</p>
                                </div>
                        }
                    </div>
                    <div className="">
                        <p className="mb-4 text-lg font-bold text-right lg:mr-10 lg:mt-4">Total: {calculateTotalPrice()}৳</p>
                        <div className="flex justify-center">
                            <button className="flex items-center justify-center p-3 text-white bg-blue-900 rounded-lg w-52 hover:bg-sky-700 gap-x-2"><FaShoppingBag></FaShoppingBag> Confirm Order</button>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    )
}
