import { createContext, useState, useContext, ReactNode } from 'react';
import { IProduct } from './../types/ProductsType';

interface ISelectedProductsContext {
    selectedProducts: IProduct[];
    addProduct: (product: IProduct) => void;
    deleteProduct: (productId: string) => void;
    searchProduct: (product: IProduct[]) => void;

}

const initialSelectedProductsContext: ISelectedProductsContext = {
    selectedProducts: [],
    addProduct: () => { },
    deleteProduct: () => { },
    searchProduct: () => { },
};

const SelectedProductsContext = createContext<ISelectedProductsContext>(
    initialSelectedProductsContext
);

export const SelectedProductsProvider = ({ children }: { children: ReactNode }) => {

    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);


    const searchProduct = (product: IProduct[]) => {
        setSelectedProducts(product);
    };

    const addProduct = (product: IProduct) => {
        setSelectedProducts([...selectedProducts, product]);
    };

    const deleteProduct = (productId: string) => {
        const updatedProducts = selectedProducts.filter(product => product._id !== productId);
        setSelectedProducts(updatedProducts);
    };

    const contextValue: ISelectedProductsContext = {
        selectedProducts,
        addProduct,
        deleteProduct,
        searchProduct
    };

    return (
        <SelectedProductsContext.Provider value={contextValue}>
            {children}
        </SelectedProductsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSelectedProducts = () => useContext(SelectedProductsContext);
