import { FieldValues, useForm } from "react-hook-form";
import { ICategory } from "../../types/CategoryType";
import useApiData from "../../hooks/getAPIData";
import toast from "react-hot-toast";

const AddSubCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICategory>();
    const { data, isLoading } = useApiData("http://localhost:5000/api/v1/get-AllCategories")

    // console.log(data)
    if (isLoading) {
        return <p>Loading...</p>;
    }
    const handleAddSubCategory = async (data: FieldValues) => {
        console.log(data)

        const subCategoryData: ICategory = {
            category_name: data.category_name,
            sub_category_name: data.sub_category_name

        }
        console.log(subCategoryData);

        const response = await fetch('http://localhost:5000/api/v1/add_subCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subCategoryData)
        });
        const product = await response.json();
        console.log(product);

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
            }>

                {/* category */}
                <div className="w-full max-w-xs form-control">
                    <label className="label"> <span className="label-text">Product category</span></label>
                    <select className="select select-bordered  w-full max-w-xs" {...register("category_name", {
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
                        className="w-full max-w-xs input input-bordered" />
                    {errors.sub_category_name && <p className='text-red-600'>{errors.sub_category_name?.message}</p>}
                </div>

                <div className="mt-9">
                    <input className="text-white bg-blue-600 hover:text-black btn rounded-xl" value="Add" type="submit" />
                </div>
            </form>

        </div>
    );
};

export default AddSubCategory;