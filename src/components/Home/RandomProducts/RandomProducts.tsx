import { useState } from "react";
import useProductData from "../../../hooks/useProductData";
import RandomProductCard from "./RandomProductCard";
import '../../../styles/Loader.css'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import '../../../styles/Text-shadow.css'
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";

const RandomProducts = () => {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const size = 6;
    const { data, isLoading } = useProductData("http://localhost:5000/api/v1/allProducts");
    if (isLoading) {
        return <div className="flex justify-center p-10"><span className="loader"></span></div>;
    }
    const pages = Math.ceil(data.length / size);
    const randomDatas = [...data].sort(() => Math.random() - 0.5);
    const limitData = randomDatas.slice(count * size, page * size);

    return (
        <div className="flex justify-center">
            <div className="mt-20 w-4/5">
                <div className="flex justify-center mb-10" >
                    <h1 className="text-3xl font-bold text-shadow-blue"><span className="text-blue-600">Featured</span> Products</h1>
                </div>
                <div className="lg:flex justify-center">
                    {/* sidebar information */}
                    <div className="w-72 h-full lg:mr-5 mx-auto">
                        <div className="shadow-xl mb-10 border rounded-md">
                            <div className="w-48 text-center mx-auto mt-10 mb-10">
                                <LiaShippingFastSolid className='text-4xl mx-auto text-red-700'></LiaShippingFastSolid>
                                <p className="text-lg font-bold">International Shipment</p>
                                <p>Your orders are shipped seamlessly between countries</p>
                            </div>
                            <div className="w-48 text-center mx-auto mt-10 mb-10">
                                <IoShieldCheckmarkOutline className='text-4xl mx-auto text-red-700'></IoShieldCheckmarkOutline>
                                <p className="text-lg font-bold">30 Days Warranty</p>
                                <p>You have the right to return your orders within 30 days.</p>
                            </div>
                            <div className="w-48 text-center mx-auto mt-10 mb-10">
                                <MdOutlinePayment className='text-4xl mx-auto text-red-500'></MdOutlinePayment>
                                <p className="text-lg font-bold">Secure Payment</p>
                                <p>Your payments are secure with our private security network.</p>
                            </div>
                        </div>
                        <div className="w-72 border bg-slate-100 rounded-md">
                            <div className="w-48 text-center mx-auto mt-10 mb-10">
                                <p className="text-red-600 text-lg font-bold">Promo</p>
                                <p className="text-xl font-bold">Discount up to 30% for first purchase!</p>
                                <button className="mt-4 border border-black p-3 rounded-lg hover:text-white hover:bg-blue-900 hover:border-none">Learn More</button>
                            </div>
                        </div>
                    </div>
                    {/* random product */}
                    <div className="lg:w-3/4 lg:mt-0 mt-10">
                        <div className="flex-col p-4 lg:grid lg:grid-cols-3 lg:gap-x-2 lg:gap-y-8 lg:grid-rows-2 mb-7 justify-items-center">
                            {
                                limitData.map(i => (
                                    <RandomProductCard
                                        key={i._id}
                                        data={i} _id={""} category_name={""} sub_category_name={""} brand_name={""} product_name={""} image={[]} model={""} description={""} price={0} product_code={0} status={""} reviews={[]} warranty={""} __v={""} others_info={[]}                    ></RandomProductCard>
                                ))
                            }
                        </div>
                        <div className="flex justify-center mt-5 mb-10">
                            <div className="join">
                                <button onClick={() => { setPage(page - 1); setCount(page - 2) }} className="mr-3 border join-item btn hover:bg-blue-800 hover:text-white" disabled={page === 1}><FaArrowLeft></FaArrowLeft></button>
                                <button className="join-item btn">Page {page}</button>
                                <button onClick={() => { setPage(page + 1); setCount(page) }} className="ml-3 border join-item btn hover:bg-blue-800 hover:text-white" disabled={page === pages}><FaArrowRight></FaArrowRight></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RandomProducts;