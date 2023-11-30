import { FieldValues, useForm } from "react-hook-form";
import { ICategory } from "../../types/CategoryType";
import useProductData from "../../hooks/useProductData";
import toast from "react-hot-toast";

const AddSubCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICategory>();
    const { data, isLoading } = useProductData("https://gadget-sailor-backend.vercel.app/api/v1/get-AllCategories")
    if (isLoading) {
        return <p>Loading...</p>;
    }
    const handleAddSubCategory = async (data: FieldValues) => {
        const subCategoryData: ICategory = {
            category_name: data.category_name,
            sub_category_name: data.sub_category_name

        }
        const response = await fetch('https://gadget-sailor-backend.vercel.app/api/v1/add_subCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subCategoryData)
        });
        const product = await response.json();
        if (product.statusCode === 200) {

            toast.success(product.message)
            location.reload();

        } else {
            toast.error(product.message)
        }

    }
    return (
        <div>
            <form onSubmit={
                handleSubmit(handleAddSubCategory)
            } className="pl-16">
                {/* category */}
                <div className="w-full max-w-xs form-control">
                    <label className="label"> <span className="label-text">Product category</span></label>
                    <select className="w-full max-w-xs select select-bordered rounded-3xl" {...register("category_name", {
                        required: 'Required'
                    })}>
                        {
                            data.map(d => (
                                <option key={d.id} value={d.category_name}>{d.category_name}</option>
                            ))
                        }
                    </select>
                    {errors.category_name && <p className='text-red-600'>{errors.category_name?.message}</p>}
                </div>
                {/* sub-category */}
                <div className="w-full max-w-xs form-control">
                    <label className="label"> <span className="label-text">Sub-category Name</span></label>

                    <input type="text" placeholder="Sub-category Name"
                        {...register("sub_category_name")}
                        className="w-full max-w-xs input input-bordered rounded-3xl" />
                    {errors.sub_category_name && <p className='text-red-600'>{errors.sub_category_name?.message}</p>}
                </div>
                <div className="mt-6 ml-36">
                    <input className="text-white bg-blue-600 hover:text-black btn rounded-xl" value="Add" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default AddSubCategory;