import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import useReviewData from "../../../hooks/getReviewData"

export default function Review() {
    const { data } = useReviewData('http://localhost:5000/api/v1/get-AllReviews')
    return (
        <section className='mx-2 pb-20'>
            <p className='text-3xl font-bold text-center mt-10 mb-10'>Hear what our clients have to say</p>
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
                    data?.map(review =>
                        <SwiperSlide key={review.review}>
                            <div className='duration-300 h-72 bg-lightDark rounded-lg p-3 md:py-5 md:px-8 border border-slate-500 shadow-lg max-w-4xl mx-auto'>

                                <div className='flex items-center gap-5 my-5'>
                                    <img className='w-16 md:w-20 h-16 md:h-20 object-cover rounded-full mb-3' src={review.image} alt="" />
                                    <div>
                                        <p className='text-xl md:text-2xl font-semibold md:mb-2'>{review.customer_name}</p>
                                        <p className='text-slate-500'>{review.email}</p>
                                    </div>
                                </div>
                                <p className='mb-5 italic text-base lg:text-xl'>"{review.review}"</p>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </section>
    )
}
