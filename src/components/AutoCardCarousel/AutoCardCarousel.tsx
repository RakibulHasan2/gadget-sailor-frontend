import useFavData from "../../hooks/getFavData";
import AutoSingleCard from "./AutoSingleCard";


const AutoCardCarousel = () => {
    const { data } = useFavData(`http://localhost:5000/api/v1/getFav`)
    console.log(data)

    return (
        <div className="carousel-container">
            <div className="cards-wrapper">
                {
                    data.map(d => (
                        <AutoSingleCard key={d._id} />
                    ))
                }
            </div>
        </div>
    );
};

export default AutoCardCarousel;