import useProductData from "../../hooks/useProductData";
import { Link } from "react-router-dom";
import { useSelectedProducts } from "../../context/SelectedProductsProvider";
import { useState } from 'react';
import '../../styles/BuildPC.css';
import { userData } from "../../hooks/getUserData";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import pro from "../../assets/build-pc logo/processor.png"
import mother from "../../assets/build-pc logo/motheboard.png"
import graphic from "../../assets/build-pc logo/graphic-card.png"
import casing from "../../assets/build-pc logo/cpu-tower.png"
import hdd from "../../assets/build-pc logo/hard-disk.png"
import ram from "../../assets/build-pc logo/ram.png"
import ssd from "../../assets/build-pc logo/ssd.png"
import power from "../../assets/build-pc logo/powersupply.png"
import { AiFillPrinter } from "react-icons/ai";
import { MdOutlineCamera } from "react-icons/md";
import { MdShoppingBasket } from "react-icons/md";
import html2canvas from 'html2canvas';

interface UniqueCategories {
  [key: string]: boolean; 
}

export default function BuildPC() {
  const data = useProductData('http://localhost:5000/api/v1/allProducts/Components')
  const { selectedProducts, deleteProduct } = useSelectedProducts();
  const [chosenItems, setChosenItems] = useState(new Set());
  const user = userData();
  const uniqueCategories : UniqueCategories = {};
  const calculateTotalPrice = () => {
    let totalPrice: number = 0;
    selectedProducts.forEach((item) => {
      const price = Number(item.price);
      totalPrice += price;
    });
    return totalPrice.toFixed(2);
  };

  const addToCart = async () => {
    try {
      for (const selectedProduct of selectedProducts) {
        const cartItem = {
          product_name: selectedProduct.product_name,
          image: selectedProduct.image[0],
          unit_price: selectedProduct.price,
          total_price: selectedProduct.price,
          quantity: 1,
          model: selectedProduct.model,
          email: user.email,
          u_id: user.id,
        };

        // Make the POST request to add this item to the cart
        await fetch('http://localhost:5000/api/v1/addCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });
      }
      toast.success("Successfully added")
    } catch {
      toast.error("Failed To Add Item!");
    }
  };

  const handleScreenshot = () => {
    const element = document.getElementById('build-pc-container');
    if (element) {
      html2canvas(element).then((canvas) => {
        const imageDataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageDataURL;
        link.download = 'screenshot.png';
        link.click();
      });
    }
  };


  return (
    <div>
      <div className="flex justify-center p-2 mb-10 lg:p-0">
        <div className="pb-3 mt-10 border rounded-lg shadow-xl lg:w-2/3" id="build-pc-container">
          <div className="items-center justify-between p-5 border-b-2 lg:flex">
            <h1 className="flex justify-center mb-2 text-2xl font-bold text-blue-900 border-b-2 lg:border-b-0 lg:mb-0 lg:flex-none">
              PC-Build
            </h1>
            <div className=" lg:flex">
              <div className="flex items-center pl-10 mb-2lg:gap-x-4 gap-x-3 lg:pl-0 lg:mb-0">
                <div className="flex flex-col items-center pr-4 mr-3 lg:mr-0 lg:border-r-2">
                  <span className="text-2xl text-blue-700 animate-pulse"><AiFillPrinter /></span>
                  <button className="text-sm hover:text-blue-600">Print</button>
                </div>
                <div onClick={handleScreenshot} className="flex flex-col items-center pr-4 lg:border-r-2">
                  <span className="text-2xl text-blue-700 animate-spin">
                    <MdOutlineCamera />
                  </span>
                  <button className="text-sm hover:text-blue-600" >
                    ScreenShot
                  </button>
                </div>
                <div onClick={addToCart} className="flex flex-col items-center pr-4 lg:border-r-2">
                  <span className="text-2xl text-blue-700 animate-pulse"><MdShoppingBasket /></span>
                  <button className="text-sm hover:text-blue-600">Add To Cart</button>
                </div>
              </div>
              <div className="p-2 ml-3 text-white bg-blue-900 border rounded-xl">
                  <h1 className="text-lg">{calculateTotalPrice()}৳</h1>
                </div>
            </div>
          </div>
          {data.data.map((item) => {
            if (!chosenItems.has(item.sub_category_name)) {
              const isSelected = selectedProducts.some(product => product.sub_category_name === item.sub_category_name);
              // If the category hasn't been displayed yet, show it
              if (!uniqueCategories[item.sub_category_name]) {
                uniqueCategories[item.sub_category_name] = true;
                return (
                  <div key={item._id} className="flex justify-between p-2 mt-4 ml-12 mr-12 shadow-xl lg:p-0 lg:shadow-none rounded-xl lg:border-b-2">
                    {isSelected ? (
                      <div className="w-full">
                        {
                          selectedProducts.filter((p) => p.sub_category_name === item.sub_category_name)
                            .map(product =>
                              <div className="w-full p-2 text-center border lg:p-0 lg:border-none lg:border-b-2 rounded-xl lg:grid-cols-4 lg:grid product-info">
                                <div className="border-b-2 lg:border-b-0">
                                  <img className=" lg:w-20" src={product.image[0]} alt="" />
                                </div>

                                <div className="lg:text-left lg:pt-2">
                                  <p className="font-bold text-blue-900 ">{product.sub_category_name}</p>
                                  <h1 className="text-sm">{product.product_name}</h1>
                                </div>
                                <div className=" lg:ml-4 lg:pt-7 lg:text-end">
                                  <h1 className="font-bold"><span className="lg:hidden">Price-</span> {product.price}৳</h1>
                                </div>
                                <div className="pt-4 mb-2 text-center lg:ml-4 lg:border-l-2 lg:text-end">
                                  <button onClick={() => deleteProduct(product._id)} className='p-3 text-2xl text-blue-700 bg-slate-100 rounded-2xl hover:text-red-700'><MdDeleteForever /></button>
                                </div>
                              </div>)
                        }
                      </div>
                    ) : (
                      // Display subcategory name
                      <div className="items-center p-3 lg:flex">

                        {item.sub_category_name === "Processor"
                          &&
                          <img className="" src={pro} alt="" />

                        }
                        {
                          item.sub_category_name === "Motherboard"
                          &&
                          <img className="" src={mother} alt="" />
                        }
                        {
                          item.sub_category_name === "RAM"
                          &&
                          <img className="" src={ram} alt="" />
                        }
                        {
                          item.sub_category_name === "SSD"
                          &&
                          <img className="" src={ssd} alt="" />
                        }
                        {
                          item.sub_category_name === "Power Supply"
                          &&
                          <img className="" src={power} alt="" />
                        }
                        {
                          item.sub_category_name === "Graphics Card"
                          &&
                          <img className="w-16 " src={graphic} alt="" />
                        }
                        {
                          item.sub_category_name === "Hard Disk Drive"
                          &&
                          <img className="w-16 " src={hdd} alt="" />
                        }
                        {
                          item.sub_category_name === "Casing"
                          &&
                          <img className="w-16 " src={casing} alt="" />
                        }
                        <div>
                          <h1 className="font-bold lg:ml-2 lg:text-xl">{item.sub_category_name}</h1>
                        </div>

                      </div>
                    )}
                    {!isSelected && (
                      <Link to={`/chose-components/${item.sub_category_name}`}>
                        <button
                          type="button"
                          className="p-3 mt-8 text-sm text-white bg-blue-600 lg:mt-3 rounded-xl hover:bg-sky-700 "
                          onClick={() => setChosenItems(new Set(chosenItems.add(item.sub_category_name)))}
                        >
                          Choose
                        </button>
                      </Link>
                    )}
                  </div>
                );
              }
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
