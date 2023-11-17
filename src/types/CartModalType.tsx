export interface ICartModal{
    isCartModalOpen: boolean;
    closeCartModal: () => void;
    product_name: string;
    count: number;
    total: number
}