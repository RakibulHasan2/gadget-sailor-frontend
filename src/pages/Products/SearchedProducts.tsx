
import ProductsCard from '../../components/Products/ProductsCard';
import { useSelectedProducts } from '../../context/SelectedProductsProvider';
import gif from '../../assets/images/no-data.gif'

const SearchedProducts = () => {

    const { searchProducts } = useSelectedProducts();
    // console.log(selectedProducts)
    return (
        <div>
            {
                searchProducts.length > 0 ?
                    <div className="grid gap-2 p-2 lg:grid-cols-4 md:grid-cols-3">
                        {
                            searchProducts.map(data => (
                                <ProductsCard
                                    key={data._id} _id={''} category_name={''} sub_category_name={''} brand_name={''} product_name={''} image={[]} model={''} description={''} price={0} product_code={0} status={''} reviews={[]} warranty={''} __v={''} others_info={[]}
                                    product={data} />
                            ))
                        }
                    </div>

                    :
                    <div className="p-10">
                        <p className="text-3xl font-bold">Opps!.. Sorry There is No Such a Product</p>
                        <img src={gif} alt="" />
                    </div>
            }
        </div>
    );
};

export default SearchedProducts;