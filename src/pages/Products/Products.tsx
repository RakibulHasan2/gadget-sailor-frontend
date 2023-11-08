import { useLoaderData } from "react-router-dom";
import ProductsCard from "../../components/Products/ProductsCard";
import { IProduct } from "../../types/ProductsType";
import { useState } from 'react'
import { useLoaderDataType } from "../../types/useLoaderDataType";
export default function Products() {

    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const productsData = useLoaderData() as useLoaderDataType;
    const products = Array.isArray(productsData.data) ? productsData.data : [];


    // subcategories array
    const subCategories = [...new Set(products.map((product: IProduct) => product.sub_category_name))].filter((subcategory) => subcategory) as string[];
    //  brands array
    const brands: string[] = [...new Set(products.map((product: IProduct) => product.brand_name))].filter((item) => item !== undefined);
    
    const handleSubcategoryChange = (subcategory: string) => {
        if (selectedSubcategories.includes(subcategory)) {
            setSelectedSubcategories(selectedSubcategories.filter((item) => item !== subcategory));
        } else {
            setSelectedSubcategories([...selectedSubcategories, subcategory]);
        }
    };

    const handleBrandChange = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((item) => item !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    return (
        <div className="flex justify-center gap-4">
            {/* side bard filtering section */}
            <div className="w-52 h-full">
                {/* sub category checkbox */}
                {subCategories.length > 1 &&
                    <div>
                        <h2 className="text-xl font-bold mb-4">Subcategories:</h2>
                        <span className="">-------------------------------</span>
                        <div className="flex flex-col">
                            {subCategories.map((subcategory: string) => (
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
                }
                {/* brands checkbox */}
                {brands.length > 0 ?
                    <div className="mt-10">
                        <h2 className="text-xl font-bold mb-4">Brands:</h2>
                        <span className="">-------------------------------</span>
                        <div className="flex flex-col">
                            {brands.map((brand: string) => (
                                <label className="mt-2 text-lg" key={brand}>
                                    <input
                                        type="checkbox"
                                        value={brand}
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => handleBrandChange(brand)}
                                    />
                                    <span className="ml-3">{brand}</span>
                                </label>
                            ))}
                        </div>
                    </div> :
                    <></>
                }
            </div>
            {/* products card */}
            <div className="grid grid-cols-4 gap-2">
                {
                    products?.map((product: IProduct) =>
                        <ProductsCard
                            key={product._id}
                            product={product} />
                    )
                }
            </div>
        </div>
    )
}


