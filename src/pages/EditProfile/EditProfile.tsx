
import { FieldValues, useForm } from "react-hook-form";
import { IUpdateUsers } from "../../types/MyProfileType";
import toast from "react-hot-toast";

export default function EditProfile() {
  const { register, handleSubmit } = useForm<IUpdateUsers>();
  const userData = sessionStorage.getItem('userData');
  const user = JSON.parse(userData as string);


  const imageHostKey = '29473dd4ab78ebc95009722bc0558d38';
  console.log(imageHostKey)

  const handleAddImage = async (data: FieldValues) => {
    console.log(data)

    const image = data.image[0];
    const fromData = new FormData();
    fromData.append('image', image);

    const url = `https://api.imgbb.com/1/upload?&key=${imageHostKey}`
    console.log(url)
    fetch(url, {
      method: 'POST',
      body: fromData
    })
      .then(res => res.json())
      .then(async imgData => {
        if (imgData.success) {


          console.log(imgData.data.url)


          const upload: IUpdateUsers = {

            image: imgData.data.url

          }


          const response = await fetch(`http://localhost:5000/api/v1/users/${user._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(upload),
          });

          const myProfileImage = await response.json();
          if (myProfileImage.statusCode === 200) {

            toast.success("successfully uploaded")
          } else {
            toast.error("failed to upload")
          }

        }
      })
  }



  // const handleUpdateProfile = async (data: FieldValues) => {


  //   const userprofileData: IUpdateUsers = {
  //     name: {
  //       firstName: data.name.firstName,
  //       lastName: data.name.lastName,
  //     },
  //     email: data.email,
  //     password: data.password,
  //     phoneNumber: data.phoneNumber,
  //     present_address: data.present_address,
  //     permanent_address: data.permanent_address,
  //     post_code: data.post_code,
  //     city: data.city,
  //     division: data.division,

  //   };

  //   console.log(userprofileData)

  //   const response = await fetch(`http://localhost:5000/api/v1/users/${user._id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(userprofileData),
  //   });

  //   const myProfile = await response.json();
  //   if (myProfile.statusCode === 200) {

  //     toast.success('updated profile successfully')
  //   } else {
  //     toast.error('error updating profile')
  //   }

  // };

  const handleUpdateProfile = async (data: FieldValues) => {
    const userprofileData: IUpdateUsers = {
      name: {
        firstName: data.name.firstName,
        lastName: data.name.lastName,
      },
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      present_address: data.present_address,
      permanent_address: data.permanent_address,
      post_code: data.post_code,
      city: data.city,
      division: data.division,
    };
  
    console.log(userprofileData);
  
    try {
      const response = await fetch(`http://localhost:5000/api/v1/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userprofileData),
      });
  
      const myProfile = await response.json();
      
      if (myProfile.statusCode === 200) {
        
        const updatedUserData = JSON.stringify(myProfile.data);
        sessionStorage.setItem('userData', updatedUserData);
  
        toast.success('Updated profile successfully');
      } else {
        toast.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };
  
  return (
    <div>


      <form onSubmit={handleSubmit(handleAddImage)}>

        <div className="w-full max-w-xs form-control">
          <label className="label"> <span className="label-text">Photo (photo Should be png/jpg format)</span></label>
          <input type="file" multiple {...register("image", {
          })} className="w-full max-w-xs input input-bordered" />
        </div>
        <input className="mt-4 bg-blue-600 w-28 btn" value="Update" type="submit" />
      </form>



      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="w-full max-w-xs form-control">
          <label className="label"> <span className="label-text">First Name</span></label>
          <input
            type="text"
            placeholder="First Name"
            {...register("name.firstName", {})}
            className="w-full max-w-xs input input-bordered"
            defaultValue={user?.name.firstName}
          />
        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label"> <span className="label-text">Last Name</span></label>

          <input
            type="text"
            placeholder="Last Name"
            {...register("name.lastName", {})}
            className="w-full max-w-xs input input-bordered"
            defaultValue={user?.name.lastName}
          />

        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label"> <span className="label-text">Email</span></label>

          <input type="email" placeholder="email"
            {...register("email", {
            })}
            className="w-full max-w-xs input input-bordered" defaultValue={user.email} disabled/>
        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label"> <span className="label-text">Password</span></label>

          <input type="text" placeholder="password"
            {...register("password", {
            })}
            className="w-full max-w-xs input input-bordered" defaultValue={user?.password} />

        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label"> <span className="label-text">phoneNumber</span></label>

          <input type="text" placeholder="phoneNumber"
            {...register("phoneNumber", {
            })}
            className="w-full max-w-xs input input-bordered" defaultValue={user?.phoneNumber} />

        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label"> <span className="label-text">present_address</span></label>

          <input type="text" placeholder="present address"
            {...register("present_address", {
            })}
            className="w-full max-w-xs input input-bordered"  defaultValue={user?.present_address}/>

        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label"> <span className="label-text">permanent address</span></label>

          <input type="text" placeholder="permanent address"
            {...register("permanent_address", {
            })}
            className="w-full max-w-xs input input-bordered" defaultValue={user?.permanent_address}/>

        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label"> <span className="label-text">post code</span></label>

          <input type="text" placeholder="post code"
            {...register("post_code", {
            })}
            className="w-full max-w-xs input input-bordered" defaultValue={user?.post_code}/>

        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label"> <span className="label-text">Division</span></label>

          <input type="text" placeholder="division"
            {...register("division", {
            })}
            className="w-full max-w-xs input input-bordered" defaultValue={user?.division} />

        </div>
        <div className="w-full max-w-xs form-control">
          <label className="label"> <span className="label-text">city</span></label>

          <input type="text" placeholder="city"
            {...register("city", {
            })}
            className="w-full max-w-xs input input-bordered" defaultValue={user?.city}/>

        </div>

        <input className="w-40 mt-4 bg-blue-600 btn" value="Update" type="submit" />
        <div></div>
      </form>
    </div>
  );
}
