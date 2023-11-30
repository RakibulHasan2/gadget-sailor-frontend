import { ReactNode } from "react";

export type ReviewType = {
    createdAt?: ReactNode;
    customer_name: string;
    email: string;
    image: string;
    p_id: string;
    review: string;
    rating: number,
    product_name: string;
    _id?:string;
}