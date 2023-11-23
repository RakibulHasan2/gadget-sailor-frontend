import { createContext, useState, useContext, ReactNode } from 'react';
import { IProduct } from './../types/ProductsType';

interface ISelectedProductsContext {
    selectedProducts: IProduct[];
    addProduct: (product: IProduct) => void;
    deleteProduct: (productId: string) => void;
}

const initialSelectedProductsContext: ISelectedProductsContext = {
    selectedProducts: [],
    addProduct: () => {},
    deleteProduct: () => {},
};

const SelectedProductsContext = createContext<ISelectedProductsContext>(
    initialSelectedProductsContext
);

export const SelectedProductsProvider = ({ children }: { children: ReactNode }) => {

    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);

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
    };

    return (
        <SelectedProductsContext.Provider value={contextValue}>
            {children}
        </SelectedProductsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSelectedProducts = () => useContext(SelectedProductsContext);
