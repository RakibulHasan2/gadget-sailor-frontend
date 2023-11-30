import { FieldValues, useForm } from "react-hook-form";
import { UpdateProductValues } from "../../types/ProductTypes";
import { FcEditImage } from "react-icons/fc";
import { IProduct } from "../../types/ProductsType";
import toast from "react-hot-toast";

const UpdateImage = ({ singleData }: IProduct) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UpdateProductValues>();
    const imageHosKey = '1a6c0e11cdde66ffb8f933ec4079f59e';
    const { _id } = singleData
    const handleUpdateImage = async (data: FieldValues) => {
        console.log(data);
        const imageFiles: FileList = data.image;
        // POST image on imagebb for hosting
        const uploadPromises = Array.from(imageFiles).map(async (image) => {
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
        const uploadedImageUrls = await Promise.all(uploadPromises);
        const imageData: UpdateProductValues = {
            image: uploadedImageUrls,
        }
        const response = await fetch(`https://gadget-sailor-backend.vercel.app/api/v1/allProducts/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(imageData)
        });
        const product = await response.json();
        if (product.statusCode === 200) {

            toast.success(product.message)

            location.reload()
        } else {
            toast.error(product.message)
        }


    }
    return (
        <div className="">
            <div>
                <div className="flex justify-center mb-10 border-b-8">
                    <div className=''>
                        <FcEditImage className="ml-5 text-6xl"> </FcEditImage>
                        <h1 className="font-bold">Upload Image</h1>
                    </div>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit(handleUpdateImage)} className="justify-around mb-10 lg:flex">
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Photo (photo Should be png/jpg format)</span></label>
                        <input type="file" multiple {...register("image", {
                            required: "Required",
                        })} className="w-full max-w-xs input input-bordered rounded-3xl" />
                        {errors.image && <p className='text-red-500'>please select image file</p>}
                    </div>
                    <div className="flex justify-center mt-9 lg:ml-0">
                        <input className="text-white bg-blue-600 hover:text-black btn rounded-3xl" value="Upload" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateImage;