import { Link } from "react-router-dom";
export default function NavbarItem() {
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
                        <Link to="/desktop" className="">
                            <button className="p-2 bg-gray-100 rounded--lg w-28">Desktop</button>
                        </Link>
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