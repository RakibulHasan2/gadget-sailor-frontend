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


