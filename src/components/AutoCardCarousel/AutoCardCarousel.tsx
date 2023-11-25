import useFavData from "../../hooks/getFavData";
import SingleCards from "./SingleCards";
import Marquee from "react-fast-marquee";

const AutoCardCarousel = () => {
    const { data } = useFavData(`http://localhost:5000/api/v1/getFav`);
    return (
        <div className="bg-sky-100 py-8">
            <Marquee pauseOnHover>
                {
                    data.map(d => (
                        <SingleCards
                            key={d._id}
                            data={d} _id={""} category_name={""} sub_category_name={""} brand_name={""} product_name={""} image={[]} model={""} description={""} price={0} product_code={0} status={""} reviews={[]} warranty={""} __v={""} others_info={[]}>
                        </SingleCards>
                    ))
                }
            </Marquee>
        </div >
    );
};

export default AutoCardCarousel;