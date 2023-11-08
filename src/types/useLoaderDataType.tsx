import { IProduct } from "./ProductsType"

export type useLoaderDataType = {
    data: IProduct[],
    message: string,
    statusCode: number,
    success: boolean
}