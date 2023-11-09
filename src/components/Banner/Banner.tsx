


import '../../styles/Banner.css'
const Banner = () => {
  return (
    <div className="w-full carousel">
      <div id="slide1" className="relative w-screen h-screen carousel-item image-banner1">
          <div>
            <div>
              <h1>helcome to Gadget-Sailor</h1>
            </div>
          </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide2" className="relative w-full h-screen carousel-item image-banner2">
      
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide3" className="relative w-full h-screen carousel-item image-banner3">
      
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
