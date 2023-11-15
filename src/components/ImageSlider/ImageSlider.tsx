import { useState } from 'react';
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
      <button className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded" onClick={prevImage}>
      ❮
      </button>
      <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded" onClick={nextImage}>
      ❯
      </button>
      <img className="w-full" src={images[currentImageIndex]} alt={`Product Image`} />
    </div>
  );
};

export default ImageSlider;
