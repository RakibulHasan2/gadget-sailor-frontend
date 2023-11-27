import '../../../styles/Navbar.css'
import useProductData from "../../../hooks/useProductData";
import { Link } from 'react-router-dom';
import { IProduct } from '../../../types/ProductsType'
import '../../../styles/Loader.css'
export default function NavbarItem() {
    const { data, isLoading } = useProductData("http://localhost:5000/api/v1/allProducts")
    const categories: string[] = [...new Set(data.map((item: IProduct) => item.category_name))];
    if (isLoading) {
        return <div className="flex justify-center mt-5"><span className="loader"></span></div>;
    }
    return (
        <div>
            <div className='flex justify-center shadow-lg lg:h-16 shadow-blue-900/50'>
                <div className='relative items-center lg:flex lg:w-4/5 lg:h-16 rounded-3xl justify-evenly md:grid md:grid-rows-2 md:grid-cols-4 sm:grid sm:grid-rows-3 sm:grid-cols-3'>
                    {
                        categories.map((category) =>
                            <div className="relative dropdown dropdown-hover">
                                <Link to={`/${category}`}>
                                    <p className="px-8 py-3 font-semibold rounded-lg items-button hover:bg-blue-800 hover:text-white">
                                        {category}
                                    </p>
                                </Link>
                                <ul className="absolute hidden dropdown-content z-20 shadow bg-base-100  p-1 border rounded-lg">
                                    {
                                        data.filter((item) => item?.category_name === category)
                                            .map((item) => item.sub_category_name)
                                            .filter((subCategory, index, array) => subCategory && array.indexOf(subCategory) === index)
                                            .map(subCategory =>
                                                <li className="w-full dropdown">
                                                    <Link to={`/${category}/${subCategory}`} className='block p-2 text-sm transition-all duration-300 ease-in-out rounded-md w-36 bg-base-100 hover:bg-blue-800 hover:text-white'><span className='flex justify-between'>{subCategory}<span>⇢</span></span></Link>
                                                    <ul className='absolute z-10 hidden -mt-6 border shadow-sm ml-36 dropdown-content dropdown-right'>
                                                        <li>
                                                            {
                                                                data.filter((item) => item.category_name === category && item?.sub_category_name === subCategory)
                                                                    .map((item) => item.brand_name)
                                                                    .filter((brandName, index, array) => brandName && array.indexOf(brandName) === index)
                                                                    .map((brands) => (
                                                                        <Link to={`/${category}/${subCategory}/${brands}`} >
                                                                            <li className='block w-32 p-2 text-sm transition-all duration-300 ease-in-out bg-base-100 hover:bg-blue-800 hover:text-white' key={brands}>{brands}</li>
                                                                        </Link>
                                                                    ))
                                                            }
                                                        </li>
                                                    </ul>
                                                </li>
                                            )
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}


