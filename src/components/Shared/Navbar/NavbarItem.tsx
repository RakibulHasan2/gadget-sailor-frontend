import '../../../styles/Navbar.css'
import useApiData from "../../../hooks/getAPIData";
import { Link } from 'react-router-dom';
import { IProduct } from '../../../types/ProductsType';


export default function NavbarItem() {
    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/allProducts")
    const categories: string[] = [...new Set(data.map((item: IProduct) => item.category_name))];

    if (isLoading) {
        return <div className="flex items-center justify-center">
            <div className="loading loading-spinner text-info"></div>
        </div>;
    }

    // const d = data.map((category) => category.sub_category_name);
    // console.log(d)

    return (
        <div className='flex justify-center h-16 '>
            <div className='relative flex items-center w-4/5 h-16 rounded-3xl justify-evenly'>
                {
                    categories.map((category) =>
                        <div className="relative dropdown dropdown-hover">
                            <Link to={`/${category}`}>
                                <a className="px-8 py-3 font-semibold rounded-lg items-button">
                                    {category}
                                </a>
                            </Link>
                            <ul className="absolute hidden dropdown-content z-[1] shadow bg-base-100  p-1 border rounded-lg">
                                {
                                    data.filter((item) => item?.category_name === category)
                                        .map((item) => item.sub_category_name)
                                        .filter((subCategory, index, array) => subCategory && array.indexOf(subCategory) === index)
                                        .map(subCategory =>
                                            <Link to='/'>
                                                <li className="w-full dropdown">
                                                    <Link to={`/${category}/${subCategory}`} className='block p-2 text-sm transition-all duration-300 ease-in-out rounded-md w-36 bg-base-100 hover:bg-gray-300 hover:text-gray-600'><span className='flex justify-between'>{subCategory}<span>⇢</span></span></Link>
                                                    <ul className='absolute z-10 hidden -mt-6 border shadow-sm ml-36 dropdown-content dropdown-right'>
                                                        <li>
                                                            {
                                                                data.filter((item) => item.category_name === category && item?.sub_category_name === subCategory)
                                                                    .map((item) => item.brand_name)
                                                                    .filter((brandName, index, array) => brandName && array.indexOf(brandName) === index)
                                                                    .map((brands) => (
                                                                        <li className='block w-32 p-2 text-sm transition-all duration-300 ease-in-out bg-base-100 hover:bg-gray-300 hover:text-gray-600' key={brands}>{brands}</li>
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
        </div>

    );
}


