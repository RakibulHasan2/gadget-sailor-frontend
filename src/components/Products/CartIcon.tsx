import { Link } from 'react-router-dom';
import { MdShoppingBasket } from "react-icons/md";

export default function CartIcon() {
    return (
        <div style={{ position: 'fixed', bottom: '60px', right: '40px', zIndex: '1000' }}>
            <Link to="/cart">
                <div className='border p-3 rounded-xl' style={{backgroundColor: 'rgb(5, 28, 77)'}}>
                    <MdShoppingBasket size={40} color="white" />
                </div>
            </Link>
        </div>
    );
}
