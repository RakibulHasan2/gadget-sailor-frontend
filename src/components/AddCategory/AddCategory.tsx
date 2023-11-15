import { FieldValues, useForm } from "react-hook-form";
//import { AddProductValues } from "../../types/ProductTypes";

interface ICategory {
    _id: string;
    category_name?: string;
    sub_category_name?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}
const AddCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICategory>();
    const handleAddCategory = async (data: FieldValues) => {
        console.log(data)
        console.log("data")
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(handleAddCategory)
            }}>
                <div className="w-full max-w-xs form-control">
                    <label className="label"> <span className="label-text">Category Name</span></label>

                    <input type="text" placeholder="Category Name"
                        {...register("category_name")}
                        className="w-full max-w-xs input input-bordered" />
                    {errors.category_name && <p className='text-red-600'>{errors.category_name?.message}</p>}
                </div>

                <button>add</button>
                {/* <div className="mt-9">
                    <input className="text-white bg-blue-600 hover:text-black btn rounded-xl" value="Add" type="submit" />
                </div> */}
            </form>

        </div>
    );
};

export default AddCategory;