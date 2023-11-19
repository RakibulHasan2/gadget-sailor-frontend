import { MdShoppingBasket } from "react-icons/md";

export default function CartIcon({ toggleCart }) {
    return (
        <div style={{ position: 'fixed', bottom: '60px', right: '40px', zIndex: '1000' }}>
            <div className='border p-3 rounded-xl' style={{ backgroundColor: 'rgb(5, 28, 77)' }}>
                <MdShoppingBasket size={40} color="white" onClick={toggleCart} />
            </div>
        </div>
    );
}
