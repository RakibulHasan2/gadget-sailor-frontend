import '../../styles/WhyGadgetSailor.css'
import img from '../../assets/banner/thinking.jpg'
import { MdOutlinePriceChange } from 'react-icons/md';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { TbTruckReturn } from "react-icons/tb";
const WhyGadgetSailor = () => {
    return (
        <div className={`mt-20 relative bg-cover bg-no-repeat bg-right-top h-96 md:h-[480px] lg:h-[540px] xl:h-[600px] duration-300`} style={{ backgroundImage: `url(${img})` }}>
            {/* Opacity controller */}
            <div className="absolute inset-0 bg-white/40 md:bg-black/5 bg-opacity-80"></div>
            <div className="absolute top-1/2 md:top-1/4 left-1/2 md:left-[10%] transform md:transform-none -translate-x-1/2 md:-translate-x-0 -translate-y-1/2 md:-translate-y-0">
                {/* Why gadget sailor */}
                <h2 className='text-3xl sm:text-4xl lg:text-5xl mb-5 md:mb-8 lg:mb-10 xl:mb-12 text-center tracking-wider text-blue-900'>Why <span className='font-semibold'>Gadget Sailor?</span></h2>
                <div className='h-60 overflow-y-scroll scroll w-fit'>
                    {/* 1st box */}
                    <div className="flex gap-5 lg:gap-10 xl:gap-12 p-5 w-80 lg:w-96 xl:w-[480px] bg-white rounded lg:rounded-lg mb-5 mr-2 sm:mr-5">
                        <MdOutlinePriceChange className="mt-3 lg:mt-5" style = {{fontSize: "200px", height: "100px"}}></MdOutlinePriceChange>
                        <div>
                            <h4 className="text-xl lg:text-2xl tracking-wider uppercase font-semibold hover:text-blue-700">Low Prices</h4>
                            <p className="mt-2">All our products from laptop to headphones, are offered at affordable prices for everyone.</p>
                        </div>
                    </div>
                    {/* 2nd box */}
                    <div className="flex gap-5 lg:gap-10 xl:gap-12 p-5 w-80 lg:w-96 xl:w-[480px] bg-white rounded lg:rounded-lg mb-5 mr-2 sm:mr-5">
                        <img className="w-16 lg:w-20 h-16 lg:h-20 mt-3 lg:mt-5" src="https://www.svgrepo.com/show/301732/free-delivery-free.svg" alt="" />
                        <div>
                            <h4 className="text-xl lg:text-2xl tracking-wider uppercase font-semibold hover:text-blue-700">Free Delivery</h4>
                            <p className="mt-2">We provide free same-day worldwide shipping to all our registered clients & customers</p>
                        </div>
                    </div>
                    {/* 3rd box */}
                    <div className="flex gap-5 lg:gap-10 xl:gap-12 p-5 w-80 lg:w-96 xl:w-[480px] bg-white rounded lg:rounded-lg mb-5 mr-2 sm:mr-5">
                        <FaMoneyCheckDollar className="mt-3 lg:mt-5" style = {{fontSize: "170px", height: "100px"}}></FaMoneyCheckDollar>
                        <div>
                            <h4 className="text-xl lg:text-2xl tracking-wider uppercase font-semibold hover:text-blue-700">5% Cash Back</h4>
                            <p className="mt-2">Regular Customers of gadget sailor can get 5% cash back for every purchase at our store.</p>
                        </div>
                    </div>
                    {/* 4th box */}
                    <div className="flex gap-5 lg:gap-10 xl:gap-12 p-5 w-80 lg:w-96 xl:w-[480px] bg-white rounded lg:rounded-lg mr-2 sm:mr-5">
                        <TbTruckReturn className="mt-3 lg:mt-5" style = {{fontSize: "170px", height: "100px"}} ></TbTruckReturn>
                        <div>
                            <h4 className="text-xl lg:text-2xl tracking-wider uppercase font-semibold hover:text-blue-700">Easy Returns</h4>
                            <p className="mt-2">Returning any product bought at our store is very simple.Contact us to find out more.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WhyGadgetSailor;