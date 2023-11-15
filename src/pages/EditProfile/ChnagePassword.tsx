
import { FieldValues, useForm } from "react-hook-form";
import { FaEye, FaUserLock } from "react-icons/fa";
import { IUpdateUsers } from "../../types/MyProfileType";
import toast from "react-hot-toast";
import { useState } from "react";

const ChangePassword = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<IUpdateUsers>();

    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData as string);

    const [hideCurrent, setHideCurrent] = useState(true);
    const [hideNew, setHideNew] = useState(true);
    const [hideConfirm, setHideConfirm] = useState(true);

    const seePass = (type: string) => {
        switch (type) {
            case "current":
                setHideCurrent(!hideCurrent);
                break;
            case "new":
                setHideNew(!hideNew);
                break;
            case "confirm":
                setHideConfirm(!hideConfirm);
                break;
            default:
                break;
        }
    };

    const passwordFieldType = (type: string) => {
        switch (type) {
            case "current":
                return hideCurrent ? "password" : "text";
            case "new":
                return hideNew ? "password" : "text";
            case "confirm":
                return hideConfirm ? "password" : "text";
            default:
                return "password";
        }
    };

    const handleUpdatePassword = async (data: FieldValues) => {
        const newPassword = data.password;
        const confirmNewPassword = getValues("confirmPassword");

        if (newPassword !== confirmNewPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }

        const userPassData: IUpdateUsers = {
            password: newPassword,
        };

        try {
            const response = await fetch(`http://localhost:5000/api/v1/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userPassData),
            });

            const myProfile = await response.json();

            if (myProfile.statusCode === 200) {
                const updatedUserData = JSON.stringify(myProfile.data);
                sessionStorage.setItem('userData', updatedUserData);
                toast.success('Password changed successfully');
                location.reload();
            } else {
                toast.error('Error changing password');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error('Failed to change password');
        }
    };

    return (
        <div>
            <div>
                <div>
                    <div className="flex justify-center mb-10 border-b-8">
                        <div className=''>
                            <FaUserLock className="ml-10 text-6xl text-blue-700"> </FaUserLock>
                            <h1 className="font-bold">Change Password</h1>
                        </div>
                    </div>
                </div>
                <div className="pl-20">
                    <form onSubmit={handleSubmit(handleUpdatePassword)} className="mb-10">
                        <div className="w-full max-w-xs form-control">
                            <label className="label"> <span className="label-text">Current Password</span></label>
                            <div className="flex items-center">
                                <input
                                    type={passwordFieldType("current")}
                                    defaultValue={user?.password}
                                    className="w-full max-w-xs input input-bordered rounded-3xl"
                                    disabled
                                />
                                <a className='ml-2 text-2xl text-blue-800 cursor-pointer' title="See password" onClick={() => seePass("current")}><FaEye /></a>
                            </div>
                        </div>

                        <div className="w-full max-w-xs form-control">
                            <label className="label"> <span className="label-text">New Password</span></label>
                            <div className="flex items-center">
                                <div className="w-full">
                                    <input
                                        type={passwordFieldType("new")}
                                        {...register("password", { 
                                            required: "Filed is Required !",
                                            minLength: { value: 6, message: "Password must be 6 characters long" },
                                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                             })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl"
                                    />
                                 <small> {errors.password && <p className='text-red-600'>{errors.password.message}</p>}</small> 
                                </div>

                                <a className='ml-2 text-2xl text-blue-800 cursor-pointer' title="See password" onClick={() => seePass("new")}><FaEye /></a>
                            </div>
                        </div>

                        <div className="w-full max-w-xs form-control">
                            <label className="label"> <span className="label-text">Confirm Password</span></label>
                            <div className="flex items-center">
                                <div className="w-full">
                                    <input
                                        type={passwordFieldType("confirm")}
                                        {...register("confirmPassword", {
                                            required: "Field is Required !",
                                            minLength: { value: 6, message: "Password must be 6 characters long" },
                                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                            })}
                                        className="w-full max-w-xs input input-bordered rounded-3xl"
                                    />
                                   <small>{errors.confirmPassword && <p className='text-red-600'>{errors.confirmPassword.message}</p>}</small> 
                                </div>

                                <a className='ml-2 text-2xl text-blue-800 cursor-pointer' title="See password" onClick={() => seePass("confirm")}><FaEye /></a>
                            </div>
                        </div>

                        <div className="mt-5 ml-28">
                            <input className="text-white bg-blue-600 hover:text-black btn rounded-3xl" value="Update" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;

