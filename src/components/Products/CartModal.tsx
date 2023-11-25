import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaCartFlatbedSuitcase } from "react-icons/fa6";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { ICartModal } from "../../types/CartModalType";
import { Link } from "react-router-dom";

export default function CartModal({ isCartModalOpen, closeCartModal, product_name, count, total }: ICartModal) {
    return (
        <dialog id="my_modal_2" className="modal" open={isCartModalOpen} onClose={closeCartModal}>
            <div className="lg:w-1/2 modal-box rounded-2xl" >
                <div className="">
                    <div className="">
                        <div>
                            <span className="flex justify-center animate-bounce">
                                <IoMdCheckmarkCircle className="mb-3 text-green-600 text-7xl"></IoMdCheckmarkCircle>
                            </span>
                            You have added <span className="font-bold text-blue-900">{product_name}</span> to your shopping cart!
                        </div>
                        <div className="p-3 mt-4 text-lg text-white bg-blue-900 border lg:flex justify-evenly rounded-xl">
                            <span className="flex items-center justify-center gap-x-2"><MdOutlineProductionQuantityLimits />Cart quantity:<span className="font-bold ">{count}</span></span>
                            <span className="lg:border-r-2"></span>
                            <span className="flex items-center justify-center gap-x-2 "><FaCartFlatbedSuitcase />Cart Total:<span className="ml-2 font-bold">{total}</span> ৳</span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="justify-around mt-2 lg:flex lg:mt-5 lg:gap-x-5">
                            <Link to='/my-order'>
                                <button className='flex items-center justify-center p-2 text-lg text-blue-700 bg-gray-100 rounded-md gap-x-3 w-44 hover:bg-blue-700 hover:text-white'><FaShoppingCart></FaShoppingCart>View Cart</button>
                            </Link>
                            <button className='flex items-center justify-center p-2 mt-2 text-lg text-blue-700 bg-gray-100 rounded-md lg:mt-0 gap-x-3 w-44 hover:bg-blue-700 hover:text-white'><FaShoppingBag />Confirm Order</button>
                        </div>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}
