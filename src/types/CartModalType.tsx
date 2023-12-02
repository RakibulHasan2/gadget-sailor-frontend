export interface ICartModal {
    isCartModalOpen: boolean;
    closeCartModal: () => void;
    product_name: string;
    count: number;
    total: number;
}

export interface ICartDetails {
    product_name: string;
    unit_price: number;
    total_price: number;
    image: string;
    quantity: number;
    model: string;
    email: string;
    _id: string;
    I_id: string;
}

export interface ICartResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: ICartDetails[];
}