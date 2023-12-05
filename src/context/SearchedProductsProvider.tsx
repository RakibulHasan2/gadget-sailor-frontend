import { ReactNode, createContext, useContext, useState } from "react";
import { IProduct } from "../types/ProductsType";

interface ISearchContext {
    searchResults: IProduct[];
    searchProduct: (product: IProduct) => void;
}

const initialISearchContext: ISearchContext = {
    searchResults: [],
    searchProduct: () => { },
};

const SearchContext = createContext<ISearchContext>(
    initialISearchContext
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchResults, setSearchResults] = useState<IProduct[]>([]);


    const searchProduct = (product: IProduct) => {
        setSearchResults([product]);
    };

    const contextValue: ISearchContext = {
        searchResults,
        searchProduct,

    };
    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => useContext(SearchContext);

