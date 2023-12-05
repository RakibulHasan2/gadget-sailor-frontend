// import { useLoaderData } from "react-router-dom";
// import { IProduct } from "../../types/ProductsType";
import { useLocation } from 'react-router-dom';

const SearchedProducts = () => {


    // Inside your component
    const location = useLocation();
    const searchResults = location.state && location.state.searchResults;
    //const allProducts = useLoaderData() as IProduct;
    console.log(searchResults)
    return (
        <div>
            search products
        </div>
    );
};

export default SearchedProducts;