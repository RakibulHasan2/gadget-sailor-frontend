import { useLoaderData } from "react-router-dom";
import { IProduct } from "../../types/ProductsType";
import { useState } from "react";

export default function SingleProductPage() {
  let [count, setCount] = useState(0);
  const singleProduct = useLoaderData() as IProduct;
  const singleProductData = singleProduct.data;
  const { __v, _id, category_name, sub_category_name, product_name, price, status, product_code, brand_name, image, model, warranty, ...otherProperties } = singleProductData;

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
    <div className="container border mx-auto my-8">
      <div className="lg:flex justify-center items-center">
        {/* image slider */}
        <div className="">
          {
            image?.map(img => <img src={img}></img>)
          }
        </div>
        {/* product basic info */}
        <div className="border w-2/4 lg:ms-12 lg:p-5">
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
              <button className="text-4xl border px-6" onClick={decrement}>-</button>
            </div>
            <button className="btn px-14 bg-blue-900 text-white hover:text-black rounded-xl">Buy Now</button>
          </div>
        </div>
      </div>
      {/*----- specification section ------*/}
      <div className="mt-10 w-3/5 lg:ml-36 p-6 shadow-xl">
        <p className="text-3xl font-bold">Specification</p>
        <div className="lg:ml-5">
          {/* basic information */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 bg-green-100 mt-5 p-2">Basic Information</h2>
            {Object.keys(otherProperties).map((key) => (
              <div key={key} className="flex justify-between items-center border-b border-gray-700 py-3">
                <p className="text-gray-600">{key}</p>
                <p className="w-2/3">{otherProperties[key]}</p>
              </div>
            ))}
          </div>
          {/* warranty information */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 bg-green-100 mt-5 p-2">Warranty Information</h2>
            <p className="mt-3 border-b border-gray-700 py-3">Warranty <span className="lg:ml-44">{warranty} Limited Warranty</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
