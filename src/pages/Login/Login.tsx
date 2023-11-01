

import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FormValues } from "../../types/FormType";
import toast from 'react-hot-toast';


interface UserData {
  name: string;
  email: string;
  phoneNumber: number;
  password: string;

}

export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>(); //formState: { errors }

  const navigate = useNavigate();

  const handleLogin = async (data: FieldValues) => {
    console.log(data);


    const allDatas = await fetch(' http://localhost:5000/api/v1/users')
    const results = await allDatas.json();

    const result = results.data;

    console.log(result);
    const allData = result.filter((info: UserData) => info.email === data.email);

    // console.log(allData);
    // console.log(allData[0].name);
    // console.log(data.password);

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
    <div className='lg:flex justify-center items-center'>
      <div>
        <img className='w-96 h-1/3' src="https://clipart.world/wp-content/uploads/2020/06/guy-doing-homework-with-laptop-1.jpg" alt="" srcSet="" />
      </div>
      <div className='w-96 p-7'>
        <h2 className='text-3xl text-sky-500 font-bold text-center'>Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label"> <span className="label-text">Email</span></label>
            <input type="text"
              {...register("email", {
                required: "Email Address is required"
              })}
              className="input input-bordered w-full max-w-xs" />
            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label"> <span className="label-text">Password</span></label>
            <input type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
              })}
              className="input input-bordered w-full max-w-xs" />
            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
            <label className="label"> <span className="label-text">Forget Password?</span></label>

          </div>
          <input className='btn bg-blue-600 w-full' value="Login" type="submit" />
          <div>
            {/* {loginError && <p className='text-red-600'>{loginError}</p>} */}
          </div>
        </form>
        <p>New to Gadget Sailor <Link className='text-sky-500 font-bold' to="/signup">Create new Account</Link></p>
        <div className="divider">OR</div>
        {/* <button onClick={googleSignIn} className='btn btn-outline w-full'>Continue With Google <FcGoogle className='ml-3'></FcGoogle></button> */}
      </div>
    </div>
  )
}

