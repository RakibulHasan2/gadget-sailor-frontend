import { useState } from 'react';
import '../../styles/ProductsCard.css'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ImageSlider = ({images}:any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <button className="absolute p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2 left-2" onClick={prevImage}>
      ❮
      </button>
      <button className="absolute p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded top-1/2 right-2" onClick={nextImage}>
      ❯
      </button>
      <img className=" signle-product-card" src={images[currentImageIndex]} alt={`Product Image`} />
    </div>
  );
};

export default ImageSlider;
