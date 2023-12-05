// import { useLoaderData } from "react-router-dom";
// import { IProduct } from "../../types/ProductsType";
//import { useLocation } from 'react-router-dom';
import { useSelectedProducts } from '../../context/SelectedProductsProvider';

const SearchedProducts = () => {

    const { selectedProducts } = useSelectedProducts();
    // Inside your component
    // const location = useLocation();
    // const searchResults = location.state && location.state.searchResults;
    //const allProducts = useLoaderData() as IProduct;
    console.log(selectedProducts)
    return (
        <div>
            search products
        </div>
    );
};

export default SearchedProducts;