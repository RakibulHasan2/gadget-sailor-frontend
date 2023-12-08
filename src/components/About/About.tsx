

export default function About() {
  return (
    <div>
      <div className="h-96 hero" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/p/AF1QipMjeR8BFRkr-LMY5D19DD2A3uOTx6V0YntCBY3w=s680-w680-h510)' }}>
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-blue-800">About Us</h1>
            <p className="mb-5 text-black font-bold">At Positive IT Solutions, we believe technology should be empowering, accessible, and enriching. We're not just a computer shop; we're your trusted partner in the digital world. Whether you're a seasoned tech enthusiast or just getting started, our friendly and knowledgeable team is here to guide you every step of the way.</p>
           
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 mb-5 p-5">
        <div className="w-4/6 shadow-2xl p-8 rounded-3xl">
           <div className="bg-blue-700 p-3 rounded-lg">
            <p className="text-white font-bold">What We Offer:</p>
          </div>
          <div className="p-6">
            <li className='mt-3'>
            Extensive Selection: Shop from a wide range of desktops, laptops, computer parts, and peripherals. We carry all the top brands and models to ensure you find the perfect solution for your needs.
            </li>
            <li className='mt-3'>
            Custom Build PCs: Want a computer tailored to your specific requirements? Our experts can design and build a custom PC that delivers exactly the performance you need.
            </li>
            <li className='mt-3'>
            Expert Repair Services: We understand the importance of a reliable machine. Our skilled technicians diagnose and fix computer issues quickly and efficiently, getting you back online without delay.
            </li>
            <li className='mt-3'>
            Web & Software Solutions: We don't just sell hardware; we also offer web and software solutions to help your business thrive online. From website development to custom software applications, we have the expertise to meet your needs.
            </li>
            <li className='mt-3'>
            Exceptional Customer Service: At Positive IT Solutions, we believe in building long-lasting relationships with our customers. We take the time to understand your individual needs and offer personalized advice and support.
            </li>
          </div>
          <div className="bg-blue-700 p-3 rounded-lg">
            <p className="text-white font-bold">Why Choose Us:</p>
          </div>

          <div className="p-6">
            <li className='mt-3'>
            Experience: We have a long history of serving the Mymensingh community with expert advice and reliable tech solutions.
            </li>
            <li className='mt-3'>
            Passionate Team: Our team is made up of passionate tech enthusiasts who are dedicated to helping you succeed.
            </li>
            <li className='mt-3'>
            Competitive Prices: We offer competitive prices on all our products and services, ensuring you get the best value for your money.
            </li>
            <li className='mt-3'>
            Convenient Location: Visit us at Shop 211 & 213, 1st Floor, Aloka Nadi Bangla Complex, 4 Ram Babu Road, Mymensingh 2200 for personalized service and expert advice.
            </li>
          </div>

          <div className="bg-blue-700 p-3 rounded-lg">
            <p className="text-white font-bold">Our Commitment:</p>
          </div>
          <p className="p-3">
          At Positive IT Solutions, we are committed to providing our customers with exceptional service, high-quality products, and competitive prices. We believe everyone deserves access to the technology they need to thrive in the digital age. <br />
          Visit us today and let us help you unlock the power of technology!
          </p>
        </div>
         
      </div>
    </div>
  )
}
