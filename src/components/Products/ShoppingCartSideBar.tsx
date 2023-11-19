import { FaTimes } from "react-icons/fa";
import CartIcon from "./CartIcon";
import { useState } from 'react';

export default function ShoppingCartSideBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart :() => void = () => {
        setIsOpen(!isOpen);
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
                        width: '300px',
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


                    </div>
                </div>
            )}
        </div>
    )
}
