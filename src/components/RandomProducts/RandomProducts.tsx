import useApiData from "../../hooks/getAPIData";
import RandomProductCard from "./RandomProductCard";


const RandomProducts = () => {

    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/allProducts")
    if (isLoading) {
        return <p>Loading...</p>;
    }


    //console.log(data[0])

    return (
        <div>
            {
                data.map(i => (
                    <RandomProductCard
                        key={i.id}
                        data={i} _id={""} category_name={""} sub_category_name={""} brand_name={""} product_name={""} image={[]} model={""} description={""} price={0} product_code={0} status={""} reviews={[]} warranty={""} __v={""} others_info={[]}                    ></RandomProductCard>
                ))
            }
        </div>
    );
};

export default RandomProducts;