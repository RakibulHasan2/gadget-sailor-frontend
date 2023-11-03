import { Link, useNavigate } from "react-router-dom";
import { useForm, FieldValues } from 'react-hook-form';
import { IUser } from './../../types/UserType';
import toast from 'react-hot-toast';
import { FormValues } from "../../types/FormType";

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const navigate = useNavigate();

    const handleSignUp = async (data: FieldValues) => {
        const userData: IUser = {
            name: {
                firstName: data.firstName,
                lastName: data.lastName
            },
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password
        }
            const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const user = await response.json();

            if (user.statusCode === 200) {
                toast.success(user.message)
                navigate('/home')
            } else {
                toast.error(user.message)
            }
            console.log(user);
        
    }

    return (
        <div className='items-center justify-center lg:flex'>
            <div className='w-96 p-7'>
                {/* <h2 className='mb-10 text-3xl font-bold text-center text-sky-500'>Sign Up</h2> */}
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="flex">
                        <div className="w-full max-w-xs form-control ">
                            <label className="label"> <span className="label-text">First Name</span></label>
                            <input type="text" {...register("firstName", {
                                required: "First Name is Required"
                            })} className="w-full max-w-xs input input-bordered" />
                            {errors.firstName && <p className='text-red-500'>{errors.firstName?.message}</p>}
                        </div>
                        <div className="w-full max-w-xs form-control">
                            <label className="label"> <span className="label-text">Last Name</span></label>
                            <input type="text" {...register("lastName", {
                                required: "Last Name is Required"
                            })} className="w-full max-w-xs input input-bordered" />
                            {errors.lastName && <p className='text-red-500'>{errors.lastName?.message}</p>}
                        </div>
                    </div>
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: "Email is Required"
                        })} className="w-full max-w-xs input input-bordered" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Phone Number</span></label>
                        <input type="text" {...register("phoneNumber", {
                            required: "Phone Number is required",
                        })} className="w-full max-w-xs input input-bordered" />
                        {errors.phoneNumber && <p className='text-red-500'>{errors.phoneNumber.message}</p>}
                    </div>
                    <div className="w-full max-w-xs form-control">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="w-full max-w-xs input input-bordered" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <input className='w-full p-2 mt-4 mb-4 text-white bg-blue-600 btn' value="Sign Up" type="submit" />
                    {/* {signUpError && <p className='text-red-600'>{signUpError}</p>} */}
                </form>
                <p>Already have an account <Link className='font-bold text-sky-500' to="/login">Please Login</Link></p>
            </div>
        </div>
    )
}
