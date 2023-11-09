
import img1 from "../../assets/pc/pc-6.png";
import img2 from "../../assets/pc/pc-5.png";
import img3 from "../../assets/pc/pc-7.png";
import '../../styles/Banner.css'
const Banner = () => {
  return (
    <div className="w-full carousel">
      <div id="slide1" className="relative w-screen h-screen carousel-item">
        <img src={img1} className="w-full h-full img-opacity" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide2" className="relative w-full h-screen carousel-item">
        <img src={img2} className="w-full img-opacity" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide3" className="relative w-full h-screen carousel-item">
        <img src={img3} className="w-full img-opacity" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
