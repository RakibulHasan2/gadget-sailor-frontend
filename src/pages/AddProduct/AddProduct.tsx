import { FieldValues, useForm } from "react-hook-form";
import { AddProductValues } from "../../types/ProductTypes";


const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddProductValues>();


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
                        <input type="text"
                            {...register("category_name", {
                                required: "Email Address is required"
                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.category_name && <p className='text-red-600'>{errors.category_name?.message}</p>}
                    </div>

                    {/* Sub-Category */}
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Product Sub-category</span></label>

                        <input type="text" placeholder="Sub-Category"
                            {...register("sub_category_name", {

                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.sub_category_name && <p className='text-red-600'>{errors.sub_category_name?.message}</p>}
                    </div>

                    {/* Brand Name */}

                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Brand Name</span></label>

                        <input type="text" placeholder="Brand Name"
                            {...register("brand_name", {

                            })}
                            className="w-full max-w-xs input input-bordered" />
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