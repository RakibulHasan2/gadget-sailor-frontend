import { FieldValues, useForm } from "react-hook-form";
import { AddProductValues } from "../../types/ProductTypes";
import useApiData from "../../hooks/getAPIData";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import React from "react";



interface ICategory {
    _id: string;
    category_name?: string;
    sub_category_name?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}
interface ICategoryResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: ICategory[];
}

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddProductValues>();
    const imageHosKey = '1a6c0e11cdde66ffb8f933ec4079f59e';
    const navigate = useNavigate();
    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/allProducts")

    // get categories
    const [categoryData, setCategoryData] = React.useState<ICategory[]>([]);

    React.useEffect(() => {
        fetch('http://localhost:5000/api/v1/get-AllCategories')
            .then(res => res.json())
            .then((data: ICategoryResponse) => {
                console.log(data.data)
                setCategoryData(data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    console.log(categoryData)


    //get sub category

    const [subCategoryData, setSubCategoryData] = React.useState<ICategory[]>([]);

    React.useEffect(() => {
        fetch('http://localhost:5000/api/v1/get-subCategories')
            .then(res => res.json())
            .then((data: ICategoryResponse) => {
                console.log(data.data)
                setSubCategoryData(data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    console.log(subCategoryData)





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

    //const getOneCategory = Array.from(getCategory);
    // const getOneSubCategory = Array.from(getSubCategory).filter((item) => item !== undefined && item !== '');
    const getOneBrand = Array.from(getBrand).filter((item) => item !== undefined);


    // console.log(getOneSubCategory)
    // console.log(getOneCategory);
    // console.log(getOneSubCategory);
    // console.log(getOneBrand)

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const openModal = () => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    const handleAddProduct = async (data: FieldValues) => {
        const imageFiles: FileList = data.image;
        console.log(imageFiles)


        //POST image on imagebb for hosting
        const uploadPromises = Array.from(imageFiles).map(async (image) => {

            console.log(image)
            try {
                const formData = new FormData();
                console.log(formData)
                formData.set('image', image);
                console.log(formData)

                const imageResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imageHosKey}`, {

                    method: 'POST',

                    body: formData,
                })
                console.log(imageResponse)
                if (imageResponse.ok) {
                    const result = await imageResponse.json();
                    return result.data.url;
                } else {
                    throw new Error('Image upload failed');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                return null;
            }

        })

        console.log(uploadPromises)
        const uploadedImageUrls = await Promise.all(uploadPromises);
        console.log(uploadedImageUrls)


        const productData: AddProductValues = {
            category_name: data.category_name,
            sub_category_name: data.sub_category_name,
            brand_name: data.brand_name,
            product_name: data.product_name,
            image: uploadedImageUrls,
            model: data.model,
            description: data.description,
            price: data.price,
            product_code: data.product_code,
            status: data.status,
            reviews: [],
            warranty: data.warranty,
            others_info: data.others_info,
        }


        console.log(productData);
        console.log(imageFiles);

        //Create a new product
        const response = await fetch('http://localhost:5000/api/v1/add-products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
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
                                categoryData.map(d => (
                                    <option key={d.id} value={d.category_name}>{d.category_name}</option>
                                ))
                            }
                        </select>
                        {errors.category_name && <p className='text-red-600'>{errors.category_name?.message}</p>}
                    </div>
                    <small className="ml-10 font-black mb-4">Want to add a new category?
                        <>
                            <button className="text-blue-500" onClick={openModal}>
                                Add
                            </button>
                            <dialog id="my_modal_3" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                            ✕
                                        </button>
                                    </form>
                                    <h3 className="font-bold text-lg">Hello!</h3>

                                </div>
                            </dialog>
                        </>
                    </small>

                    {/* Sub-Category */}
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Brand Name</span></label>


                        <select className="select select-bordered  w-full max-w-xs" {...register("sub_category_name", {
                            required: 'Required'
                        })}>
                            {
                                subCategoryData.map(d => (
                                    <option key={d.id} value={d.sub_category_name}>{d.sub_category_name}</option>
                                ))
                            }
                        </select>

                        {errors.sub_category_name && <p className='text-red-600'>{errors.sub_category_name?.message}</p>}
                    </div>
                    <small className="ml-10 font-black mb-4">Want to add a new Sub-category? <Link className='font-bold text-indigo-600' to="/">Add</Link></small>

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
                    <small className="ml-10 font-black mb-4">Want to add a new Brand? <Link className='font-bold text-indigo-600' to="/">Add</Link></small>


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



                    <input className='w-full bg-blue-600 btn mt-4' value="Submit" type="submit" />
                    <div>

                    </div>
                </form>


            </div>
        </div >
    );
};

export default AddProduct;