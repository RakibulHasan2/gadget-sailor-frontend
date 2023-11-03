import '../../../styles/Navbar.css'
import useApiData from "../../../hooks/getAPIData";
import { Link } from 'react-router-dom';


export default function NavbarItem() {
    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/allProducts")

    // Extract unique category,subcategory and brands name
    const categories = [...new Set(data.map((item) => item.category_name))];
    console.log(categories)
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const Brands = [
        ...new Set(
            data
                .filter((item) => item.brand_name)
                .map((item) => item.brand_name)
        ),
    ];
    console.log(Brands)


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