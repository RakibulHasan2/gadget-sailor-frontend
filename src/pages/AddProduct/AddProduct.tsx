import { FieldValues, useForm } from "react-hook-form";
import { AddProductValues } from "../../types/ProductTypes";
import useApiData from "../../hooks/getAPIData";


const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddProductValues>();

    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/allProducts")


    const getCategory: Set<string> = new Set()
    const getSubCategory: Set<string> = new Set()
    const getBrand: Set<string> = new Set()

    data.forEach(d => {
        if (!getCategory.has(d.category_name)) {
            getCategory.add(d.category_name);

        }
        if (!getSubCategory.has(d.sub_category_name)) {
            getSubCategory.add(d.sub_category_name);
        }
        if (!getBrand.has(d.brand_name)) {
            // console.log(d.brand_name);
            getBrand.add(d.brand_name);
        }
    });

    const getOneCategory = Array.from(getCategory);
    const getOneSubCategory = Array.from(getSubCategory);
    const getOneBrand = Array.from(getBrand);


    // console.log(getOneCategory);
    // console.log(getOneSubCategory);
    // console.log(getOneBrand)

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const handleAddProduct = async (data: FieldValues) => {

        console.log(data);

    }



    return (
        <div>
            <div className='w-96 p-7'>
                <h2 className='text-3xl font-bold text-center text-sky-500'>Add a New Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Product category</span></label>
                        <select className="select select-bordered  w-full max-w-xs" {...register("category_name")}>
                            {
                                getOneCategory.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))
                            }
                        </select>
                        {errors.category_name && <p className='text-red-600'>{errors.category_name?.message}</p>}
                    </div>

                    {/* Sub-Category */}
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Brand Name</span></label>


                        <select className="select select-bordered  w-full max-w-xs" {...register("sub_category_name")}>
                            {
                                getOneSubCategory.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))
                            }
                        </select>



                        {errors.sub_category_name && <p className='text-red-600'>{errors.sub_category_name?.message}</p>}
                    </div>

                    {/* Brand Name */}

                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Brand Name</span></label>

                        <select className="select select-bordered  w-full max-w-xs" {...register("brand_name")}>
                            {
                                getOneBrand.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))
                            }
                        </select>
                        {errors.brand_name && <p className='text-red-600'>{errors.brand_name?.message}</p>}
                    </div>
                    {/* Product Name */}

                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Product Name</span></label>

                        <input type="text" placeholder="Product Name"
                            {...register("product_name", {

                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.product_name && <p className='text-red-600'>{errors.product_name?.message}</p>}
                    </div>

                    {/* Model */}
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Model</span></label>

                        <input type="text" placeholder="Model"
                            {...register("model", {

                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.model && <p className='text-red-600'>{errors.model?.message}</p>}
                    </div>


                    {/* Description */}

                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Product Description</span></label>

                        <textarea placeholder="Descriptions"
                            {...register("description", {

                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.description && <p className='text-red-600'>{errors.description?.message}</p>}
                    </div>


                    <input className='w-full bg-blue-600 btn mt-4' value="Submit" type="submit" />
                    <div>

                    </div>
                </form>


            </div>
        </div>
    );
};

export default AddProduct;