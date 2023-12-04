import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useReviewData from "../../../hooks/getReviewData"

export default function Review() {
    const { data } = useReviewData('https://gadget-sailor-backend.onrender.com/api/v1/get-AllReviews')
    const firstFourReviews = data.slice(0, 4);

    return (
        <section className='mx-2 pb-20 lg:mt-20 mt-10'>
            <p className='text-3xl font-bold text-center mb-10'>Hear what our clients have said</p>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {
                    firstFourReviews?.map(review =>
                        <SwiperSlide key={review.review}>
                            <div className='duration-300 h-72 bg-lightDark rounded-lg p-5 md:py-5 md:px-8 border border-slate-500 shadow-lg max-w-4xl mx-auto'>
                                <div className='flex items-center gap-5 my-5'>
                                    <img className='w-16 md:w-20 h-16 md:h-20 object-cover rounded-full mb-3' src={review.image} alt="" />
                                    <div>
                                        <p className='text-xl md:text-2xl font-semibold md:mb-2'>{review.customer_name}</p>
                                        <p className='text-slate-500'>{review.email}</p>
                                    </div>
                                </div>
                                <p className='mb-5 italic text-base lg:text-xl'>"{review.review.slice(0,190)}"</p>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </section>
    )
}
