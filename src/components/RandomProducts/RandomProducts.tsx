import React from "react";
import useApiData from "../../hooks/getAPIData";
import RandomProductCard from "./RandomProductCard";


const RandomProducts = () => {

    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/allProducts")
    if (isLoading) {
        return <p>Loading...</p>;
    }
    // console.log(data.length)

    // const [page, setPage] = React.useState<number>(1);

    // const [count, setCount] = React.useState<number>(0);

    let page = 1;
    let count = 0;

    const setPage = (num: number) => {
        page = num;
    }
    const setCount = (num2: number) => {
        count = num2;
    }
    const pages = Math.ceil(data.length / 4);
    console.log(pages)

    const randomDatas = [...data].sort(() => Math.random() - 0.5);
    console.log(randomDatas.length)

    const limitData = randomDatas.slice(count * 4, page * 4)

    {
        [...Array(pages).keys()].map((number) => (
            console.log(number)
        ))
    }

    return (
        <div>
            <div>
                {
                    limitData.map(i => (
                        <RandomProductCard
                            key={i.id}
                            data={i} _id={""} category_name={""} sub_category_name={""} brand_name={""} product_name={""} image={[]} model={""} description={""} price={0} product_code={0} status={""} reviews={[]} warranty={""} __v={""} others_info={[]}                    ></RandomProductCard>
                    ))
                }
            </div>
            {/* <div className="btn-group flex justify-center pagination">
                {[...Array(pages).keys()].map((number) => (
                    <button
                        key={number}
                        onClick={() => {
                            setPage(number + 1);
                            setCount(number);
                        }}
                        className={page === number + 1 ? "btn btn-primary" : "btn"}
                    >
                        {number + 1}
                    </button>
                ))}
            </div> */}

            <div className="join">
                <button className="join-item btn">«</button>

                <button className="join-item btn">Page 22</button>
                <button className="join-item btn">»</button>
            </div>
        </div>
    );
};

export default RandomProducts;