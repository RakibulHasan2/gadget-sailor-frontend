import '../../styles/Banner.css'
import img1 from '../../assets/banner/3936525.jpg'
import img2 from '../../assets/banner/replicate-prediction-ycudbrjbwzs45byozpboduzeuy.png'
import img3 from '../../assets/banner/img3.png'
const Banner = () => {
 
  return (
    // <div className="mt-5 carousel">
    //   <div id="slide1" className="relative carousel-item image-banner1">
    //     <div className='flex items-center justify-center text-center'>
    //       <img className='' src="https://www.startech.com.bd/image/cache/catalog/home/banner/Star-Tech-Laptop-Desktop-Deal-Home-Banner-982x500.png" alt="" />
    //       {/* <div className=''>
    //         <h1 className='text-6xl text-black '>Welcome to Gadget-Sailor</h1>
    //         <div className='flex justify-center mt-10'>
    //           <p className='w-2/4 text-black'>
    //             "Discover [Gadget-sailor], your trusted source for top-tier PCs and laptops. We offer a curated selection of cutting-edge technology and accessories to meet your computing needs. Our expert team is dedicated to providing personalized solutions, ensuring a seamless and satisfying shopping experience for all tech enthusiasts."
    //           </p>
    //         </div>
    //       </div> */}
    //     </div>
    //     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ">
    //       <a href="#slide3" className="btn btn-circle">❮</a>
    //       <a href="#slide2" className="btn btn-circle">❯</a>
    //     </div>
    //   </div>
    //   <div id="slide2" className="relative w-full h-screen carousel-item image-banner2">
    //     <div className='flex items-center justify-center text-center'>
    //     <img className='' src="https://www.startech.com.bd/image/cache/catalog/home/banner/Star-Tech-Laptop-Desktop-Deal-Home-Banner-982x500.png" alt="" />
    //       {/* <div className=''>
    //         <h1 className='text-5xl text-black '>Welcome to Gadget-Sailor</h1>
    //         <div className='flex justify-center mt-10'>
    //           <p className='w-2/4 text-black'>
    //             "Discover [Gadget-sailor], your trusted source for top-tier PCs and laptops. We offer a curated selection of cutting-edge technology and accessories to meet your computing needs. Our expert team is dedicated to providing personalized solutions, ensuring a seamless and satisfying shopping experience for all tech enthusiasts."
    //           </p>
    //         </div>
    //       </div> */}
    //     </div>
    //     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    //       <a href="#slide1" className="btn btn-circle">❮</a>
    //       <a href="#slide3" className="btn btn-circle">❯</a>
    //     </div>
    //   </div>
    //   <div id="slide3" className="relative w-full h-screen carousel-item image-banner3">
    //     <div className='flex items-center justify-center text-center'>
    //     <img className='' src="https://www.startech.com.bd/image/cache/catalog/home/banner/Star-Tech-Laptop-Desktop-Deal-Home-Banner-982x500.png" alt="" />
    //       {/* <div className=''>
    //         <h1 className='text-5xl text-black '>Welcome to Gadget-Sailor</h1>
    //         <div className='flex justify-center mt-10'>
    //           <p className='w-2/4 text-black'>
    //             "Discover [Gadget-sailor], your trusted source for top-tier PCs and laptops. We offer a curated selection of cutting-edge technology and accessories to meet your computing needs. Our expert team is dedicated to providing personalized solutions, ensuring a seamless and satisfying shopping experience for all tech enthusiasts."
    //           </p>
    //         </div>
    //       </div> */}
    //     </div>
    //     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    //       <a href="#slide2" className="btn btn-circle">❮</a>
    //       <a href="#slide1" className="btn btn-circle">❯</a>
    //     </div>
    //   </div>
    // </div>
    <div className="carousel w-full mt-5">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={img1} className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img src={img2} className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img src={img3} className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
