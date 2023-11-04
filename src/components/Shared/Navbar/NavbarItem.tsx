import '../../../styles/Navbar.css'
import useApiData from "../../../hooks/getAPIData";
import { Link } from 'react-router-dom';



export default function NavbarItem() {
    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/allProducts")
    const categories : string[] = [...new Set(data.map((item) => item.category_name))];
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex items-center h-16 mb-10 border-2 justify-evenly bg-slate-500'>
            {
                categories.map((category) =>
                    <div className="dropdown dropdown-hover">
                        <Link to='signup'>
                            <a className="px-8 py-3 font-semibold text-gray-700 bg-gray-300 rounded ">
                                {category}
                            </a>
                        </Link>
                        <ul className="absolute hidden pt-1 text-gray-700 dropdown-content">
                            {
                                data.filter((item) => item?.category_name === category)
                                    .map((item) => item.sub_category_name)
                                    .filter((subCategory, index, array) => subCategory && array.indexOf(subCategory) === index)
                                    .map(subCategory =>
                                        <Link to='/'>
                                            <li className="dropdown">
                                                <a className='block w-32 p-3 rounded-t bg-base-100 hover:bg-gray-400'>{subCategory}</a>
                                                <ul className='absolute hidden p-5 ml-32 -mt-6 text-gray-700 bg-gray-200 dropdown-content dropdown-right'>
                                                    <li>
                                                        {
                                                            data.filter((item) => item.category_name === category && item?.sub_category_name === subCategory)
                                                                .map((item) => item.brand_name)
                                                                .filter((brandName, index, array) => brandName && array.indexOf(brandName) === index)
                                                                .map((brands) => (
                                                                    <li className='block w-32 p-3 rounded-t bg-base-100 hover:bg-gray-400' key={brands}>{brands}</li>
                                                                ))
                                                        } 
                                                    </li>
                                                </ul>
                                            </li>
                                        </Link>
                                    )
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    );
}