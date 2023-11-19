import { FaTimes } from "react-icons/fa";
import CartIcon from "./CartIcon";
import { useState } from 'react';
import useApiData, { ApiData } from "../../hooks/getAPIData";
import { MdDelete } from "react-icons/md";

export default function ShoppingCartSideBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart: () => void = () => {
        setIsOpen(!isOpen);
    };

    const { data } = useApiData("http://localhost:5000/api/v1/getCart");

    // Function to consolidate and merge similar items
    const filteredCartItems = (cartItems: ApiData[]) => {
        const filteredCartItems = {};
        cartItems.forEach((item) => {
            const key = `${item.product_name}`;
            if (!filteredCartItems[key]) {
                filteredCartItems[key] = { ...item };
            } else {
                // Update quantity and total_price for existing item
                filteredCartItems[key].quantity += item.quantity;
                filteredCartItems[key].total_price += item.total_price;
            }
        });

        return Object.values(filteredCartItems);
    };
    // Consolidate the cart data
    const filteredData = filteredCartItems(data);

    const handleDeleteCart = (id: string) => {
        fetch(`http://localhost:5000/api/v1/getCart/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                }
            })
    }

    // Function to calculate total price
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        filteredData.forEach((item) => {
            totalPrice += item.total_price;
        });
        return totalPrice.toFixed(2);
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
                        width: '400px',
                        backgroundColor: 'white',
                        zIndex: '999',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        overflowY: 'scroll',
                    }}
                >
                    <div className="flex border p-5 justify-between" style={{ backgroundColor: 'rgb(5, 28, 77)' }}>
                        <h1 className="text-white font-bold">Your Cart</h1>
                        {/* Close button */}
                        <button className="text-white text-xl" onClick={toggleCart} ><FaTimes /></button>
                    </div>
                    <div>
                        {
                            filteredData.length > 0 ?
                                <>
                                    {
                                        filteredData.map((data) =>
                                            <div className="mt-3 border-b-2 flex justify-between items-center p-3">
                                                <div>
                                                    <img className="w-12" src={data.image} alt="" />
                                                </div>
                                                <div>
                                                    <p>{data.product_name}</p>
                                                    <div className="flex justify-center font-bold">
                                                        <p>{data.unit_price}৳  x {data.quantity} = {data.total_price}৳</p>
                                                    </div>
                                                </div>
                                                <div onClick={() => handleDeleteCart(data._id)}>
                                                    <MdDelete />
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                                :
                                <div className="mt-20 flex justify-center p-2">
                                    <p className="text-xl">Your shopping cart is empty!</p>
                                </div>
                        }
                    </div>
                    <div className="">
                        <p className="text-lg font-bold mb-4 text-right lg:mr-10 lg:mt-4">Total: {calculateTotalPrice()}৳</p>
                        <button className="w-full  p-3 rounded-lg bg-blue-900 text-white hover:bg-sky-700">Confirm Order</button>
                    </div>
                </div>
            )}
        </div>
    )
}
