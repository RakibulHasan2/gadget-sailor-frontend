import { useLoaderData } from "react-router-dom";
import { IProduct } from "../../types/ProductsType";
import { useState } from "react";

export default function SingleProductPage() {
  let [count, setCount] = useState(0);
  const singleProduct = useLoaderData() as IProduct;
  const singleProductData = singleProduct.data;
  const { product_name, price, status, product_code, brand_name, image, model, warranty, ...otherProperties } = singleProductData;

  console.log(singleProductData)

  const increment = () => {
    count++;
    setCount(count);
  }

  const decrement = () => {
    count--;
    setCount(count);
  }

  // const productKeys = Object.keys(singleProductData);

  return (
    <div className="container mx-auto my-8 border">
      <div className="lg:flex justify-center">
        <div className="">
          {
            image?.map(img => <img src={img}></img>)
          }
        </div>
        <div className="w-2/4 lg:ms-12 lg:p-5 ">
          <h1 className="text-2xl text-blue-900 font-bold lg:mt-10">{product_name}</h1>
          <div className="flex justify-evenly lg:mt-5">
            <p className="bg-slate-100 p-2 text-gray-600 rounded">Price: <span className="font-bold text-black">{price}৳</span></p>
            <p className="bg-slate-100 p-2 text-gray-600 rounded">Status: <span className="font-bold text-black">{status}</span></p>
            <p className="bg-slate-100 p-2 text-gray-600 rounded">Product Code: <span className="font-bold text-black">{product_code}</span></p>
            <p className="bg-slate-100 p-2 text-gray-600 rounded">Brand Name: <span className="font-bold text-black"> {brand_name}</span></p>
          </div>
          {/* key features */}
          <div className="lg:mt-10">
            <p className="text-xl lg:mb-7 font-bold">Key Features</p>
            <p>Model: {model}</p>
            <p>Warranty: {warranty}</p>
          </div>
          {/* buy now button */}
          <div className="mt-10 flex">
            <div className="flex lg:mr-10">
              <button className="text-4xl border px-6" onClick={increment}>+</button>
              <p className="text-xl border px-6 py-3">{count}</p>
              <button className="text-4xl border px-6"  onClick={decrement}>-</button>
            </div>
            <button className="btn px-14 bg-blue-900 text-white hover:text-black rounded-xl">Buy Now</button>
          </div>
        </div>
      </div>


    </div>
  )
}
{/* Other Properties Section */ }
{/* <div>
        <h2 className="text-xl font-bold mb-2">Other Properties</h2>
        <ul className="list-disc pl-6">
          {Object.keys(otherProperties).map((key) => (
            <li key={key}>{key}: {otherProperties[key]}</li>
          ))}
        </ul>
      </div> */}