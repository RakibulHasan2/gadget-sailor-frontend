import { useState } from "react";
import useApiData from "../../hooks/getAPIData";
import RandomProductCard from "./RandomProductCard";
import '../../styles/Loader.css'



const RandomProducts = () => {
    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0)
    const size = 8;
    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/allProducts")
    if (isLoading) {
        return <div className="flex justify-center p-10"><span className="loader"></span></div>;
    }

    const pages = Math.ceil(data.length / size);
    console.log(page)

    const randomDatas = [...data].sort(() => Math.random() - 0.5);


    const limitData = randomDatas.slice(count * size, page * size)
    console.log(limitData)
    console.log(limitData)

    return (
        <div className="mt-28">
            <div className="flex-col p-4 lg:grid lg:grid-cols-4 lg:gap-x-2 lg:gap-y-8 lg:grid-rows-2 mb-7 justify-items-center">
                {
                    limitData.map(i => (
                        <RandomProductCard
                            key={i._id}
                            data={i} _id={""} category_name={""} sub_category_name={""} brand_name={""} product_name={""} image={[]} model={""} description={""} price={0} product_code={0} status={""} reviews={[]} warranty={""} __v={""} others_info={[]}                    ></RandomProductCard>
                    ))
                }
            </div>


            <div className="join btn-info">
                <button onClick={() => { setPage(page - 1); setCount(page - 2) }} className="join-item btn" disabled={page === 1}>«</button>
                <button className="join-item btn">Page {page}</button>
                <button onClick={() => { setPage(page + 1); setCount(page) }} className="join-item btn" disabled={page === pages}>»</button>
            </div>
        </div>
    );
};

export default RandomProducts;