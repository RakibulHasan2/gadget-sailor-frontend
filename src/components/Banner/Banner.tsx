


import '../../styles/Banner.css'
const Banner = () => {
  return (
    <div className="w-full mt-5 carousel">
      <div id="slide1" className="relative w-screen h-screen carousel-item image-banner1">
        <div className='flex items-center justify-center text-center'>

          <div className=''>
            <h1 className='text-6xl text-black '>Welcome to Gadget-Sailor</h1>
            <div className='flex justify-center mt-10'>
              <p className='w-2/4 text-black'>
                "Discover [Gadget-sailor], your trusted source for top-tier PCs and laptops. We offer a curated selection of cutting-edge technology and accessories to meet your computing needs. Our expert team is dedicated to providing personalized solutions, ensuring a seamless and satisfying shopping experience for all tech enthusiasts."
              </p>
            </div>


          </div>



        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide2" className="relative w-full h-screen carousel-item image-banner2">
        <div className='flex items-center justify-center text-center'>

          <div className=''>
            <h1 className='text-5xl text-black '>Welcome to Gadget-Sailor</h1>
            <div className='flex justify-center mt-10'>
              <p className='w-2/4 text-black'>
                "Discover [Gadget-sailor], your trusted source for top-tier PCs and laptops. We offer a curated selection of cutting-edge technology and accessories to meet your computing needs. Our expert team is dedicated to providing personalized solutions, ensuring a seamless and satisfying shopping experience for all tech enthusiasts."
              </p>
            </div>


          </div>



        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide3" className="relative w-full h-screen carousel-item image-banner3">
        <div className='flex items-center justify-center text-center'>

          <div className=''>
            <h1 className='text-5xl text-black '>Welcome to Gadget-Sailor</h1>
            <div className='flex justify-center mt-10'>
              <p className='w-2/4 text-black'>
                "Discover [Gadget-sailor], your trusted source for top-tier PCs and laptops. We offer a curated selection of cutting-edge technology and accessories to meet your computing needs. Our expert team is dedicated to providing personalized solutions, ensuring a seamless and satisfying shopping experience for all tech enthusiasts."
              </p>
            </div>


          </div>



        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
