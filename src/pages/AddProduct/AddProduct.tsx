import { FieldValues, useForm } from "react-hook-form";
import { AddProductValues } from "../../types/ProductTypes";
import useApiData from "../../hooks/getAPIData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddProductValues>();

    const navigate = useNavigate();

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
        const imageFiles: string[] = Array.from(data.image)
        const images = imageFiles.map((d: any) => d.name);
        console.log(images)

        const productdata: AddProductValues = {
            category_name: data.category_name,
            sub_category_name: data.sub_category_name,
            brand_name: data.brand_name,
            product_name: data.product_name,
            image: images,
            model: data.model,
            description: data.description,
            price: data.price,
            product_code: data.product_code,
            status: data.status,
            reviews: [],
            warranty: data.warranty,
            others_info: data.others_info,
        }

        console.log(productdata);
        console.log(imageFiles);
        const response = await fetch('http://localhost:5000/api/v1/add-products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productdata)
        });
        const product = await response.json();
        console.log(product);

        if (product.statusCode === 200) {

            toast.success(product.message)
            navigate('/home')
        } else {
            toast.error(product.message)
        }


    }



    return (
        <div>
            <div className='w-96 p-7'>
                <h2 className='text-3xl font-bold text-center text-sky-500'>Add a New Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>
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
                        <input type="file" {...register("image", {
                            required: 'Required'
                        })} className="input input-bordered w-full max-w-xs" multiple />
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


                    {/* Product Code */}
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Product Code</span></label>

                        <input type="text"
                            {...register("product_code", {

                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.product_code && <p className='text-red-600'>{errors.product_code?.message}</p>}
                    </div>


                    {/* Status */}
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Status</span></label>

                        <input type="text"
                            {...register("status", {

                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.status && <p className='text-red-600'>{errors.status?.message}</p>}
                    </div>


                    {/* Reviews */}
                    {/* <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Reviews</span></label>

                        <input type="text" placeholder="Model"
                            {...register("reviews", {

                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.reviews && <p className='text-red-600'>{errors.reviews?.message}</p>}
                    </div> */}


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

                        <textarea type="text"
                            {...register("others_info", {

                            })}
                            className="w-full max-w-xs input input-bordered" />
                        {errors.others_info && <p className='text-red-600'>{errors.others_info?.message}</p>}
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