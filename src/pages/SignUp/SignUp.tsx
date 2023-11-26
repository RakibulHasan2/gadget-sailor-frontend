import { Link, useNavigate } from "react-router-dom";
import { useForm, FieldValues } from 'react-hook-form';
import { IUser } from './../../types/UserType';
import toast from 'react-hot-toast';
import { FormValues } from "../../types/FormType";
import { FiArrowRight } from 'react-icons/fi';
import '../../styles/Signup.css'
import { useState } from 'react';
import { useToken } from "../../hooks/useToken";

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [createUserEmail, setCreateUserEmail] = useState('');
    const [token] = useToken(createUserEmail)
    const navigate = useNavigate();
    if (token) {
        navigate('/')
    }
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
       

        await fetch('http://localhost:5000/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.data) {
                    console.log('save user', data)
                    setCreateUserEmail(data.data.email)
                    toast.success(data.message);
                    sessionStorage.setItem('userData', JSON.stringify(data.data));
                } else {
                    toast.error(data.message)
                }
            })

    }
    return (
        <div className='items-center justify-center lg:flex background-image'>
            <div className="flex justify-between shadow-2xl sign-up-container rounded-2xl">
                <div className="text-white rounded-2xl pc-image">
                    <Link to="/home"><button className="flex items-center mt-2 ml-2 hover:text-gray-400">Go back <FiArrowRight></FiArrowRight></button></Link>
                    <div className="flex items-center justify-center h-80">
                        <div className="text-center">
                            <h1 className="mb-2 text-4xl font-extrabold">Sign Up</h1>
                            <small>for land shsine ksjdh kdhbi sdfhsfi <br /> jjsfhi jshf kiafha jjhafha of ioaf9 oashf fha oafh</small>
                        </div>
                    </div>
                </div>
                <div className='bg-transparent rounded-2xl w-96 p-7'>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="flex gap-2 mb-4">
                            <div className="w-full max-w-xs form-control ">
                                <input type="text" {...register("firstName", {
                                    required: "First Name is Required !"
                                })} className="w-full max-w-xs bg-transparent rounded-3xl input input-bordered" placeholder="First name..." />
                                {errors.firstName && <small className='mt-1 ml-2 text-red-500'>{errors.firstName?.message}</small>}
                            </div>
                            <div className="w-full max-w-xs form-control">
                                <input type="text" {...register("lastName", {
                                    required: "Last Name is Required !"
                                })} className="w-full max-w-xs bg-transparent rounded-3xl input input-bordered" placeholder="Last name..." />
                                {errors.lastName && <small className='mt-1 ml-2 text-red-500'>{errors.lastName?.message}</small>}
                            </div>
                        </div>
                        <div className="w-full max-w-xs mb-4 form-control">
                            <input type="email" {...register("email", {
                                required: "Email is Required !"
                            })} className="w-full max-w-xs bg-transparent rounded-3xl input input-bordered" placeholder="✉ Email..." />
                            {errors.email && <small className='mt-1 ml-2 text-red-500'>{errors.email.message}</small>}
                        </div>
                        <div className="w-full max-w-xs mb-4 form-control">
                            <input type="text" {...register("phoneNumber", {
                                required: "Phone Number is Required !",
                            })} className="w-full max-w-xs bg-transparent rounded-3xl input input-bordered" placeholder="☏ Phone number..." />
                            {errors.phoneNumber && <small className='mt-1 ml-2 text-red-500'>{errors.phoneNumber.message}</small>}
                        </div>
                        <div className="w-full max-w-xs form-control">
                            <input type="password" {...register("password", {
                                required: "Password is Required !",
                                minLength: { value: 6, message: "Password must be 6 characters long" },
                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                            })} className="w-full max-w-xs bg-transparent rounded-3xl input input-bordered" placeholder="🗝 Password..." />
                            {errors.password && <small className='mt-1 ml-2 text-red-500'>{errors.password.message}</small>}
                        </div>
                        <input className='w-full p-2 mt-4 mb-4 text-black bg-blue-400 btn rounded-3xl' value="Sign Up" type="submit" />
                        {/* {signUpError && <small className='text-red-600'>{signUpError}</small>} */}
                    </form>
                    <small className="font-black ml-11">Already have an account? <Link className='font-bold text-indigo-600' to="/login">Please Login</Link></small>
                </div>
            </div>
        </div>
    )
}
