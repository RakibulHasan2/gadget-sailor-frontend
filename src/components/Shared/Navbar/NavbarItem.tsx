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
        <div>
            {
                categories.map((category) =>
                    <div className="dropdown">
                        <button className="px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded ">
                            {category}
                        </button>
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
                                                        data.filter((item) => item.category_name === category && item.sub_category_name === subCategory)
                                                         .map((item) => item.brand_name)
                                                         .filter((brand) => brand)
                                                         .map((brands) => (
                                                            <li key={brands}>{brands}</li>
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