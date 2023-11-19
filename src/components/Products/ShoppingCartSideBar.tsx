import CartIcon from "./CartIcon";
import { useState } from 'react';

export default function ShoppingCartSideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
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
                    {/* Component to display cart items */}
                    <h1>hello</h1>

                    {/* Close button */}
                    <button onClick={toggleCart}>X</button>
                </div>
            )}
        </div>
    )
}
