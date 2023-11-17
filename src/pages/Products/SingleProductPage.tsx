import { useLoaderData } from "react-router-dom";
import { IProduct } from "../../types/ProductsType";
import { useState } from "react";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import React from 'react';
import { IoMdCheckmarkCircle } from "react-icons/io";
//modal info
//name
//price
//quantity

//shopping cart
//name, image, price, quantity, delete, unit price, total price,model

export default function SingleProductPage() {
  // eslint-disable-next-line prefer-const
  let [count, setCount] = useState(1);
  const singleProduct = useLoaderData() as IProduct;
  const singleProductData = singleProduct.data;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, category_name, sub_category_name, product_name, price, status, product_code, brand_name, image, model, warranty, ...otherProperties } = singleProductData;

  // console.log(singleProductData)

  const increment = () => {
    count++;
    setCount(count);
  }

  const decrement = () => {
    if (count >= 1) {
      setCount(count);
      count--;
    }
  }
  // -------------------for cart modal-------------------------------
  const [isCartModalOpen, setIsCartModalOpen] = React.useState(false);
  const openImageModal = () => {
    setIsCartModalOpen(true);
  };
  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const CartDetails = () => {
    const totalPrice = count * price;
    const cartData = {
      product_name: product_name,
      image: image[0],
      unit_price: price,
      total_price: totalPrice,
      quantity: count,
      model: model
    }
    console.log(cartData)
  }

  const handleClick = () => {
    openImageModal();
    CartDetails();
  };

  return (
    <div className="container mx-auto my-8">
      <div className="items-center justify-center lg:flex">
        {/* image slider */}
        <div className="">
          <ImageSlider images={image} />
        </div>
        {/* product basic info */}
        <div className="w-2/4 lg:ms-12 lg:p-5">
          <h1 className="text-2xl font-bold text-blue-900 lg:mt-10">{product_name}</h1>
          <div className="flex justify-evenly lg:mt-5">
            <p className="p-2 text-gray-600 rounded bg-slate-100">Price: <span className="font-bold text-black">{price}৳</span></p>
            <p className="p-2 text-gray-600 rounded bg-slate-100">Status: <span className="font-bold text-black">{status}</span></p>
            <p className="p-2 text-gray-600 rounded bg-slate-100">Product Code: <span className="font-bold text-black">{product_code}</span></p>
            <p className="p-2 text-gray-600 rounded bg-slate-100">Brand Name: <span className="font-bold text-black"> {brand_name?brand_name:<>-</>}</span></p>
          </div>
          {/* key features */}
          <div className="lg:mt-10">
            <p className="text-xl font-bold lg:mb-7">Key Features</p>
            <p>Model: {model}</p>
            <p>Warranty: {warranty}</p>
          </div>
          {/* buy now button */}
          <div className="flex mt-10">
            <div className="flex lg:mr-10">
              <button className="px-6 text-4xl border" onClick={decrement}>-</button>
              <p className="px-6 py-3 text-xl border">{count}</p>
              <button className="px-6 text-4xl border" onClick={increment}>+</button>
            </div>
            <button onClick={handleClick} className="text-white bg-blue-900 btn px-14 hover:text-black rounded-xl">Buy Now</button>
          </div>
        </div>
      </div>
      {/*----- specification section ------*/}
      <div className="w-3/5 p-6 mt-10 shadow-xl lg:ml-36">
        <p className="text-3xl font-bold">Specification</p>
        <div className="lg:ml-5">
          {/* basic information */}
          <div className="mb-6">
            <h2 className="p-2 mt-5 text-lg font-bold text-blue-900 bg-green-100">Basic Information</h2>
            {Object.keys(otherProperties).map((key) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-700">
                <p className="text-gray-600">{key}</p>
                <p className="w-2/3">{otherProperties[key]}</p>
              </div>
            ))}
          </div>
          {/* warranty information */}
          <div className="mb-6">
            <h2 className="p-2 mt-5 text-lg font-bold text-blue-900 bg-green-100">Warranty Information</h2>
            <p className="py-3 mt-3 border-b border-gray-700">Warranty <span className="lg:ml-44">{warranty} Limited Warranty</span></p>
          </div>
          {/* cart modal */}
          <dialog id="my_modal_2" className="modal" open={isCartModalOpen} onClose={closeCartModal}>
            <div className="w-1/2 modal-box rounded-2xl" >
              <div className="">
                <div className="">
                  <div>
                    <IoMdCheckmarkCircle className="mb-3 text-2xl text-green-600"></IoMdCheckmarkCircle>
                    You have added <span className="font-bold text-blue-900">{product_name}</span> to your shopping cart!
                  </div>
                  <div className="mt-4">
                    Cart quantity :
                    Cart Total :
                  </div>
                </div>
                <div className="mt-5">
                  <button className="mr-4 text-white bg-blue-800 btn rounded-2xl">View Cart</button>
                  <button className="mr-4 text-white bg-blue-800 btn rounded-2xl">Confirm Order</button>
                </div>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  )
}
