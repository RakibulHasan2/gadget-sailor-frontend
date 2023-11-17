
import { FieldValues, useForm } from "react-hook-form";
import { IUpdateUsers } from "../../types/MyProfileType";
import toast from "react-hot-toast";
import { userData } from "../../hooks/getUserData";

export default function EditProfile() {
  const { register, handleSubmit } = useForm<IUpdateUsers>();
  const user = userData()

  const handleUpdateProfile = async (data: FieldValues) => {
    const userprofileData: IUpdateUsers = {
      name: {
        firstName: data.name.firstName,
        lastName: data.name.lastName,
      },
      email: data.email,
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
        location.reload();
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
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="flex ">
          <div className="w-full">
            <div className="w-full max-w-xs form-control">
              <label className="label"> <span className="label-text">First Name</span></label>
              <input
                type="text"
                placeholder="First Name"
                {...register("name.firstName", {})}
                className="w-full max-w-xs input input-bordered rounded-3xl"
                defaultValue={user?.name.firstName}
              />
            </div>
            <div className="w-full max-w-xs form-control">
              <label className="label"> <span className="label-text">Last Name</span></label>

              <input
                type="text"
                placeholder="Last Name"
                {...register("name.lastName", {})}
                className="w-full max-w-xs input input-bordered rounded-3xl"
                defaultValue={user?.name.lastName}
              />

            </div>
            <div className="w-full max-w-xs form-control">
              <label className="label"> <span className="label-text">Email</span></label>

              <input type="email" placeholder="email"
                {...register("email", {
                })}
                className="w-full max-w-xs input input-bordered rounded-3xl" defaultValue={user.email} disabled />
            </div>
            <div className="w-full max-w-xs form-control">
              <label className="label"> <span className="label-text">phoneNumber</span></label>

              <input type="text" placeholder="phoneNumber"
                {...register("phoneNumber", {
                })}
                className="w-full max-w-xs input input-bordered rounded-3xl" defaultValue={user?.phoneNumber} />

            </div>
            <div className="w-full max-w-xs form-control">
              <label className="label"> <span className="label-text">present_address</span></label>

              <input type="text" placeholder="present address"
                {...register("present_address", {
                })}
                className="w-full max-w-xs input input-bordered rounded-3xl" defaultValue={user?.present_address} />

            </div>
          </div>
          <div className="w-full">

            <div className="w-full max-w-xs form-control">
              <label className="label"> <span className="label-text">permanent address</span></label>

              <input type="text" placeholder="permanent address"
                {...register("permanent_address", {
                })}
                className="w-full max-w-xs input input-bordered rounded-3xl" defaultValue={user?.permanent_address} />

            </div>
            <div className="w-full max-w-xs form-control">
              <label className="label"> <span className="label-text">post code</span></label>

              <input type="text" placeholder="post code"
                {...register("post_code", {
                })}
                className="w-full max-w-xs input input-bordered rounded-3xl" defaultValue={user?.post_code} />

            </div>
            <div className="w-full max-w-xs form-control">
              <label className="label"> <span className="label-text">Division</span></label>

              <input type="text" placeholder="division"
                {...register("division", {
                })}
                className="w-full max-w-xs input input-bordered rounded-3xl" defaultValue={user?.division} />

            </div>
            <div className="w-full max-w-xs form-control">
              <label className="label"> <span className="label-text">city</span></label>

              <input type="text" placeholder="city"
                {...register("city", {
                })}
                className="w-full max-w-xs input input-bordered rounded-3xl" defaultValue={user?.city} />

            </div>
          </div>
        </div>
        <input className="w-40 mt-4 text-white bg-blue-600 hover:text-black btn rounded-3xl" value="Update" type="submit" />

      </form>
      
    </div>
  );
}