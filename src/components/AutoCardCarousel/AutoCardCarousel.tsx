import useFavData from "../../hooks/getFavData";
import './AutoCardCarousel.css'
import SingleCards from "./SingleCards";



const AutoCardCarousel = () => {

    const { data } = useFavData(`http://localhost:5000/api/v1/getFav`)
    console.log(data)



    return (
        <div className="">

            {
                data.map(d => (
                    <SingleCards
                        key={d._id}
                        data={d} _id={""} category_name={""} sub_category_name={""} brand_name={""} product_name={""} image={[]} model={""} description={""} price={0} product_code={0} status={""} reviews={[]} warranty={""} __v={""} others_info={[]}                    ></SingleCards>
                ))
            }

        </div >


    );
};

export default AutoCardCarousel;