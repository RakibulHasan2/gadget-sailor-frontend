/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useLoaderData, useParams } from "react-router-dom";
import ProductsCard from "../../components/Products/ProductsCard";
import { IProduct } from "../../types/ProductsType";
import { useLoaderDataType } from "../../types/useLoaderDataType";
import { MdHome } from "react-icons/md";
import { useState } from "react";
import gif from '../../assets/images/no-data.gif';

export default function Products() {
    const productsData = useLoaderData() as useLoaderDataType;
    const products = Array.isArray(productsData.data) ? productsData.data : [];
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    // subcategories array
    const subCategories = [...new Set(products.map((product: IProduct) => product.sub_category_name))].filter((subcategory) => subcategory) as string[];
    //  brands array
    const brands = [...new Set(products.map((product: IProduct) => product.brand_name))].filter((item) => item !== undefined) as string[];

    const filteredProducts = products.filter((product) =>
        (selectedSubcategories.length === 0 || selectedSubcategories.includes(product.sub_category_name)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand_name))
    );

    if (filteredProducts.length === 0) {
        window.location.reload();
    }

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
            <div className="flex justify-center mb-10 shadow-lg">
                <div className="flex items-center w-9/12 p-5 lg:ml-10 ">
                    <Link to='/home'><MdHome /></Link>
                    {
                        useParams().categoryName &&
                        <>
                            <span className="mr-2 ms-2">/</span>
                            <Link to={`/${useParams().categoryName}`}>

                                <p className="ml-4 font-bold hover:text-blue-600 ">{useParams().categoryName}</p>
                            </Link>
                        </>
                    }
                    {useParams().subCategoryName &&
                        <>
                            <span className="mr-2 ms-2">/</span>
                            <Link to={`/${useParams().categoryName}/${useParams().subCategoryName}`}>
                                <p className="font-bold hover:text-blue-600">{useParams()?.subCategoryName}</p>
                            </Link>
                        </>
                    }
                    {useParams().brandName &&
                        <>
                            <span className="mr-2 ms-2">/</span>
                            <Link to={`/${useParams().categoryName}/${useParams().subCategoryName}/${useParams().brandName}`}>
                                <p className="font-bold hover:text-blue-600 ">{useParams()?.brandName}</p>
                            </Link>
                        </>
                    }
                </div>
            </div>
            <div className="gap-4 p-5 lg:flex">
                {/* products sidebar */}
                <div className="lg:mb-0 mb-10">
                    <div className="h-full flex md:flex md:justify-evenly lg:flex-col lg:justify-start">
                        {/* sub category checkbox */}
                        {subCategories.length > 1 &&
                            <div className="flex justify-center p-5 text-white bg-blue-900 lg:w-48 rounded-xl w-48">
                                <div>
                                    <h2 className="mb-4 text-xl font-bold">Subcategories:</h2>
                                    <span className="">--------</span>
                                    <div className="flex flex-col">
                                        {subCategories.map((subcategory: string) => (
                                            <label className="mt-2 text-sm" key={subcategory}>
                                                <input
                                                    type="checkbox"
                                                    value={subcategory}
                                                    // checked={selectedSubcategories.includes(subcategory)}
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
                            <div className="lg:mt-5 p-5 w-48 text-white bg-blue-900 border rounded-lg lg:w-48 md:w-64">
                                <h2 className="mb-4 text-xl font-bold">Brands:</h2>
                                <span className="">-------</span>
                                <div className="flex flex-col">
                                    {brands.map((brand: string) => (
                                        <label className="mt-2 text-sm" key={brand}>
                                            <input
                                                type="checkbox"
                                                value={brand}
                                                // checked={selectedBrands.includes(brand)}
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
                </div>
                {/* products card */}
                <div className="">
                    {
                        filteredProducts.length > 0 ?
                            <div className="grid gap-2 p-2 lg:grid-cols-4 md:grid-cols-3">
                                {
                                    filteredProducts?.map((product: IProduct) =>
                                        <ProductsCard
                                            key={product._id}
                                            product={product} _id={""} category_name={""} sub_category_name={""} brand_name={""} product_name={""} image={[]} model={""} description={""} price={0} product_code={0} status={""} reviews={[]} warranty={""} __v={""} others_info={[]} />
                                    )
                                }
                            </div>
                            :
                            <div className="p-10">
                                <p className="text-3xl font-bold">Opps!.. Sorry There is No Such a Product</p>
                                <img src={gif} alt="" />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}


