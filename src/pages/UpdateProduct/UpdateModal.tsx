import { FieldValues, useForm } from "react-hook-form";
import { AddProductValues } from "../../types/ProductTypes";
import { IProduct } from "../../types/ProductsType";

import useApiData from "../../hooks/getAPIData";


const UpdateModal = ({ singleData }: IProduct,) => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddProductValues>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, category_name, sub_category_name, product_name, price, status, product_code, description, brand_name, image, model, warranty, ...otherProperties } = singleData;
    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/allProducts")
    if (isLoading) {
        return <p>Loading...</p>;
    }


    //console.log(singleData)
    //console.log(singleData.product_name)
    //console.log(data)

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


    const handleUpdateProduct = async (data: FieldValues) => {
        console.log(data)
    }
    return (
        <div>
            <div>

            </div>
            <div>
                <div className='items-center'>
                    <h2 className='text-3xl font-bold text-center text-sky-500'>Update Product:</h2>
                    <form className="" onSubmit={handleSubmit(handleUpdateProduct)}>

                        <div className="flex justify-center">

                            <div className="w-full">
                                {/* category */}

                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Product category</span></label>
                                    <select className="w-full max-w-xs select select-bordered" placeholder={singleData.category_name} {...register("category_name",)} >

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
                                    <label className="label"> <span className="label-text">Subcategory name</span></label>


                                    <select className="w-full max-w-xs select select-bordered" {...register("sub_category_name",)}>
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

                                    <select defaultValue={singleData?.brand_name} className="w-full max-w-xs select select-bordered" {...register("brand_name",)}>
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

                                    <input type="text"
                                        defaultValue={singleData?.product_name || ''}
                                        {...register("product_name", {
                                            required: 'Required'
                                        })}
                                        className="w-full max-w-xs input input-bordered" />

                                </div>


                                {/* Model */}
                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Model</span></label>

                                    <input defaultValue={singleData?.model} type="text"
                                        {...register("model", {

                                        })}
                                        className="w-full max-w-xs input input-bordered" />
                                    {errors.model && <p className='text-red-600'>{errors.model?.message}</p>}
                                </div>


                                {/* Description */}

                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Product Description</span></label>

                                    <textarea defaultValue={singleData?.description} placeholder="Descriptions"
                                        {...register("description", {

                                        })}
                                        className="w-full max-w-xs input input-bordered" />
                                    {errors.description && <p className='text-red-600'>{errors.description?.message}</p>}
                                </div>

                                {/* Price */}
                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Price</span></label>

                                    <input defaultValue={singleData?.price} type="text"
                                        {...register("price", {

                                        })}
                                        className="w-full max-w-xs input input-bordered" />
                                    {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                                </div>


                                {/* Wrranty */}
                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Warranty</span></label>

                                    <input defaultValue={singleData?.warranty} type="text"
                                        {...register("warranty", {

                                        })}
                                        className="w-full max-w-xs input input-bordered" />
                                    {errors.warranty && <p className='text-red-600'>{errors.warranty?.message}</p>}
                                </div>
                            </div>
                            <div className="w-full">
                                {Object.entries(otherProperties).map(([key, value]) => (

                                    <div className="w-full max-w-xs form-control">
                                        <label className="label"> <span className="label-text">{key}</span></label>

                                        <input defaultValue={value as string | number | readonly string[] | undefined} type="text"
                                            {...register(`others_info.${key}`, {

                                            })}
                                            className="w-full max-w-xs input input-bordered" />
                                        {errors.others_info && <p className='text-red-600'>{errors.others_info?.message}</p>}
                                    </div>
                                ))}
                            </div>

                        </div>






                        <input className='w-full  mt-4 bg-blue-600 btn' value="Update" type="submit" />

                    </form>


                </div>
            </div>
        </div>
    );
};

export default UpdateModal;