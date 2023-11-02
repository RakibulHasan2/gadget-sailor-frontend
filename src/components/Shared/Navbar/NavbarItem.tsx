import { Link } from "react-router-dom";
import '../../../styles/Navbar.css'
import { useState } from "react";
import { AiOutlineArrowRight } from 'react-icons/ai';

export default function NavbarItem() {
    const [desktopHover, setDesktopHover] = useState("dropdown dropdown-hover")
    const [items, setItems] = useState("hidden")
    const itemsHidden = () => {
       setDesktopHover("dropdown dropdown-hover"),
       setItems("hidden")

    }
    const itemsVisible = () => {
        setItems("z-10 p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52")
    }
    return (
        <div className="flex pb-2 mt-2 mb-5 shadow-md">
            <div className="w-full">
                <ul className="flex justify-around">
                    <li className="">
                        <Link to="/home" className="">
                            <button className="p-2 bg-gray-100 rounded--lg w-28 ">Home</button>
                        </Link>
                    </li>
                    <li className="">
                        <div onMouseEnter={itemsHidden} className={desktopHover}>
                            <a href="/desktop" className="m-1 btn">Desktop</a>
                            <ul className="z-10 p-2 border rounded-md shadow dropdown-content menu bg-base-100 w-52">
                                <li onMouseEnter={itemsHidden} className="mt-1 border rounded-md"><a>Gaming PC</a></li>
                                <li onMouseEnter={itemsHidden} className="mt-1 border rounded-md"><a>Laptop</a></li>
                                <li onMouseEnter={itemsVisible} className="mt-1 border rounded-md dropdown dropdown-right">
                                    <a>Brand PC <AiOutlineArrowRight className='ml-16'></AiOutlineArrowRight></a>
                                    <ul className={items}>
                                        <li><a>Asus</a></li>
                                        <li><a>Dell</a></li>
                                        <li><a>HP</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>


                    </li>
                    <li className="">

                        <Link to="/laptop" className="">
                            <button className="p-2 bg-gray-100 rounded--lg w-28">Laptop</button>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/components" className="">
                            <button className="p-2 bg-gray-100 rounded--lg w-28">Components</button>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/monitor" className="">
                            <button className="p-2 bg-gray-100 rounded--lg w-28">Monitor</button>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/ups" className="">
                            <button className="p-2 bg-gray-100 rounded--lg w-28">Ups</button>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/accessories" className="">
                            <button className="p-2 bg-gray-100 rounded--lg w-28">Accessories</button>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/desktop" className="">
                            <button className="p-2 bg-gray-100 rounded--lg w-28">Gaming</button>
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    );
}