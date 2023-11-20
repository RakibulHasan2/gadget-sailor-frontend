import React from 'react';
import { useLoaderData } from "react-router-dom";
import { IProduct } from "../../types/ProductsType";
import { useState } from "react";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import CartModal from '../../components/Products/CartModal';
import { userData } from '../../hooks/getUserData';
import { AiFillEdit } from "react-icons/ai";
import UpdateModal from '../UpdateProduct/UpdateModal';
import useApiData from '../../hooks/getAPIData';
import UpdateImage from '../UpdateProduct/UpdateImage';


export default function SingleProductPage() {
  // eslint-disable-next-line prefer-const
  let [count, setCount] = useState(1);
  const singleProduct = useLoaderData() as IProduct;
  const singleProductData = singleProduct.data;
  const user = userData();
  const { refetch } = useApiData("http://localhost:5000/api/v1/getCart");

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
  // for cart modal
  const [isCartModalOpen, setIsCartModalOpen] = React.useState(false);
  const openImageModal = () => {
    setIsCartModalOpen(true);
  };
  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const totalPrice = count * price;

  const CartDetails = async () => {
    const cartData = {
      product_name: product_name,
      image: image[0],
      unit_price: price,
      total_price: totalPrice,
      quantity: count,
      model: model,
      email: user.email
    }
    const response = await fetch('http://localhost:5000/api/v1/addCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    })
    console.log(response)
    if (response.ok) {
      // Call refetch to update cart data after adding the item
      refetch();
    }

  }
  const handleClick = () => {
    openImageModal();
    CartDetails();
  };

  // for edit all data modal
  const openEditModal = () => {
    const modal = document.getElementById('editModal') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  const closeModal = () => {
    const modal = document.getElementById('editModal') as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  //for edit image modal
  const openEditImage = () => {
    const modal = document.getElementById('editImage') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="items-center justify-center lg:flex">
        {/* image slider */}
        <div className="">
          <ImageSlider images={image} />
          <button onClick={openEditImage} className='flex items-center'><AiFillEdit />Edit Image</button>

          {/* modal for edit image */}
          <dialog id="editImage" className="modal">
            <div className="modal-box ">
              <form method="dialog">

                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              <UpdateImage></UpdateImage>
            </div>
          </dialog>

        </div>







        {/* product basic info */}
        <div className="w-2/4 lg:ms-12 lg:p-5">
          <h1 className="text-2xl font-bold text-blue-900 lg:mt-10">{product_name}</h1>
          <div className="flex justify-evenly lg:mt-5">
            <p className="p-2 text-gray-600 rounded bg-slate-100">Price: <span className="font-bold text-black">{price}৳</span></p>
            <p className="p-2 text-gray-600 rounded bg-slate-100">Status: <span className="font-bold text-black">{status}</span></p>
            <p className="p-2 text-gray-600 rounded bg-slate-100">Product Code: <span className="font-bold text-black">{product_code}</span></p>
            {
              brand_name &&
              <p className="p-2 text-gray-600 rounded bg-slate-100">Brand Name: <span className="font-bold text-black"> {brand_name}</span></p>
            }
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
        <div className='flex items-end justify-between'>
          <p className="text-3xl font-bold">Specification</p>
          <button onClick={openEditModal} className='flex items-center'><AiFillEdit />Edit</button>

          {/* edit modal */}

          <dialog id="editModal" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <form method="dialog">

                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-2xl text-center">{product_name} </h3>
              <UpdateModal
                singleData={singleProductData}
                closeModal={closeModal} otherProperties={otherProperties} _id={''} category_name={''} sub_category_name={''} brand_name={''} product_name={''} image={[]} model={''} description={''} price={0} product_code={0} status={''} reviews={[]} warranty={''} __v={''} others_info={[]}              ></UpdateModal>


            </div>
          </dialog>
        </div>
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
          <CartModal
            closeCartModal={closeCartModal}
            isCartModalOpen={isCartModalOpen}
            product_name={product_name}
            count={count}
            total={totalPrice}
          ></CartModal>
        </div>
      </div>
    </div>
  )
}