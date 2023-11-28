/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useLoaderData, useNavigate } from "react-router-dom";
import { IProduct } from "../../types/ProductsType";
import { useState } from "react";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import CartModal from '../../components/Products/CartModal';
import { userData } from '../../hooks/getUserData';
import { AiFillEdit } from "react-icons/ai";
import UpdateModal from '../../components/UpdateProduct/UpdateModal';
import useProductData from '../../hooks/useProductData';
import UpdateImage from '../../components/UpdateProduct/UpdateImage';
import { AiOutlineProfile } from "react-icons/ai";
import SuggestedData from './SuggestedData';
import toast from 'react-hot-toast';
import useReviewData from '../../hooks/getReviewData';


export default function SingleProductPage() {
  // eslint-disable-next-line prefer-const
  let [count, setCount] = useState(1);
  const [suggestedData, setSuggestedData] = useState<IProduct[]>([]);
  const singleProduct = useLoaderData() as any;
  const singleProductData = singleProduct.data as IProduct;
  const user = userData();
  const navigate = useNavigate()
  const { refetch } = useProductData("http://localhost:5000/api/v1/getCart");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, quantity, _id, category_name, sub_category_name, product_name, price, status, product_code, brand_name, image, model, warranty, ...otherProperties } = singleProductData;

  const increment = () => {
    setCount(count + 1);
  }

  const decrement = () => {
    if (count >= 1) {
      setCount(count - 1);
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
      email: user.email,
      u_id: user.id
    }

    const response = await fetch('http://localhost:5000/api/v1/addCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    })
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


  useEffect(() => {
    if (category_name === 'UPS' || category_name === 'Monitor') {
      fetch(`http://localhost:5000/api/v1/allProducts/${category_name}`)
        .then(res => res.json())
        .then(data => {
          //console.log(data.data)
          setSuggestedData(data.data)
        })
    }

    else {
      fetch(`http://localhost:5000/api/v1/allProducts/${sub_category_name}`)
        .then(res => res.json())
        .then(data => {
          //console.log(data.data)
          setSuggestedData(data.data)
        })
    }
  }, [category_name, sub_category_name])

  const randomSuggestion = [...suggestedData].sort(() => Math.random() - 0.5)
  const limitData = randomSuggestion.slice(0, 5)

  // review functionality area---------------------------

  const [rating, setRating] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const { data, refetchReview } = useReviewData(`http://localhost:5000/api/v1/get-AllReviews/${_id}`);

  const handleRatingClick = (value: number) => {
    setRating(value === rating ? 0 : value);
  };

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? 'text-yellow-500' : 'text-gray-300';
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingClick(i)}
          className={`text-3xl cursor-pointer ${starClass}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement
    const reviewValue = (event.currentTarget.querySelector(
      'textarea[name="textArea"]'
    ) as HTMLTextAreaElement)?.value;

    if (rating === 0 || !reviewValue.trim()) {
      setError('Rating and review are required.');
      return;
    }

    if (user) {
      const reviewData = {
        customer_name: user.name,
        email: user.email,
        image: user.image,
        p_id: _id,
        review: reviewValue,
        rating: rating,
        product_name: product_name
      }
      const response = await fetch('http://localhost:5000/api/v1/create-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });
      const review = await response.json();
      if (review.statusCode === 200) {
        toast.success('Review Added Successfully')
        form.reset();
        setRating(0);
        setError('');
        refetchReview()
      }

    }
    else {
      navigate('/login')
    }

  }

  return (
    <div >
      <div className="container mx-auto my-8">
        <div className="flex flex-col items-center justify-center lg:flex-row">
          {/* image slider */}
          <div className="pb-2 border-b-2 lg:border-b-0">
            <ImageSlider images={image} />
            <button onClick={openEditImage} className='flex items-center p-2 ml-2 hover:bg-blue-800 bg-slate-100 rounded-2xl hover hover:text-white'><AiFillEdit />Edit Image</button>
            {/* modal for edit image */}
            <dialog id="editImage" className="modal">
              <div className="modal-box rounded-3xl">
                <form method="dialog">
                  <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                    ✕
                  </button>
                </form>
                <UpdateImage
                  singleData={singleProductData} _id={''} category_name={''} sub_category_name={''} brand_name={''} product_name={''} image={[]} model={''} description={''} price={0} product_code={0} status={''} reviews={[]} warranty={''} __v={''} others_info={[]}></UpdateImage>
              </div>
            </dialog>
          </div>
          {/* product basic info */}
          <div className="p-5 lg:w-1/2 lg:ms-12">
            <h1 className="text-2xl font-bold text-blue-900 lg:mt-10">{product_name}</h1>
            <div className="flex flex-col mt-5 mb-5 lg:flex-row lg:justify-evenly">
              <p className="p-2 text-gray-600 rounded bg-slate-100">Price: <span className="font-bold text-black">{price}৳</span></p>
              <p className="p-2 text-gray-600 rounded bg-slate-100">Status: <span className="font-bold text-black">{status}</span></p>
              <p className="p-2 text-gray-600 rounded bg-slate-100">Product Code: <span className="font-bold text-black">{product_code}</span></p>
              {/* <p className="p-2 text-gray-600 rounded bg-slate-100">Quantity: <span className="font-bold text-black">{quantity}</span></p> */}
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
              <div className="flex mr-5">
                <button className="px-6 text-4xl border" onClick={decrement}>-</button>
                <p className="px-6 py-3 text-xl border">{count}</p>
                <button className="px-6 text-4xl border" onClick={increment}>+</button>
              </div>
              <button onClick={handleClick} className="text-white bg-blue-900 btn lg:px-14 hover:text-black rounded-xl">Buy Now</button>
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
        {/*----- specification section ------*/}
        <div className='lg:flex'>
          <div className="w-full p-6 shadow-xl lg:mt-10 lg:w-3/5 lg:ml-36">
            <div className='flex items-end justify-between'>
              <p className="text-3xl font-bold">Specification</p>
              <button onClick={openEditModal} className='flex items-center p-2 hover:bg-blue-800 bg-slate-100 rounded-2xl hover hover:text-white'><AiFillEdit />Edit</button>
              {/* edit modal */}
              <dialog id="editModal" className="modal">
                <div className="w-11/12 max-w-5xl modal-box rounded-3xl">
                  <form method="dialog">

                    <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <div>
                    <span className='flex justify-center text-5xl text-blue-700'>
                      <AiOutlineProfile />
                    </span>
                    <h3 className="text-2xl font-bold text-center border-b-8">Update "<span className='text-blue-800'>{product_name}</span>" Information </h3>

                  </div>
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
            </div>
            {/*----------- review area --------------------*/}
            <div className='border'>
              <p className="text-3xl font-bold mt-12">Reviews</p>
              <div>
                {
                  data?.map(review => <>
                    {review.review}
                  </>)
                }

              </div>
              <div>
                <div>
                  <p>Rating</p>
                  {renderRatingStars()}
                </div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="textArea"> <span className="label-text text-lg">Write Here:</span></label>
                    <textarea
                      className="w-full pt-3 input input-bordered rounded-3xl"
                      placeholder="your valuable comment"
                      name='textArea'
                    />
                  </div>
                  <button className='' type="submit">Submit</button>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                </form>
              </div>
            </div>
          </div>
          {/* Related Products Section */}
          {
            suggestedData.length > 0 && <>
              <div className='ml-4 lg:mt-10'>
                <div className='py-4 mt-4 text-center bg-sky-950'>
                  <h2 className='text-lg text-white'>Related Products</h2>
                </div>
                {
                  limitData.map(d => (
                    <SuggestedData key={d._id}
                      data={d} _id={''} category_name={''} sub_category_name={''} brand_name={''} product_name={''} image={[]} model={''} description={''} price={0} product_code={0} status={''} reviews={[]} warranty={''} __v={''} others_info={[]}></SuggestedData>
                  ))
                }
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}