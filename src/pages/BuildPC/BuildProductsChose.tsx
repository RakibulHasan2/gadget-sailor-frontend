import { Link, useLoaderData } from "react-router-dom";
import { IProduct } from "../../types/ProductsType";
import { useSelectedProducts } from "../../context/SelectedProductsProvider";

export default function BuildProductsChose() {
    const products = useLoaderData() as IProduct;
    const { addProduct } = useSelectedProducts();
    const handleAddToBuild =( product : IProduct) => {
        addProduct(product);
      };

    return (
        <div className="flex justify-center">
            <div className="w-4/5 mt-5">
                {products.data.map((product: IProduct) => (
                    <div key={product._id} className="grid grid-cols-3 p-4 mb-3 bg-white border rounded-lg shadow-md">
                        <div className="">
                            <img className="w-36" src={product?.image[0]} alt="" />
                        </div>
                        <div className="items-center">
                            <h2 className="text-xl font-bold">{product.product_name}</h2>

                            <p className="mt-4">Price- {product.price}৳</p>
                            <p className="mt-2">Warranty- {product.warranty}   </p>
                        </div>
                        <Link to='/build-pc'>
                            <div className="flex items-center justify-end pr-10">
                                <button onClick={() => handleAddToBuild(product)} className="btn btn-info">Add</button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
}
