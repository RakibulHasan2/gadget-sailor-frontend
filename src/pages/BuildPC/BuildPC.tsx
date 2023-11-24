import useApiData from "../../hooks/getAPIData";
import { Link } from "react-router-dom";
import { useSelectedProducts } from "../../context/SelectedProductsProvider";
import { useState } from 'react';
import '../../styles/BuildPC.css';
import { userData } from "../../hooks/getUserData";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

export default function BuildPC() {
  const data = useApiData('http://localhost:5000/api/v1/allProducts/Components')
  const { selectedProducts, deleteProduct } = useSelectedProducts();
  const [chosenItems, setChosenItems] = useState(new Set());
  const user = userData();
  const uniqueCategories = {};

  const calculateTotalPrice = () => {
    let totalPrice: number = 0;
    selectedProducts.forEach((item) => {
      const price = parseFloat(item.price);
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

  return (
    <div>
      <div className="flex justify-center mb-10">
        <div className="w-2/3 pb-3 mt-10 border rounded-lg shadow-xl">
          <div className="p-8 border-b-2">
            <h1 className="text-2xl font-bold text-blue-900">
                PC-Build
            </h1>
          </div>

          {data.data.map((item) => {
            if (!chosenItems.has(item.sub_category_name)) {
              const isSelected = selectedProducts.some(product => product.sub_category_name === item.sub_category_name);
              // If the category hasn't been displayed yet, show it
              if (!uniqueCategories[item.sub_category_name]) {
                uniqueCategories[item.sub_category_name] = true;
                return (
                  <div key={item._id} className="flex justify-between mt-4 ml-12 mr-12 border-b-2">
                    {isSelected ? (
                      <div className="w-full">
                        {
                          selectedProducts.filter((p) => p.sub_category_name === item.sub_category_name)
                            .map(product =>
                              <div className="grid w-full grid-cols-4 border-b-2 product-info">
                                <div className="">
                                  <img className="w-20" src={product.image[0]} alt="" />
                                </div>
                                
                                <div className="pt-2 text-left">
                                  <p className="font-bold text-blue-900 ">{product.sub_category_name}</p>
                                  <h1 className="text-sm">{product.product_name}</h1>
                                </div>
                                <div className=" pt-7 ml- text-end">
                                  <h1 className="font-bold">{product.price}৳</h1>
                                </div>
                                <div className="pt-4 mb-2 ml-4 border-l-2 text-end">
                                   <button onClick={() => deleteProduct(product._id)} className='p-3 text-2xl text-blue-700 bg-slate-100 rounded-2xl hover:text-red-700'><MdDeleteForever /></button>
                                </div>
                               
                              </div>)
                        }
                      </div>
                    ) : (
                      // Display subcategory name
                      <h1 className="pt-6 pb-6 text-xl font-bold">{item.sub_category_name}</h1>
                    )}
                    {!isSelected && (
                      // Render button only if not selected
                      <Link to={`/chose-components/${item.sub_category_name}`}>
                        <button
                          type="button"
                          className="p-3 text-white bg-blue-600 rounded-xl hover:bg-sky-700"
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
            return null; // Skip rendering if sub_category_name is not unique
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <h1 className="mb-5 text-2xl font-bold">Total: {calculateTotalPrice()}৳</h1>
          <button onClick={addToCart} className="mb-10 btn btn-info ms-5">Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
