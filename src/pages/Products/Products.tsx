/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useLoaderData, useParams } from "react-router-dom";
import ProductsCard from "../../components/Products/ProductsCard";
import { IProduct } from "../../types/ProductsType";
import { useState } from 'react'
import { useLoaderDataType } from "../../types/useLoaderDataType";
import { MdHome } from "react-icons/md";
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
        <div>
            {/* selected product route */}
            <div className="flex justify-center shadow-lg  mb-10">
                <div className="flex p-5 w-9/12 lg:ml-10 items-center ">
                    <Link to='/home'><MdHome /></Link>
                    <Link to={`/${useParams().categoryName}`}>
                        <p className="ml-4 hover:text-blue-900 hover:font-bold">{useParams().categoryName}</p>
                    </Link>
                    {useParams().subCategoryName &&
                        <>
                            <span className="ms-2 mr-2">/</span>
                            <Link to={`/${useParams().categoryName}/${useParams().subCategoryName}`}>
                                <p className="hover:text-blue-900 hover:font-bold">{useParams()?.subCategoryName}</p>
                            </Link>
                        </>
                    }
                    {useParams().brandName &&
                        <>
                            <span className="ms-2 mr-2">/</span>
                            <Link to={`/${useParams().categoryName}/${useParams().subCategoryName}/${useParams().brandName}`}>
                                <p className="hover:text-blue-900 hover:font-bold">{useParams()?.brandName}</p>
                            </Link>
                        </>
                    }
                </div>
            </div>
            <div className="flex justify-center gap-4 p-5">
                {/* side bard filtering section */}
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
                {/* products card */}
                <div className="grid grid-cols-4 gap-2 p-2">
                    {
                        products?.map((product: IProduct) =>
                            <ProductsCard
                                key={product._id}
                                product={product} _id={""} category_name={""} sub_category_name={""} brand_name={""} product_name={""} image={[]} model={""} description={""} price={0} product_code={0} status={""} reviews={[]} warranty={""} __v={""} others_info={[]} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}


