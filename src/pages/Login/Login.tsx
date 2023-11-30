import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormValues } from "../../types/FormType";
import toast from 'react-hot-toast';
import { FiArrowRight } from 'react-icons/fi';
import '../../styles/Signup.css'
import { useState } from 'react';
import { useToken } from './../../hooks/useToken';
import { FiUserCheck } from "react-icons/fi";
export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const [token] = useToken(loginUserEmail)
  const navigate = useNavigate();
  if (token) {
    navigate('/')
  }
  const handleLogin = async (data: FieldValues) => {
    fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if (data.email) {
          console.log('save user', data)
          setLoginUserEmail(data.email)
          toast.success('Successfully logged in');
          sessionStorage.setItem('userData', JSON.stringify(data));
        }
        else {
          toast.error(data.message)
        }
      })
  }

  return (
    <div className='items-center justify-center p-2 pt-10 lg:pt-0 lg:p-0 lg:flex background-image'>
      <div className="justify-between shadow-2xl lg:flex sign-up-container rounded-2xl">
        <div className="text-white rounded rounded-l-2xl pc-image rounded-r-2xl lg:rounded-r-none">
          <Link to="/home"><button className="flex items-center pt-2 mt-2 ml-2 lg:pt-0 hover:text-gray-400">Go back <FiArrowRight></FiArrowRight></button></Link>
          <div className="flex items-center justify-center h-80">
            <div className="items-center">
              <span className="flex justify-center ml-3 text-6xl"><FiUserCheck /></span>
              <h1 className="mb-2 text-4xl font-extrabold ">Login<span className="animate-pulse">...</span></h1>
              <small className="hidden">for land shsine ksjdh kdhbi sdfhsfi <br /> jjsfhi jshf kiafha jjhafha of ioaf9 oashf fha oafh</small>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className='p-4 lg:w-96 lg:p-7'>
            <form onSubmit={handleSubmit(handleLogin)} className=" lg:pt-5">
              <div className="max-w-xs mb-4 w-80 form-control">
                <input type="email" {...register("email", {
                  required: "Email is Required !"
                })} className="w-full max-w-xs bg-transparent rounded-3xl input input-bordered" placeholder="✉ Email..." />
                {errors.email && <small className='mt-1 ml-2 text-red-500'>{errors.email.message}</small>}
              </div>
              <div className="max-w-xs mb-3 w-80 form-control">
                <input type="password" {...register("password", {
                  required: "Password is Required !",
                  minLength: { value: 6, message: "Password must be 6 characters long" },
                  pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                })} className="w-full max-w-xs bg-transparent rounded-3xl input input-bordered" placeholder="🗝 Password..." />
                {errors.password && <small className='mt-1 ml-2 text-red-500'>{errors.password.message}</small>}
              </div>

              <input className='p-2 mt-4 mb-4 text-black bg-blue-400 w-80 btn rounded-3xl' value="Login" type="submit" />
            </form>
            <small className="ml-10 font-black">New in Gadget-Sailor? <Link className='font-bold text-indigo-600' to="/signup">Please Sign-up</Link></small>
          </div>
        </div>

      </div>
    </div>
  )
}

