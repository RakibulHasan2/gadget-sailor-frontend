import img1 from "../../assets/banner/Gadgets.webp"
import img2 from "../../assets/banner/photo-1515940175183-6798529cb860.avif"

const Banner = () => {
    return (

        <div>
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <img src={img1} className="w-full h-screen" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img src={img2} className="w-full h-screen" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src="/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                <a href="#item4" className="btn btn-xs">4</a>
            </div>
        </div>


    );
};

export default Banner;