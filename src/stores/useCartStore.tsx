import { create } from 'zustand';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface CartStore {
    cart: Product[];
    addToCart: (product: Product) => void;
}

export const useCartStore = create<CartStore>((set) => ({
    cart: [],
    addToCart: (product) =>
        set((state) => ({
            cart: [...state.cart, product],
        })),
}));
