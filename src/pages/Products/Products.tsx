import { useLoaderData } from "react-router-dom";
import ProductsCard from "../../components/Products/ProductsCard";
import { IProduct } from "../../types/ProductsType";
import { useState } from 'react'
export default function Products() {
    const productsData = useLoaderData() as { data: IProduct, message: string, statusCode: number, success: boolean };
    const products = productsData.data

    const subCategories = [...new Set(products.map((product: { sub_category_name: string; }) => product.sub_category_name))];

    const [selectedSubcategories, setSelectedSubcategories] = useState([]);

    const handleSubcategoryChange = (subcategory) => {
        if (selectedSubcategories.includes(subcategory)) {
            setSelectedSubcategories(selectedSubcategories.filter((item) => item !== subcategory));
        } else {
            setSelectedSubcategories([...selectedSubcategories, subcategory]);
        }
    };

    console.log(subCategories)



    return (
        <div className="flex justify-center gap-4">
            {/* sub category checkbox */}
            <div className="w-52 h-full">
                <h2 className="text-xl font-bold mb-4">Subcategories:</h2>
                <span className="">--------------------------------</span>
                <div className="flex flex-col">
                    {subCategories.map((subcategory) => (
                        <label className="mt-2 text-lg" key={subcategory}>
                            <input
                                type="checkbox"
                                value={subcategory}
                                checked={selectedSubcategories.includes(subcategory)}
                                onChange={() => handleSubcategoryChange(subcategory)}
                            />
                            <span className="ml-3">{subcategory}</span>
                        </label>
                    ))}
                </div>
            </div>
            {/* products card */}
            <div className="grid grid-cols-4 gap-2">
                {

                    products.map((product: IProduct) =>
                        <ProductsCard
                            key={products._id}
                            product={product} />
                    )
                }
            </div>
        </div>
    )
}


