

import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormValues } from "../../types/FormType";
import toast from 'react-hot-toast';
import { IUser } from "../../types/UserType";




// ..... hello world

export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>(); //formState: { errors }

  const navigate = useNavigate();

  const handleLogin = async (data: FieldValues) => {



    const allDatas = await fetch(' http://localhost:5000/api/v1/users')
    const results = await allDatas.json();

    const result = results.data;


    const allData = result.filter((info: IUser) => info.email === data.email);

    if (allData[0].password === data.password) {
      toast.success("Scuuessfully logged in")
      localStorage.setItem('userData', JSON.stringify(allData[0]));
      navigate('/home')
      console.log(allData);
    }
    else {
      toast.error("Wrong Password")
    }
  }

  return (
    <div className='items-center justify-center lg:flex'>
      <div>
        <img className='w-96 h-1/3' src="https://clipart.world/wp-content/uploads/2020/06/guy-doing-homework-with-laptop-1.jpg" alt="" srcSet="" />
      </div>
      <div className='w-96 p-7'>
        <h2 className='text-3xl font-bold text-center text-sky-500'>Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="w-full max-w-xs form-control">
            <label className="label"> <span className="label-text">Email</span></label>
            <input type="text"
              {...register("email", {
                required: "Email Address is required"
              })}
              className="w-full max-w-xs input input-bordered" />
            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
          </div>
          <div className="w-full max-w-xs form-control">
            <label className="label"> <span className="label-text">Password</span></label>
            <input type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
              })}
              className="w-full max-w-xs input input-bordered" />
            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
            <label className="label"> <span className="label-text">Forget Password?</span></label>

          </div>
          <input className='w-full bg-blue-600 btn' value="Login" type="submit" />
          <div>
            {/* {loginError && <p className='text-red-600'>{loginError}</p>} */}
          </div>
        </form>
        <p>New to Gadget Sailor <Link className='font-bold text-sky-500' to="/signup">Create new Account</Link></p>
        <div className="divider">OR</div>
        {/* <button onClick={googleSignIn} className='w-full btn btn-outline'>Continue With Google <FcGoogle className='ml-3'></FcGoogle></button> */}
      </div>
    </div>
  )
}

