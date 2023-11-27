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

  const filteredProducts = products.data.filter((product: IProduct) => {
    const searchTermsLowerCase = searchTerm.toLowerCase().split(' ');

    return searchTermsLowerCase.every(term => {
      const modelLowerCase = product.model.toLowerCase();
      const brandLowerCase = product.brand_name.toLowerCase();
      return modelLowerCase.includes(term) || brandLowerCase.includes(term);
    });
  });

  return (
    <div className="justify-between p-5 lg:flex">
      <div className="p-3 rounded-lg lg:p-2 lg:w-60 bg-slate-100 lg:rounded-none">
        <div>
          <input
            type="text"
            placeholder="Search Brand..."
            className="w-full max-w-xs input input-bordered input-info rounded-3xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-5 lg:w-4/5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: IProduct) => (
            <div key={product._id} className="grid-cols-3 p-4 mb-3 bg-white border rounded-lg shadow-md lg:grid">
              <div className="flex justify-center lg:flex-none lg:border-r-2 lg:mr-36">
                <img className="w-40 lg:w-52" src={product?.image[0]} alt="" />
              </div>
              <div className="items-center">
                <Link to={`/product/${product?._id}`}>
                  <h2 className="w-full text-xl font-bold text-center lg:text-left hover:text-blue-700">{product.product_name}</h2>
                </Link>
                <li className="mt-4"><span className="font-bold">Model-</span> {product.model}</li>
                <li className=""><span className="font-bold">Price-</span> {product.price}৳</li>
                <li className=""><span className="font-bold">Warranty-</span> {product.warranty}</li>
              </div>
              <div className="flex justify-center lg:pr-10 ustify-center lg:justify-end ">
                <Link to='/build-pc'>
                  <button onClick={() => handleAddToBuild(product)} className="flex items-center justify-center p-2 mt-10 text-lg font-bold bg-gray-200 lg:mt-20 w-36 gap-x-2 rounded-2xl hover:bg-blue-800 hover:text-white ">
                    <BiSolidMessageAltAdd />Add
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center p-40 font-bold">
            <span className="text-center lg:text-3xl loader-pc"></span>
          </div>
        )}
      </div>
    </div>
  );
}
