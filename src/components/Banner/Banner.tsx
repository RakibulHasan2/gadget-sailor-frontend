import '../../styles/Banner.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Banner = () => {
 
  return (
    <section className='bg-white'>
    <Swiper
    pagination={{
      clickable: true,
    }}
    autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
    modules={[Autoplay, Pagination]}
    className="mySwiper"
  >
    <SwiperSlide>
        <div className='relative'>
            <img className='w-full h-80 md:h-full 2xl:h-[620px] duration-300 object-cover object-left' src="https://i.ibb.co/0KYQVwT/top-view-person-writing-laptop-with-copy-space-23-2148708035.png" alt="" />
             {/* Opacity controller */}
            <div className="block md:hidden absolute inset-0 bg-white bg-opacity-80"></div>
            <div className='absolute top-24 md:top-1/4 lg:top-1/3 right-10 md:right-[10%] max-w-6xl'>
              <div className='w-fit mb-3 lg:mb-5'>
                  <p className='text-sm md:text-base lg:text-lg xl:text-xl font-semibold tracking-wide md:tracking-widest mx-1'>THE BIGGEST SELECTION OF QUALITY DEVICES</p>
                  <p className='border-[3px] md:border-[5px] -mt-2 md:-mt-3 border-yellow-300'></p>
              </div>
              <h2 className='md:-ml-8 lg:-ml-12 xl:-ml-16 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl duration-300 text-blue-900 font-semibold mb-3 lg:mb-5 xl:mb-8 tracking-widest'>QUALITY ELECTRONICS</h2>
              <p className='text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl duration-300 tracking-wider mb-5 lg:mb-8 xl:mb-10'>SMART TECH GADGETS THAT WILL ASTOUND YOU!.</p>
              <button className='px-3 md:px-5 py-2 md:py-3 text-base md:text-lg bg-blue-900 hover:bg-blue-700 duration-300 rounded-lg shadow-xl text-white'>
                Shop Now
              </button>
            </div>
        </div>
    </SwiperSlide>
    <SwiperSlide>
       <div className='relative'>
          <img className='w-full h-80 md:h-full 2xl:h-[620px] duration-300 object-cover object-right' src="https://i.ibb.co/NCm7j7P/01.png" alt="" />
           {/* Opacity controller */}
          <div className="block md:hidden absolute inset-0 bg-white bg-opacity-80"></div>
          <div className='absolute top-24 md:top-1/4 lg:top-1/3 left-10 md:left-[10%] max-w-6xl'>
              <div className='w-fit mb-3 lg:mb-5'>
                  <p className='text-sm md:text-base lg:text-lg xl:text-xl font-semibold tracking-wide md:tracking-widest mx-1'>THE BIGGEST SELECTION OF QUALITY DEVICES</p>
                  <p className='border-[3px] md:border-[5px] -mt-2 md:-mt-3 border-yellow-300'></p>
              </div>
              <h2 className='md:-ml-8 lg:-ml-12 xl:-ml-16 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl duration-300 text-blue-900 font-semibold mb-3 lg:mb-5 xl:mb-8 tracking-widest'>QUALITY ELECTRONICS</h2>
              <p className='text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl duration-300 tracking-wider mb-5 lg:mb-8 xl:mb-10'>SMART TECH GADGETS THAT WILL ASTOUND YOU!.</p>
              <button className='px-3 md:px-5 py-2 md:py-3 text-base md:text-lg bg-blue-900 hover:bg-blue-700 duration-300 rounded-lg shadow-xl text-white'>
                Shop Now
              </button>
          </div>
       </div>
    </SwiperSlide>
    <SwiperSlide>
       <div className='relative'>
          <img className='w-full h-80 md:h-full 2xl:h-[620px] duration-300 object-cover object-left' src="https://i.ibb.co/FwfWZct/02-1.png" alt="" />
           {/* Opacity controller */}
          <div className="block md:hidden absolute inset-0 bg-white bg-opacity-80"></div>
          <div className='absolute top-24 md:top-1/4 lg:top-1/3 right-10 md:right-[10%] max-w-6xl'>
              <div className='w-fit mb-3 lg:mb-5'>
                  <p className='text-sm md:text-base lg:text-lg xl:text-xl font-semibold tracking-wide md:tracking-widest mx-1'>THE BIGGEST SELECTION OF QUALITY DEVICES</p>
                  <p className='border-[3px] md:border-[5px] -mt-2 md:-mt-3 border-yellow-300'></p>
              </div>
              <h2 className='md:-ml-8 lg:-ml-12 xl:-ml-16 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl duration-300 text-blue-900 font-semibold mb-3 lg:mb-5 xl:mb-8 tracking-widest'>QUALITY ELECTRONICS</h2>
              <p className='text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl duration-300 tracking-wider mb-5 lg:mb-8 xl:mb-10'>SMART TECH GADGETS THAT WILL ASTOUND YOU!.</p>
              <button className='px-3 md:px-5 py-2 md:py-3 text-base md:text-lg bg-blue-900 hover:bg-blue-700 duration-300 rounded-lg shadow-xl text-white'>
                Shop Now
              </button>
          </div>
       </div>
    </SwiperSlide>
  </Swiper>
    </section>
  );
};

export default Banner;
