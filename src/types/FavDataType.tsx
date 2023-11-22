


export type FavDataType = {
    product_name: string;
    model: string;
    price: number;
    image: string;
    email: string;
}

export interface FavDataTypeResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: FavDataType[];
}