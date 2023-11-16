export interface ICategory {

    category_name?: string;
    sub_category_name?: string;
    id?: string;
}
export interface ICategoryResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: ICategory[];
}