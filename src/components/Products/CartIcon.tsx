
import { MdShoppingBasket } from "react-icons/md";



interface CartIconProps {
    toggleCart: () => void; 
  }


export default function CartIcon({ toggleCart }:CartIconProps) {
    return (
        <div  style={{ position: 'fixed', bottom: '60px', right: '40px', zIndex: '1000' }}>
            <div className='p-3 border rounded-xl' style={{ backgroundColor: 'rgb(5, 28, 77)' }}>
                <MdShoppingBasket size={40} color="white" onClick={toggleCart} />
            </div>
        </div>
    );
}
