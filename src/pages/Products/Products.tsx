import { useLoaderData } from "react-router-dom";
import ProductsCard from "../../components/Products/ProductsCard";
import { IProduct } from "../../types/ProductsType";

export default function Products() {
    const productsData = useLoaderData() as { data: IProduct, message: string, statusCode: number, success: boolean };
    const products = productsData.data
    return (
        <div className="grid grid-cols-4 gap-4">
            {
                products.map((product : IProduct) =>
                    <ProductsCard
                        key={products._id}
                        product ={product}
                    />
                )
            }
        </div>
    )
}


