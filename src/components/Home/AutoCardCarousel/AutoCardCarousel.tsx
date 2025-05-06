import useFavData from "../../../hooks/getFavData";
import { baseUrl } from "../../../routes/Routes";
import SingleCards from "./SingleCards";
import Marquee from "react-fast-marquee";

const AutoCardCarousel = () => {
    const { data } = useFavData(`${baseUrl}/getFav`);
    return (
        <div className="py-8 w-4/5 mx-auto mt-10">
            <p className="text-3xl font-bold text-blue-900 text-center mb-10">Customer's Favorite</p>
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