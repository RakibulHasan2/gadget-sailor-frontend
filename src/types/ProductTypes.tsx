export type AddProductValues = {
    category_name: string;
    sub_category_name: string;
    brand_name: string;
    product_name: string;
    image: string[];
    model: string;
    description: string;
    price: number;
    product_code: number
    status: string;
    reviews: string[];
    warranty: string;
    others_info: object;
}