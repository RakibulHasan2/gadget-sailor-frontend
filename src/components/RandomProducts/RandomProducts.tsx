import { useState } from "react";
import useApiData from "../../hooks/getAPIData";
import RandomProductCard from "./RandomProductCard";



export default function RandomProducts() {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(8)

    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/allProducts")
    if (isLoading) {
        return <p>Loading...</p>;
    }
    // console.log(data.length)

    // const [page, setPage] = React.useState<number>(1);

    // const [count, setCount] = React.useState<number>(0);







    // eslint-disable-next-line react-hooks/rules-of-hooks


    console.log(data)
    const count = 0;

    const pages = Math.ceil(data.length / size);
    //console.log(pages)

    const randomDatas = [...data].sort(() => Math.random() - 0.5);
    //console.log(randomDatas.length)

    const limitData = randomDatas.slice(count * size, page * size)
    console.log(limitData)

    // const number: number[] = [...Array(pages).keys()];
    // number.map(num => {
    //     console.log(num)
    // })

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
            <div className="btn-group flex justify-center pagination">
                {[...Array(pages).keys()].map((number) => (
                    <button
                        key={number}
                        onClick={() => {
                            setPage(number + 1);

                        }}
                        className={page === number + 1 ? "btn btn-primary" : "btn"}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>

            {/* <div className="join">
                <button className={page === number - 1 ? "join-item btn" : "btn"} onClick={() => {
                    setPage(number - 1); setCount(number)
                }}>«</button>

                <button className="join-item btn">{number}</button>
                <button className={page === number + 1 ? "join-item btn" : "btn"} onClick={() => {
                    setPage(number + 1); setCount(number)
                }}>»</button>
            </div> */}

            {/* <div>
                <div className="join">
                    <button className="join-item btn">«</button>
                    <button className="join-item btn">Page 22</button>
                    <button className="join-item btn">»</button>
                </div>
            </div> */}
        </div>
    );
}

//export default RandomProducts;