import { FieldValues, useForm } from "react-hook-form";
import { ICategory } from "../../types/CategoryType";
import toast from "react-hot-toast";
//import { AddProductValues } from "../../types/ProductTypes";


const AddCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICategory>();
    const handleAddCategory = async (data: FieldValues) => {
        console.log(data)

        const categoryData: ICategory = {
            category_name: data.category_name,

        }
        console.log(categoryData);

        const response = await fetch('http://localhost:5000/api/v1/create-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryData)
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
                handleSubmit(handleAddCategory)
            }>
                <div className="w-full max-w-xs form-control">
                    <label className="label"> <span className="label-text">Category Name</span></label>

                    <input type="text" placeholder="Category Name"
                        {...register("category_name")}
                        className="w-full max-w-xs input input-bordered" />
                    {errors.category_name && <p className='text-red-600'>{errors.category_name?.message}</p>}
                </div>

                <div className="mt-9">
                    <input className="text-white bg-blue-600 hover:text-black btn rounded-xl" value="Add" type="submit" />
                </div>
            </form>

        </div>
    );
};

export default AddCategory;