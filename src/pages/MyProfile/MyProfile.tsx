import React from 'react';
import { BsPersonBadge } from 'react-icons/bs';
import { AiTwotoneEdit } from 'react-icons/ai';
import EditProfile from '../EditProfile/EditProfile';
import { FaUserCircle, FaUserEdit } from 'react-icons/fa';
import '../../styles/MyProfile.css'
// import { Link } from 'react-router-dom';

export default function MyProfile() {

    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData as string);
    console.log(user.image)
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="flex justify-center background-my-profile">

            <div className="w-2/3 mb-10">
                <div className="">
                    <img src="https://scontent.fdac15-1.fna.fbcdn.net/v/t1.15752-9/370247270_326392490024066_3245730488107685687_n.png?_nc_cat=111&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=jjfLxEf9c-wAX8uJ8CW&_nc_ht=scontent.fdac15-1.fna&oh=03_AdSEHe3YQtLqsj9QkZfJRxB5-29DYsTHWlDdtBImSdZBoQ&oe=6577E9E3" alt="" className="w-full rounded-lg h-52" />
                </div>
               {user.image !== undefined ? <div className="absolute ml-10 top-40 avatar online">
                    <div className="w-24 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
                     <img src={user.image} />
                    </div>
                </div>:
                <div className="absolute ml-10 top-40 avatar online">
                    <div className='bg-white rounded-full text-8xl ring ring-info'>
                     <FaUserCircle></FaUserCircle>
                    </div>
                </div>}

                <div className="flex items-center justify-between mt-14">
                    <h1 className='flex items-center ml-2 text-3xl font-bold'><BsPersonBadge></BsPersonBadge>  {user?.name.firstName} {user?.name.lastName}</h1>

                    <button onClick={openModal} className='flex items-center p-1 mr-3 rounded-lg hover:text-white hover:bg-blue-700'>Edit <AiTwotoneEdit></AiTwotoneEdit></button>

                    <dialog id="my_modal_4" className="modal" open={isModalOpen} onClose={closeModal}>
                        <div className="w-11/12 max-w-5xl modal-box rounded-3xl">
                            <div className="modal-content">
                                <div className="flex justify-center mb-2 border-b-8 modal-header">
                                    <div className=''>
                                        <FaUserEdit className="ml-5 text-6xl"></FaUserEdit>
                                        <h1 className="font-bold">Edit Profile</h1>
                                    </div>

                                </div>
                                <div className="modal-body">
                                    <EditProfile />
                                </div>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>


                </div>
                <div className='mt-5'>
                    <div className='p-3 font-bold text-white bg-blue-600 rounded-lg'>
                        <h1>Basic Information </h1>
                    </div>
                    <div className='p-2 mt-2'>
                        <h1 className='mt-3 font-bold border-b-4'>Name : {user?.name.firstName} {user?.name.lastName}</h1>
                        <h1 className='mt-3 font-bold border-b-4'>Email  : {user?.email}</h1>
                        <h1 className='mt-3 font-bold border-b-4'>Phone  : {user?.phoneNumber}</h1>
                    </div>

                   { user?.division && user?.city && user?.present_address !== undefined ?<>
                    <div className='p-3 mt-5 font-bold text-white bg-blue-600 rounded-lg'>
                        <h1>Address</h1>
                    </div>
                    <div className='p-2 mt-2'>
                        <h1 className='mt-3 font-bold border-b-4'>Division : {user?.division}</h1>
                        <h1 className='mt-3 font-bold border-b-4'>Post Code  : {user?.post_code}</h1>
                        <h1 className='mt-3 font-bold border-b-4'>City : {user?.city}</h1>
                        <h1 className='mt-3 font-bold border-b-4'>Present Address : {user?.present_address}</h1>
                        <h1 className='mt-3 font-bold border-b-4'>Permanent Address : {user?.permanent_address}</h1>
                    </div></> : 
                    <div className='flex justify-center mt-5'>
                              <h1 className='p-2 bg-red-400 rounded-lg'>ⓘ For more Info please Edit your profile</h1>  
                        </div>}


                </div>
            </div>
        </div>
    )
}
