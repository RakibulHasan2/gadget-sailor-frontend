import { IProduct } from "../../types/ProductsType";
import { useState } from 'react';

export default function ProductSideBar({ products }: IProduct) {    
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    // subcategories array
    const subCategories = [...new Set(products.map((product: IProduct) => product.sub_category_name))].filter((subcategory) => subcategory) as string[];
    //  brands array
    const brands = [...new Set(products.map((product: IProduct) => product.brand_name))].filter((item) => item !== undefined) as string[];

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
        <div className="w-48 h-full">
            {/* sub category checkbox */}
            {subCategories.length > 1 &&
                <div className="text-white bg-blue-900 rounded-xl flex justify-center p-5">
                    <div>
                        <h2 className="mb-4 text-xl font-bold">Subcategories:</h2>
                        <span className="">--------</span>
                        <div className="flex flex-col">
                            {subCategories.map((subcategory: string) => (
                                <label className="mt-2 text-sm" key={subcategory}>
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
                </div>
            }
            {/* brands checkbox */}
            {brands.length > 0 ?
                <div className=" w-48 p-5 mt-10 text-white bg-blue-900 border rounded-lg">
                    <h2 className="mb-4 text-xl font-bold">Brands:</h2>
                    <span className="">-------</span>
                    <div className="flex flex-col">
                        {brands.map((brand: string) => (
                            <label className="mt-2 text-sm" key={brand}>
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
    )
}
