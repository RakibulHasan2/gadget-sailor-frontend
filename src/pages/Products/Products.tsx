/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useLoaderData, useParams } from "react-router-dom";
import ProductsCard from "../../components/Products/ProductsCard";
import { IProduct } from "../../types/ProductsType";
import { useLoaderDataType } from "../../types/useLoaderDataType";
import { MdHome } from "react-icons/md";
import ProductSideBar from "../../components/Products/ProductSideBar";

export default function Products() {
    const productsData = useLoaderData() as useLoaderDataType;
    const products = Array.isArray(productsData.data) ? productsData.data : [];
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
            <div className="flex justify-center gap-4 p-5">
                {/* products sidebar */}
                <div>
                    <ProductSideBar
                        products={products} _id={""} category_name={""} sub_category_name={""} brand_name={""} product_name={""} image={[]} model={""} description={""} price={0} product_code={0} status={""} reviews={[]} warranty={""} __v={""} others_info={[]} />
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


