
// import img6 from "../../assets/banner/Gadgets.webp"
// import img2 from "../../assets/banner/photo-1515940175183-6798529cb860.avif"

import img1 from "../../assets/banner/img1.jpg"
import img2 from "../../assets/banner/img6.jpg"
import img3 from "../../assets/banner/img10.jpg"
import img4 from "../../assets/banner/img8.avif"
import img5 from "../../assets/banner/img3.avif"
import img6 from "../../assets/banner/img12.avif"


const Banner = () => {

    const backgroundImageStyle = {
        backgroundImage: `url(${img1})`,
    };

    return (

        <div className="hero min-h-screen max-w-screen " style={backgroundImageStyle}>


            <div className="hero-content text-center text-neutral-content lg:flex-col flex-col">

                <div className="hero hidden lg:block     ">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src={img3} className="max-w-sm rounded-lg shadow-2xl" />
                        <img src={img2} className="max-w-sm rounded-lg shadow-2xl" />

                    </div>
                </div>


                <div className="carousel max-w-lg min-h-28	position: relative lg:-top-20 ">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img src={img6} className=" min-w-full max-h-60" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide4" className="btn btn-circle w-4 glass">❮</a>
                            <a href="#slide2" className="btn btn-circle w-4 glass">❯</a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img src={img4} className="min-w-full max-h-60" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" className="btn btn-circle w-4 glass">❮</a>
                            <a href="#slide3" className="btn btn-circle w-4  glass">❯</a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img src={img4} className=" min-w-full max-h-60" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide2" className="btn btn-circle w-4 glass">❮</a>
                            <a href="#slide4" className="btn btn-circle w-4 glass">❯</a>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                        <img src={img5} className=" min-w-full max-h-60" />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide3" className="btn btn-circle w-4 glass">❮</a>
                            <a href="#slide1" className="btn btn-circle w-4 glass">❯</a>
                        </div>
                    </div>
                </div>

                <h1 className="mb-2 text-4xl font-bold text-orange-200">Hello there</h1>

                <p className="mb-2 text-orange-100 text-center">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>


            </div>
        </div>






    );
};

export default Banner;