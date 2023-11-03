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
        <div className='border-2 flex justify-evenly mb-10 h-16 items-center bg-slate-500'>
            {
             categories.map((category) =>
                    <div className="dropdown dropdown-hover">
                        <Link to='signup'>
                            <a className="bg-gray-300  text-gray-700 font-semibold px-8 py-3 rounded ">
                                {category}
                            </a>
                        </Link>
                        <ul className="dropdown-content absolute hidden text-gray-700 pt-1">
                            {
                                data.filter((item) => item?.category_name === category)
                                    .map((item) => item.sub_category_name)
                                    .filter((subCategory, index, array) => subCategory && array.indexOf(subCategory) === index)
                                    .map(subCategory =>
                                        <Link to='/login'>
                                            <li className="dropdown">
                                                <a className='rounded-t bg-base-100 hover:bg-gray-400 block w-32 p-3'>{subCategory}</a>
                                                <ul className='dropdown-content dropdown-right absolute hidden text-gray-700 bg-gray-200 p-5 ml-32 -mt-6'>
                                                    <li>
                                                        { 
                                                            data.filter((item) => item.category_name === category && item?.sub_category_name === subCategory)
                                                                .map((item) => item.brand_name)
                                                                .filter((brandName, index, array) => brandName && array.indexOf(brandName) === index)
                                                                .map((brands) => (
                                                                    <li className='rounded-t bg-base-100 hover:bg-gray-400 block w-32 p-3' key={brands}>{brands}</li>
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