import { useState } from "react";
import useApiData from "../../hooks/getAPIData";
import RandomProductCard from "./RandomProductCard";




const RandomProducts = () => {
    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0)
    const size = 8;
    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/allProducts")
    if (isLoading) {
        return <p>Loading...</p>;
    }

    const pages = Math.ceil(data.length / size);
    console.log(page)

    const randomDatas = [...data].sort(() => Math.random() - 0.5);


    const limitData = randomDatas.slice(count * size, page * size)
    console.log(limitData)
    console.log(limitData)

    return (
        <div>
            <div className="lg:grid lg:grid-cols-4 lg:gap-x-2 lg:gap-y-8 lg:grid-rows-2 mb-7 flex-col justify-items-center">
                {
                    limitData.map(i => (
                        <RandomProductCard
                            key={i._id}
                            data={i} _id={""} category_name={""} sub_category_name={""} brand_name={""} product_name={""} image={[]} model={""} description={""} price={0} product_code={0} status={""} reviews={[]} warranty={""} __v={""} others_info={[]}                    ></RandomProductCard>
                    ))
                }
            </div>

            <div className="btn-group flex justify-center pagination ">
                {
                    [...Array(pages).keys()].map(number => <button
                        key={number}

                        onClick={() => { setPage(number + 1); setCount(number) }}
                        className={page === number + 1 ? "btn btn-primary" : "btn"}>{number + 1}</button>)

                }

            </div>
        </div>
    );
};

export default RandomProducts;