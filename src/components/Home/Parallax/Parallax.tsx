export default function Parallax() {
    return (
        <section className='mt-20 relative bg-[url("https://electrox-demo.myshopify.com/cdn/shop/files/img10.jpg?v=1613702878")] bg-fixed bg-cover bg-no-repeat bg-center h-96 md:h-[520px] duration-300'>
            {/* Opacity controller */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className='absolute top-10 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 duration-300 text-white text-center'>
                <div className="w-full px-3">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 tracking-wider">Welcome To Our Website</h2>
                    <p className="mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptatibus delectus natus ad quisquam ducimus consequuntur cum, incidunt voluptatem laboriosam facilis consequatur earum ipsa, molestias distinctio exercitationem alias illo facere adipisci ut. Qui provident reiciendis aliquam</p>
                    <div className="flex justify-center gap-10">
                        <button className=" text-black/50 hover:text-white bg-white hover:bg-[#FF3C20] duration-500 px-4 py-2 w-fit rounded-lg">
                            View Collections
                        </button>
                        <button className=" text-black/50 hover:text-white bg-white hover:bg-[#FF3C20] duration-500 px-4 w-fit py-2 rounded-lg">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}




