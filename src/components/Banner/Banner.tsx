
import img4 from "../../assets/banner/img8.avif"
import img5 from "../../assets/banner/img3.avif"
import img6 from "../../assets/pc/pc-photo.png"

const Banner = () => {


  return (
<div className="w-full h-screen carousel">
  <div id="slide1" className="relative w-full h-screen carousel-item">
    <img src={img4} className="w-full h-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="relative w-full carousel-item">
    <img src={img5}className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="relative w-full carousel-item">
    <img src={img6} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div> 
</div>




    // <div className="border ">
    //   <div className="flex-col text-center border hero-content text-neutral-content lg:flex-col">
    //     <div className="max-w-lg carousel min-h-28 position: lg:-top-20 ">
    //       <div id="slide1" className="relative w-full carousel-item">
    //         <img src={img6} className="w-full" />
    //         <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    //           <a href="#slide4" className="w-4 btn btn-circle glass">❮</a>
    //           <a href="#slide2" className="w-4 btn btn-circle glass">❯</a>
    //         </div>
    //       </div>
    //       <div id="slide2" className="relative w-full carousel-item">
    //         <img src={img4} className="w-full" />
    //         <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    //           <a href="#slide1" className="w-4 btn btn-circle glass">❮</a>
    //           <a href="#slide3" className="w-4 btn btn-circle glass">❯</a>
    //         </div>
    //       </div>
    //       <div id="slide3" className="relative w-full carousel-item">
    //         <img src={img4} className="w-full" />
    //         <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    //           <a href="#slide2" className="w-4 btn btn-circle glass">❮</a>
    //           <a href="#slide4" className="w-4 btn btn-circle glass">❯</a>
    //         </div>
    //       </div>
    //       <div id="slide4" className="relative w-full carousel-item">
    //         <img src={img5} className="h-full" />
    //         <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    //           <a href="#slide3" className="w-4 btn btn-circle glass">❮</a>
    //           <a href="#slide1" className="w-4 btn btn-circle glass">❯</a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
   
  );
};

export default Banner;