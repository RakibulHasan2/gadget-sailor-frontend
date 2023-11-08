import { FieldValues, useForm } from "react-hook-form";
import { AddProductValues } from "../../types/ProductTypes";
import useApiData from "../../hooks/getAPIData";

const UpdateProduct = () => {
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
    const getOneSubCategory = Array.from(getSubCategory).filter((item) => item !== undefined && item !== '');
    const getOneBrand = Array.from(getBrand).filter((item) => item !== undefined);

    if (isLoading) {
        return <p>Loading...</p>;
    }


    const handleUpdateProduct = async (data: FieldValues) => {
        console.log(data)
    }


    return (
        <div>
            <div className='w-96 p-7'>
                <h2 className='text-3xl font-bold text-center text-sky-500'>Add a New Product</h2>
                <form onSubmit={handleSubmit(handleUpdateProduct)}>
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Product category</span></label>
                        <select className="select select-bordered  w-full max-w-xs" {...register("category_name", {
                            required: 'Required'
                        })}>
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


                        <select className="select select-bordered  w-full max-w-xs" {...register("sub_category_name", {
                            required: 'Required'
                        })}>
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

                        <select className="select select-bordered  w-full max-w-xs" {...register("brand_name", {
                            required: 'Required'
                        })}>
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
                                required: 'Required'
                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.product_name && <p className='text-red-600'>{errors.product_name?.message}</p>}
                    </div>

                    {/* Image */}

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Photo (photo Should be png/jpg format)</span></label>
                        <input type="file" multiple {...register("image", {
                            required: 'Required'
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
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

                    {/* Price */}
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Price</span></label>

                        <input type="text"
                            {...register("price", {

                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                    </div>


                    {/* Wrranty */}
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Warranty</span></label>

                        <input type="text"
                            {...register("warranty", {

                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.warranty && <p className='text-red-600'>{errors.warranty?.message}</p>}
                    </div>



                    {/* Others Info */}
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Others Info</span></label>

                        <textarea
                            {...register("others_info", {

                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.others_info && <p className='text-red-600'>{errors.others_info?.message}</p>}
                    </div>



                    <input className='w-full bg-blue-600 btn mt-4' value="Update" type="submit" />
                    <div>

                    </div>
                </form>


            </div>
        </div>
    );
};

export default UpdateProduct;