import { FieldValues, useForm } from "react-hook-form";
import { UpdateProductValues } from "../../types/ProductTypes";
import { IProduct } from "../../types/ProductsType";
import useProductData from "../../hooks/useProductData";
import toast from "react-hot-toast";
import '../../styles/Loader.css'

const UpdateModal = ({ singleData, closeModal }: IProduct) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UpdateProductValues>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, _id, category_name, sub_category_name, product_name, price, status, product_code, description, reviews, brand_name, image, model, warranty, quantity, ...otherProperties } = singleData;
    const { data, isLoading } = useProductData("http://localhost:5000/api/v1/allProducts")
    if (isLoading) {
        return <div className="flex justify-center p-10"><span className="loader"></span></div>;
    }
    // console.log(_id)
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
            getBrand.add(d.brand_name);
        }
    });

    const getOneCategory = Array.from(getCategory);
    const getOneSubCategory = Array.from(getSubCategory).filter((item) => item !== undefined && item !== '');
    const getOneBrand = Array.from(getBrand).filter((item) => item !== undefined);
    const handleUpdateProduct = async (data: FieldValues) => {
        const productData: UpdateProductValues = {
            category_name: data.category_name,
            sub_category_name: data.sub_category_name,
            brand_name: data.brand_name,
            product_name: data.product_name,
            model: data.model,
            description: data.description,
            price: data.price,
            product_code: data.product_code,
            status: data.status,
            quantity: data.quantity,
            warranty: data.warranty,
            ...Object.fromEntries(
                Object.keys(otherProperties).map((key) => [key, data.others_info[key]])
            )
        }

        const response = await fetch(`http://localhost:5000/api/v1/allProducts/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        const product = await response.json();

        if (product.statusCode === 200) {

            toast.success(product.message)
            closeModal();
            location.reload();


        } else {
            toast.error(product.message)
        }
    }

   
    return (
        <div>
            <div>
                <div className='items-center'>
                    <form className="mt-10" onSubmit={handleSubmit(handleUpdateProduct)}>
                        <div className="justify-between lg:flex">
                            <div className="lg:mr-40 lg:w-3/4 ">
                                {/* category */}
                                <div className="flex justify-center text-2xl text-blue-800 border-b-4">
                                    <h1>Basic Info</h1>
                                </div>
                                <div className="w-full max-w-xs mt-3 form-control">
                                    <label className="font-bold label"> <span className="label-text">Product category: {singleData?.category_name}</span></label>
                                    <select className="w-full max-w-xs select select-bordered rounded-3xl" {...register("category_name", {
                                        required: 'Required'
                                    })}
                                    >
                                        {
                                            getOneCategory.map(d => (
                                                <option key={d} value={d}>{d}</option>
                                            ))

                                        }
                                    </select>
                                    {errors.category_name && <p className='text-red-600'>{errors.category_name?.message}</p>}
                                </div>
                                {/* Sub-Category */}
                                <div className="w-full max-w-xs mt-2 form-control">
                                    <label className="font-bold label"> <span className="label-text">Subcategory name: {singleData?.sub_category_name}</span></label>
                                    <select className="w-full max-w-xs select select-bordered rounded-3xl" {...register("sub_category_name", {
                                        required: 'Required'
                                    })}
                                    >
                                        {
                                            getOneSubCategory.map(d => (
                                                <option key={d} value={d}>{d}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.sub_category_name && <p className='text-red-600'>{errors.sub_category_name?.message}</p>}
                                </div>
                                {/* Brand Name */}
                                <div className="w-full max-w-xs mt-2 form-control">
                                    <label className="font-bold label"> <span className="label-text">Brand Name : {singleData?.brand_name}</span></label>

                                    <select defaultValue={singleData?.brand_name} className="w-full max-w-xs select select-bordered rounded-3xl" {...register("brand_name", {
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
                                <div className="w-full max-w-xs mt-2 form-control">
                                    <label className="font-bold label"> <span className="label-text">Product Name</span></label>

                                    <input type="text"
                                        defaultValue={singleData?.product_name || ''}
                                        {...register("product_name", {
                                            required: 'Required'
                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl" />

                                </div>
                                <div className="w-full max-w-xs mt-2 form-control">
                                    <label className="font-bold label"> <span className="label-text">Quantity</span></label>

                                    <input defaultValue={singleData?.quantity} type="text"
                                        {...register("quantity", {

                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl" />
                                    {errors.price && <p className='text-red-600'>{errors.quantity?.message}</p>}
                                </div>
                                {/* Model */}
                                <div className="w-full max-w-xs mt-2 form-control">
                                    <label className="font-bold label"> <span className="label-text">Model</span></label>

                                    <input defaultValue={singleData?.model} type="text"
                                        {...register("model", {

                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl" />
                                    {errors.model && <p className='text-red-600'>{errors.model?.message}</p>}
                                </div>
                                {/* Description */}
                                <div className="w-full max-w-xs mt-2 form-control">
                                    <label className="font-bold label"> <span className="label-text">Product Description</span></label>

                                    <textarea defaultValue={singleData?.description} placeholder="Descriptions"
                                        {...register("description", {

                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl" />
                                    {errors.description && <p className='text-red-600'>{errors.description?.message}</p>}
                                </div>
                                {/* Price */}
                                <div className="w-full max-w-xs mt-2 form-control">
                                    <label className="font-bold label"> <span className="label-text">Price</span></label>

                                    <input defaultValue={singleData?.price} type="text"
                                        {...register("price", {

                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl" />
                                    {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                                </div>

                                {/* Quantity */}
                                {/* <div className="w-full max-w-xs mt-2 form-control">
                                    <label className="font-bold label"> <span className="label-text">Quantity</span></label>

                                    <input defaultValue={singleData?.quantity} type="text"
                                        {...register("quantity", {

                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl" />
                                    {errors.price && <p className='text-red-600'>{errors.quantity?.message}</p>}
                                </div> */}


                                {/* Wrranty */}
                                <div className="w-full max-w-xs mt-2 form-control">
                                    <label className="font-bold label"> <span className="label-text">Warranty</span></label>

                                    <input defaultValue={singleData?.warranty} type="text"
                                        {...register("warranty", {

                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl" />
                                    {errors.warranty && <p className='text-red-600'>{errors.warranty?.message}</p>}
                                </div>
                                {/* Status */}
                                <div className="w-full max-w-xs mt-2 form-control">
                                    <label className="font-bold label"> <span className="label-text">Status</span></label>

                                    <input defaultValue={singleData?.status} type="text"
                                        {...register("status", {

                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl" />
                                    {errors.status && <p className='text-red-600'>{errors.status?.message}</p>}
                                </div>
                                {/* Product Code*/}
                                <div className="w-full max-w-xs mt-3 form-control">
                                    <label className="font-bold label"> <span className="label-text">Product Code</span></label>

                                    <input defaultValue={singleData?.product_code} type="text"
                                        {...register("product_code", {

                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl" />
                                    {errors.product_code && <p className='text-red-600'>{errors.product_code?.message}</p>}
                                </div>
                            </div>
                            <div className="w-full ">
                                <div className="flex justify-center mb-3 text-2xl text-blue-800 border-b-4">
                                    <h1>Feature's Info</h1>
                                </div>
                                <div className="grid-cols-3 lg:grid gap-x-2 gap-y-5">
                                    {Object.entries(otherProperties).map(([key, value]) => (
                                        <div className="w-full max-w-xs form-control">
                                            <label className="font-bold label"> <span className="label-text">{key}</span></label>
                                            <input defaultValue={value as string | number | readonly string[] | undefined} type="text"
                                                {...register(`others_info.${key}` as keyof UpdateProductValues, {})}
                                                className="w-full max-w-xs input input-bordered rounded-3xl" />
                                            {errors.others_info && <p className='text-red-600'>{errors.others_info?.message}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-5">
                            <input className='mt-4 text-white bg-blue-600 rounded-2xl hover:text-black w-52 btn' value="Update" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;