import { FcEditImage } from 'react-icons/fc';
import { IUpdateUsers } from '../../types/MyProfileType';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { userData } from '../../hooks/getUserData';
const UploadImage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IUpdateUsers>();

  const user = userData()


  const imageHostKey = '29473dd4ab78ebc95009722bc0558d38';
  console.log(imageHostKey)

  const handleAddImage = async (data: FieldValues) => {
    console.log(data);

    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);

    const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`;
    console.log(url);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const imgData = await response.json();

      if (imgData.success) {
        console.log(imgData.data.url);

        const upload: IUpdateUsers = {
          image: imgData.data.url,
        };

        const updateResponse = await fetch(`http://localhost:5000/api/v1/users/${user._id}`, {
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
        <form onSubmit={handleSubmit(handleAddImage)} className="flex justify-around mb-10">

          <div className="w-full max-w-xs form-control">
            <label className="label"> <span className="label-text">Photo (photo Should be png/jpg format)</span></label>
            <input type="file" multiple {...register("image", {
              required: "Required",
            })} className="w-full max-w-xs input input-bordered rounded-3xl" />
            {errors.image && <p className='text-red-500'>please select image file</p>}
          </div>
          <div className="mt-9">
            <input className="text-white bg-blue-600 hover:text-black btn rounded-3xl" value="Upload" type="submit" />
          </div>

        </form>
      </div>
    </div>
  );
};

export default UploadImage;