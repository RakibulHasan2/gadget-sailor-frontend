


export type FavDataType = {
    _id?: string;
    I_id?: string
    product_name?: string;
    model?: string;
    price?: number;
    image?: string;
    email?: string;
    count?: number;
}

export interface FavDataTypeResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: FavDataType[];
}