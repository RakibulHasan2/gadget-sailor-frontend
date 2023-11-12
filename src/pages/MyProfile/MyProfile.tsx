import { BsPersonBadge } from 'react-icons/bs';
import { AiTwotoneEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function MyProfile() {

    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData as string);
    console.log(user.division)
    return (
        <div className="flex justify-center">
          
              <div className="w-2/3 border">
                <div className="">
                    <img src="https://scontent.fdac15-1.fna.fbcdn.net/v/t1.15752-9/370247270_326392490024066_3245730488107685687_n.png?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=jjfLxEf9c-wAX8uJ8CW&_nc_ht=scontent.fdac15-1.fna&oh=03_AdSEHe3YQtLqsj9QkZfJRxB5-29DYsTHWlDdtBImSdZBoQ&oe=6577E9E3" alt="" className="w-full rounded-lg h-52" />
                </div>
                <div className="absolute ml-10 top-40 avatar online">
                    <div className="w-24 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
                        <img src={user.image} />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-14">
                    <h1 className='flex items-center ml-2 text-3xl font-bold'><BsPersonBadge></BsPersonBadge>  {user?.name.firstName} {user?.name.lastName}</h1>
                  <Link to='/edit-profile'><button className='flex items-center p-1 mr-3 rounded-lg hover:text-white hover:bg-blue-700'>Edit <AiTwotoneEdit></AiTwotoneEdit></button></Link> 
                </div>
                <div>
                    <div className='p-3 font-bold bg-blue-100 rounded-lg'>
                        <h1>Basic Information----------------------------------------------------------</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
