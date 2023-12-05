import { Link, useNavigate } from "react-router-dom";
import { useForm, FieldValues } from 'react-hook-form';
import { IUser } from './../../types/UserType';
import toast from 'react-hot-toast';
import { FormValues } from "../../types/FormType";
import { FiArrowRight } from 'react-icons/fi';
import '../../styles/Signup.css'
import { useState } from 'react';
import { useToken } from "../../hooks/useToken";
import { FiUserPlus } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
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


        await fetch('https://gadget-sailor-backend.onrender.com/api/v1/auth/signup', {
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

    const [types, setTypes] = useState(true)

    const seePass = (type: string) => {
        switch (type) {
            case "current":
                setTypes(!types);
                break;
        }
    };
    const passwordFieldType = (type: string) => {
        switch (type) {
            case "current":
                return types ? "password" : "text";
        }
    };
    return (
        <div className='items-center justify-center p-2 lg:flex background-image'>
            <div className="justify-between shadow-2xl lg:flex sign-up-container rounded-2xl">
                <div className="text-white rounded rounded-l-2xl pc-image rounded-r-2xl lg:rounded-r-none">
                    <Link to="/home"><button className="flex items-center pt-2 mt-2 ml-2 lg:pt-0 hover:text-gray-400">Go back <FiArrowRight></FiArrowRight></button></Link>
                    <div className="flex items-center justify-center h-80">
                        <div className="text-center">
                            <span className="flex justify-center ml-3 text-6xl"><FiUserPlus /></span>
                            <h1 className="mb-2 text-4xl font-extrabold">Sign Up</h1>
                            <small className="hidden">for land shsine ksjdh kdhbi sdfhsfi <br /> jjsfhi jshf kiafha jjhafha of ioaf9 oashf fha oafh</small>
                        </div>
                    </div>
                </div>
                <div className="flex justify-centers">
                    <div className='w-full bg-transparent rounded-2xl lg:w-96 p-7'>
                        <form onSubmit={handleSubmit(handleSignUp)} className="">
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
                            <div className="flex justify-center">
                                <div className="">
                                    <div className="w-full max-w-xs mb-4 form-control">
                                        <input type="email" {...register("email", {
                                            required: "Email is Required !"
                                        })} className="w-full max-w-xs bg-transparent rounded-3xl input input-bordered" placeholder="✉ Email..." />
                                        {errors.email && <small className='mt-1 ml-2 text-red-500'>{errors.email.message}</small>}
                                    </div>
                                    <div className="max-w-xs mb-4 w-80 form-control">
                                        <input type="text" {...register("phoneNumber", {
                                            required: "Phone Number is Required !",
                                        })} className="w-full max-w-xs bg-transparent rounded-3xl input input-bordered" placeholder="☏ Phone number..." />
                                        {errors.phoneNumber && <small className='mt-1 ml-2 text-red-500'>{errors.phoneNumber.message}</small>}
                                    </div>
                                    <div className="max-w-xs w-80 form-control">
                                        <input type={passwordFieldType("current")} {...register("password", {
                                            required: "Password is Required !",
                                            minLength: { value: 6, message: "Password must be 6 characters long" },
                                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                        })} className="w-full max-w-xs bg-transparent rounded-3xl input input-bordered" placeholder="🗝 Password..." />
                                        <div className="flex justify-end">
                                            <a className='relative flex justify-end ml-2 text-2xl text-blue-800 cursor-pointer w-7 bottom-9 right-2' title="See password" onClick={() => seePass("current")}><FaEye /></a>
                                        </div>
                                        {errors.password && <small className='mt-1 ml-2 text-red-500'>{errors.password.message}</small>}
                                    </div>
                                    <input className='p-2 mt-4 mb-4 text-black bg-blue-400 w-80 btn rounded-3xl' value="Sign Up" type="submit" />
                                </div>

                            </div>

                            {/* {signUpError && <small className='text-red-600'>{signUpError}</small>} */}
                        </form>
                        <small className="flex justify-center font-black lg:ml-4 lg:flex-none">Already have an account? <Link className='font-bold text-indigo-600' to="/login">Please Login</Link></small>
                    </div>
                </div>

            </div>
        </div>
    )
}
