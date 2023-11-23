import { useState } from "react";
import useApiData from "../../hooks/getAPIData";
import RandomProductCard from "./RandomProductCard";
import '../../styles/Loader.css'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import '../../styles/Text-shadow.css'


const RandomProducts = () => {
    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0)
    const size = 10;
    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/allProducts")
    if (isLoading) {
        return <div className="flex justify-center p-10"><span className="loader"></span></div>;
    }

    const pages = Math.ceil(data.length / size);
    console.log(page)

    const randomDatas = [...data].sort(() => Math.random() - 0.5);


    const limitData = randomDatas.slice(count * size, page * size)
    // console.log(limitData)
    //console.log(limitData)

    return (
        <div className="mt-20 ">
            <div className="flex justify-center mb-10" >
                <h1 className="text-3xl font-bold text-shadow-blue"><span className="text-blue-600">Suggest</span> Products</h1>
            </div>
            <div className="flex-col p-4 lg:grid lg:grid-cols-5 lg:gap-x-2 lg:gap-y-8 lg:grid-rows-2 mb-7 justify-items-center">
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
    );
};

export default RandomProducts;