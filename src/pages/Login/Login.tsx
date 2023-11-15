import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormValues } from "../../types/FormType";
import toast from 'react-hot-toast';
import { FiArrowRight } from 'react-icons/fi';
import '../../styles/Signup.css'
import { useState } from 'react';
import { useToken } from './../../hooks/useToken';

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
        else{
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
              <h1 className="mb-2 text-4xl font-extrabold">Login.</h1>
              <small>for land shsine ksjdh kdhbi sdfhsfi <br /> jjsfhi jshf kiafha jjhafha of ioaf9 oashf fha oafh</small>
            </div>

          </div>
        </div>
        <div className='w-96 p-7'>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="w-full max-w-xs mb-4 form-control">
              <input type="email" {...register("email", {
                required: "Email is Required !"
              })} className="w-full max-w-xs bg-transparent rounded-3xl input input-bordered" placeholder="✉ Email..." />
              {errors.email && <small className='mt-1 ml-2 text-red-500'>{errors.email.message}</small>}
            </div>
            <div className="w-full max-w-xs mb-3 form-control">
              <input type="password" {...register("password", {
                required: "Password is Required !",
                minLength: { value: 6, message: "Password must be 6 characters long" },
                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
              })} className="w-full max-w-xs bg-transparent rounded-3xl input input-bordered" placeholder="🗝 Password..." />
              {errors.password && <small className='mt-1 ml-2 text-red-500'>{errors.password.message}</small>}
            </div>
            <input className='w-full p-2 mt-4 mb-4 text-black bg-blue-400 btn rounded-3xl' value="Login" type="submit" />
          </form>
          <small className="ml-10 font-black">New in Gadget-Sailor? <Link className='font-bold text-indigo-600' to="/signup">Please Sign-up</Link></small>
          <div className="divider">OR</div>
          {/* <button onClick={googleSignIn} className='w-full btn btn-outline'>Continue With Google <FcGoogle className='ml-3'></FcGoogle></button> */}
        </div>
      </div>

    </div>
  )
}

