import useFavData from "../../hooks/getFavData";
import './AutoCardCarousel.css'
import SingleCards from "./SingleCards";
import { useEffect, useState } from "react";


const AutoCardCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { data } = useFavData(`http://localhost:5000/api/v1/getFav`)
    console.log(data)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [data.length]);

    const translateValue = -currentIndex * 100 + '%';

    return (
        <div className="carousel-container">
            <div className="cards-wrapper" style={{ transform: `translateX(${translateValue})` }}></div>
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