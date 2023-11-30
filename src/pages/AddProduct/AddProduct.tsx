import { FieldValues, useForm } from "react-hook-form";
import { AddProductValues } from "../../types/ProductTypes";
import useProductData from "../../hooks/useProductData";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import AddCategory from "../../components/AddCategory/AddCategory";
import { ICategory, ICategoryResponse } from "../../types/CategoryType";
import AddSubCategory from "../../components/AddSubCategory/AddSubCategory";
import { FaBoxOpen, FaHome } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import '../../styles/Porduct-loader.css'

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddProductValues>();
    const imageHosKey = '1a6c0e11cdde66ffb8f933ec4079f59e';
    const navigate = useNavigate();
    const { data, isLoading } = useProductData("https://gadget-sailor-backend.vercel.app/api/v1/allProducts")

    // get categories---------------------------------
    const [categoryData, setCategoryData] = React.useState<ICategory[]>([]);

    React.useEffect(() => {
        fetch('https://gadget-sailor-backend.vercel.app/api/v1/get-AllCategories')
            .then(res => res.json())
            .then((data: ICategoryResponse) => {
                setCategoryData(data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    //get sub category-----------------------------
    const [subCategoryData, setSubCategoryData] = React.useState<ICategory[]>([]);
    React.useEffect(() => {
        fetch('https://gadget-sailor-backend.vercel.app/api/v1/get-subCategories')
            .then(res => res.json())
            .then((data: ICategoryResponse) => {
                setSubCategoryData(data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const getBrand: Set<string> = new Set()
    data.forEach(d => {
        if (!getBrand.has(d.brand_name)) {
            getBrand.add(d.brand_name);
        }
    });
    const getOneBrand = Array.from(getBrand).filter((item) => item !== undefined);
    if (isLoading) {
        return <div className="flex items-center justify-center mt-72"><span className="loaderr"></span></div>;
    }
    //Handle category Modal------------------
    const openCategoryModal = () => {
        const modal = document.getElementById('categoryModal') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };
    //Handle Sub-category Modal------------------
    const openSubCategoryModal = () => {
        const modal = document.getElementById('subCategoryModal') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };
    //Handle Add Product----------------------
    const handleAddProduct = async (data: FieldValues) => {
        const imageFiles: FileList = data.image;
        //POST image on imagebb for hosting
        const uploadPromises = Array.from(imageFiles).map(async (image) => {
            try {
                const formData = new FormData();
                formData.set('image', image);
                const imageResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imageHosKey}`, {
                    method: 'POST',
                    body: formData,
                })
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
        const uploadedImageUrls = await Promise.all(uploadPromises);
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
        //Create a new product
        const response = await fetch('https://gadget-sailor-backend.vercel.app/api/v1/add-products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        const product = await response.json();
        if (product.statusCode === 200) {

            toast.success(product.message)
            navigate('/home')
        } else {
            toast.error(product.message)
        }
    }
    return (
        <div className="flex background-my-profile">
            <div className='bg-blue-900 w-72 '>
                <h1 className='flex items-center justify-center mt-5 mb-10 text-2xl text-white border-b-2'><FaBoxOpen />Porduct-Management</h1>
                <div>
                    <button className="flex items-center justify-center w-56 h-10 mb-6 ml-6 font-bold btn-one gap-x-2" onClick={openCategoryModal}><span><MdCategory />
                    </span> Add Category</button>
                    <button className="flex items-center justify-center w-56 h-10 mb-6 ml-6 font-bold btn-one gap-x-2" onClick={openSubCategoryModal}> <span><BiCategoryAlt /></span> Add Sub-category</button>
                    <Link to='/home'><button className="flex items-center justify-center w-56 h-10 mb-6 ml-6 font-bold btn-one gap-x-2"><FaHome />
                        Back Home</button></Link>
                    {/* add category */}
                    <dialog id="categoryModal" className="modal">
                        <div className="modal-box rounded-2xl">
                            <form method="dialog">
                                <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                                    ✕
                                </button>
                            </form>
                            <div className="items-center justify-center text-center ">
                                <span className="flex justify-center text-5xl text-blue-600"><MdCategory />
                                </span>
                                <h3 className="text-lg font-bold border-b-4">Add Category</h3>
                            </div>
                            <AddCategory></AddCategory>
                        </div>
                    </dialog>
                    {/* add sub-category */}
                    <dialog id="subCategoryModal" className="modal">
                        <div className="modal-box rounded-3xl">
                            <form method="dialog">
                                <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                                    ✕
                                </button>
                            </form>
                            <div className="items-center justify-center text-center ">
                                <span className="flex justify-center text-5xl text-blue-600"><BiCategoryAlt />
                                </span>
                                <h3 className="text-lg font-bold border-b-4">Add Sub-Category</h3>
                            </div>
                            <AddSubCategory></AddSubCategory>
                        </div>
                    </dialog>
                </div>
            </div>
            <div>
                <div className='w-full p-7 ml-28'>
                    <div className="mt-2 border-b-4">
                        <h1 className='flex justify-center text-5xl text-center text-blue-700'><FaBoxOpen ></FaBoxOpen></h1>
                        <h2 className='text-3xl font-bold text-center text-sky-500'>Add New Product Section</h2>
                    </div>
                    <form onSubmit={handleSubmit(handleAddProduct)} className="mt-10">
                        <div className="flex justify-between">
                            <div>
                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Product category</span></label>
                                    <select className="w-full max-w-xs select select-bordered rounded-3xl" {...register("category_name", {
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
                                {/* Sub-Category */}
                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Sub-category</span></label>
                                    <select className="w-full max-w-xs select select-bordered rounded-3xl" {...register("sub_category_name", {
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
                                {/* Brand Name */}
                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Brand Name</span></label>
                                    <select className="w-full max-w-xs select select-bordered rounded-3xl" {...register("brand_name", {
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
                                        className="w-full max-w-xs input input-bordered rounded-3xl" />
                                    {errors.product_name && <p className='text-red-600'>{errors.product_name?.message}</p>}
                                </div>
                                {/* Image */}
                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Photo (photo Should be png/jpg format)</span></label>
                                    <input type="file" multiple {...register("image", {
                                        required: 'Required'
                                    })} className="w-full max-w-xs input input-bordered rounded-3xl" />
                                    {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                                </div>
                            </div>
                            <div>
                                {/* Model */}
                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Model</span></label>

                                    <input type="text" placeholder="Model"
                                        {...register("model", {
                                            required: 'Required'
                                        })}
                                        className="max-w-xs w-96 input input-bordered rounded-3xl " />
                                    {errors.model && <p className='text-red-600'>{errors.model?.message}</p>}
                                </div>
                                {/* Description */}
                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Product Description</span></label>
                                    <textarea placeholder="Descriptions"
                                        {...register("description", {
                                            required: 'Required'
                                        })}
                                        className="w-full max-w-xs pt-3 input input-bordered rounded-3xl"
                                    />
                                    {errors.description && <p className='text-red-600'>{errors.description?.message}</p>}
                                </div>
                                {/* Price */}
                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Price</span></label>
                                    <input type="text"
                                        {...register("price", {
                                            required: 'Required'
                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl" placeholder="Price" />
                                    {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                                </div>
                                {/* Wrranty */}
                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Warranty</span></label>
                                    <input type="text"
                                        {...register("warranty", {
                                            required: 'Required'
                                        })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl" placeholder="Warranty" />
                                    {errors.warranty && <p className='text-red-600'>{errors.warranty?.message}</p>}
                                </div>
                                {/* Others Info */}
                                <div className="w-full max-w-xs form-control">
                                    <label className="label"> <span className="label-text">Others Info</span></label>
                                    <textarea
                                        {...register("others_info", {
                                            required: 'Required'
                                        })}
                                        className="w-full max-w-xs pt-3 input input-bordered rounded-3xl" placeholder="please input Product json" />
                                    {errors.others_info && <p className='text-red-600'>{errors.others_info?.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center"><input className='w-48 mt-4 text-white bg-blue-600 rounded-2xl btn hover:text-black' value="Add Product" type="submit" />
                        </div>
                        <div>
                        </div>
                    </form>
                </div>
            </div >
        </div>
    );
};

export default AddProduct;