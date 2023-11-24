import { Link, useLoaderData } from "react-router-dom";
import { IProduct } from "../../types/ProductsType";
import { useSelectedProducts } from "../../context/SelectedProductsProvider";
import { BiSolidMessageAltAdd } from "react-icons/bi";
import { useState } from "react";
import '../../styles/BuildPC.css'
export default function BuildProductsChose() {
  const products = useLoaderData() as IProduct;
  const { addProduct } = useSelectedProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddToBuild = (product: IProduct) => {
    addProduct(product);
  };

  const filteredProducts = products.data.filter((product : IProduct) => {
    const searchTermsLowerCase = searchTerm.toLowerCase().split(' ');

    return searchTermsLowerCase.every(term => {
      const modelLowerCase = product.model.toLowerCase();
      const brandLowerCase = product.brand_name.toLowerCase();
      return modelLowerCase.includes(term) || brandLowerCase.includes(term);
    });
  });

  return (
    <div className="flex justify-between p-5">
      <div className="p-2 w-60 bg-slate-100">
        <div>
          <input
            type="text"
            placeholder="Search Brand..."
            className="w-full max-w-xs input input-bordered input-info"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="w-4/5 mt-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: IProduct) => (
            <div key={product._id} className="grid grid-cols-3 p-4 mb-3 bg-white border rounded-lg shadow-md">
              <div className="border-r-2 mr-36 ">
                <img className="w-36" src={product?.image[0]} alt="" />
              </div>
              <div className="items-center">
                <Link to={`/product/${product?._id}`}>
                  <h2 className="w-full text-xl font-bold hover:text-blue-700">{product.product_name}</h2>
                </Link>
                <li className="mt-4"><span className="font-bold">Model-</span> {product.model}</li>
                <li className=""><span className="font-bold">Price-</span> {product.price}৳</li>
                <li className=""><span className="font-bold">Warranty-</span> {product.warranty}</li>
              </div>
              <Link to='/build-pc'>
                <div className="flex items-center justify-end pr-10 ">
                  <button onClick={() => handleAddToBuild(product)} className="flex items-center justify-center p-2 mt-12 text-lg font-bold bg-gray-200 w-36 gap-x-2 rounded-2xl hover:bg-blue-800 hover:text-white">
                    <BiSolidMessageAltAdd />Add
                  </button>
                </div>
              </Link>
            </div>
          ))
        ) : (
         <div className="flex justify-center p-40 font-bold">
           <span className="loader-pc"></span>
         </div> 
        )}
      </div>
    </div>
  );
}
