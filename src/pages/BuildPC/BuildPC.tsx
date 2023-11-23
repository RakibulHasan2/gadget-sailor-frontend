import useApiData from "../../hooks/getAPIData";
import { Link } from "react-router-dom";
import { useSelectedProducts } from "../../context/SelectedProductsProvider";
import { useState } from 'react';
import '../../styles/BuildPC.css';
import { userData } from "../../hooks/getUserData";
import toast from "react-hot-toast";

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
        <div className="p-10 mt-10 w-2/3 shadow-xl rounded-lg">
          <h1 className="text-2xl text-blue-900 font-bold">PC Builder - Build Your Own Computer - Gadget Sailor</h1>
          {data.data.map((item) => {
            if (!chosenItems.has(item.sub_category_name)) {
              const isSelected = selectedProducts.some(product => product.sub_category_name === item.sub_category_name);
              // If the category hasn't been displayed yet, show it
              if (!uniqueCategories[item.sub_category_name]) {
                uniqueCategories[item.sub_category_name] = true;
                return (
                  <div key={item._id} className="flex justify-between mt-10">
                    {isSelected ? (
                      <div>
                        {
                          selectedProducts.filter((p) => p.sub_category_name === item.sub_category_name)
                            .map(product =>
                              <div className="flex justify-between items-center product-info">
                                <img className="w-20" src={product.image[0]} alt="" />
                                <div>
                                  <p className="text-xl font-bold text-blue-900">{product.sub_category_name}</p>
                                  <h1 className="text-lg ">{product.product_name}</h1>
                                </div>
                                <h1 className="font-bold">{product.price}৳</h1>
                                <button onClick={() => deleteProduct(product._id)} className='text-2xl text-blue-900'>x</button>
                              </div>)
                        }
                      </div>
                    ) : (
                      // Display subcategory name
                      <h1 className="text-xl font-bold">{item.sub_category_name}</h1>
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
          <h1 className="font-bold text-2xl mb-5">Total: {calculateTotalPrice()}৳</h1>
          <button className="btn btn-info mb-10">Confirm Order</button>
          <button onClick={addToCart} className="btn btn-info mb-10 ms-5">Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
