import { FcEditImage } from 'react-icons/fc';
import { IUpdateUsers } from '../../types/MyProfileType';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { userData } from '../../hooks/getUserData';
import '../../styles/MyProfile.css'
import { useState } from 'react';
const UploadImage = () => {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<IUpdateUsers>();

  const user = userData()
  const imageHostKey = '29473dd4ab78ebc95009722bc0558d38';

  const handleAddImage = async (data: FieldValues) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const imgData = await response.json();
      if (imgData.success) {
        const upload: IUpdateUsers = {
          image: imgData.data.url,
        };
        const updateResponse = await fetch(`https://gadget-sailor-backend.onrender.com/api/v1/users/${user._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(upload),
        });
        const myProfileImage = await updateResponse.json();
        if (myProfileImage.statusCode === 200) {
          const updatedUserData = { ...user, image: imgData.data.url };
          sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
          toast.success('Successfully uploaded');
          location.reload();
        } else {
          toast.error('Failed to upload');
        }
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const [hide, setHide] = useState("hidden text-blue-800 loading loading-spinner loading-md")
  const loaderButton = () =>{
    setHide("block loading loading-spinner text-blue-800 loading-md");
  }
  return (
    <div>
      <div>
        <div className="flex justify-center mb-10 border-b-8">
          <div className=''>
            <FcEditImage className="ml-5 text-6xl"> </FcEditImage>
            <h1 className="font-bold">Upload Image</h1>
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(handleAddImage)} className="justify-around mb-10 lg:flex">
          <div className="w-full max-w-xs form-control">
            <label className="label"> <span className="label-text">Photo (photo Should be png/jpg format)</span></label>
            <input type="file" multiple {...register("image", {
              required: "Required",
            })} className="w-full max-w-xs input input-bordered rounded-3xl" />
            {errors.image && <p className='text-red-500'>please select image file</p>}
          </div>
          <div className="flex justify-center mt-3 lg:flex-none lg:mt-9 rounded-3xl">
            <div className='flex'>
               <input
              className="text-white bg-blue-600 hover:text-black btn rounded-3xl"
              value="Upload"
              type="submit"
              disabled={!isDirty}
              onClick={loaderButton}
            />
            <span className={hide}></span>
            </div>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadImage;