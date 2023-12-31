import React from 'react';
import { BsPersonBadge } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import EditProfile from '../../components/EditProfile/EditProfile';
import { FaCartArrowDown, FaHome, FaImage, FaUserCircle, FaUserEdit, FaUserLock } from 'react-icons/fa';
import '../../styles/MyProfile.css'
import { BiSolidDashboard } from "react-icons/bi"
import { Link } from 'react-router-dom';
import UploadImage from '../../components/EditProfile/UploadImage';
import ChangePassword from '../../components/EditProfile/ChangePassword';
import { userData } from '../../hooks/getUserData';
import { RiListOrdered } from "react-icons/ri";

export default function MyProfile() {
    const user = userData()
    // ------------------for editprodile-----------------
    const [isUserModalOpen, setIsUserModalOpen] = React.useState(false);
    const openUserModal = () => {
        setIsUserModalOpen(true);
    };
    const closeUserModal = () => {
        setIsUserModalOpen(false);
    };
    // -------------------for uploade image-------------------------------
    const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
    const openImageModal = () => {
        setIsImageModalOpen(true);
    };
    const closeImageModal = () => {
        setIsImageModalOpen(false);
    };
    //------------------------for password----------------
    const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);
    const openPasswordModal = () => {
        setIsPasswordModalOpen(true);
    };
    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
    };


    return (
        <div className='lg:flex background-my-profile'>
            {/* Dashboard side bar */}
            <div className='w-full p-5 bg-blue-900 lg:w-60'>
                <h1 className='flex items-center justify-center mb-10 text-3xl text-white border-b-2'><BiSolidDashboard />My Profile</h1>
                <div className='grid grid-cols-2 lg:grid-cols-none gap-x-1'>
                    <Link to='/my-cart'>
                        <button className="flex items-center justify-center w-full h-10 mb-5 font-bold btn-one gap-x-2"><FaCartArrowDown /> My Cart</button>
                    </Link>

                    <Link to='/payment/orderHistory'><button className="flex items-center justify-center w-full h-10 mb-5 font-bold btn-one gap-x-2"><RiListOrdered />
                        Order History</button></Link>


                    <Link to="/fav-item">
                        <button className="flex items-center justify-center w-full h-10 mb-5 font-bold btn-one gap-x-2"><AiOutlineHeart />Wishlist</button>

                    </Link>
                    <button className="flex items-center justify-center w-full h-10 mb-5 font-bold btn-one gap-x-2" onClick={openUserModal}><FaUserEdit />Edit Profile </button>

                    <button className="flex items-center justify-center w-full h-10 mb-5 font-bold btn-one gap-x-2" onClick={openImageModal}><FaImage /> Upload image</button>

                    <button className="flex items-center justify-center w-full h-10 mb-5 font-bold btn-one gap-x-2" onClick={openPasswordModal}><FaUserLock />
                        Change password</button>




                    <Link to='/home'><button className="flex items-center justify-center w-full h-10 mb-5 font-bold btn-one gap-x-2"><FaHome />
                        Back Home</button></Link>
                </div>
            </div>
            {/* my profile Information */}
            <div className=" lg:ml-20 lg:w-2/3">
                <div className=" lg:mb-10">
                    <div className="hidden lg:block">
                        <img src="https://codedesign.org/storage/app/media/uploaded-files/how-to-choose-the-right-e-commerce-agency.jpeg" alt="" className="object-cover w-full rounded-lg h-52" />
                    </div>
                    {user.image !== undefined ?
                        <div className='h-40 p-3 mt-3 rounded-lg lg:ml-0 lg:p-0 lg:h-0 lg:mt-0'>
                            <div className="absolute lg:mb-10 lg:absolute lg:ml-10 lg:top-40 avatar online lefts">
                                <div className="w-40 border rounded-full lg:w-24 ring ring-info ring-offset-base-100 ring-offset-2">
                                    <img src={user.image} />
                                </div>
                            </div>
                        </div>
                        :
                        <div className="mt-6 lg:mt-0 lg:ml-10 lg:absolute lg:top-40 avatar online dummyUser">
                            <div className='bg-white rounded-full lg:text-8xl ring ring-info'>
                                <FaUserCircle></FaUserCircle>
                            </div>
                        </div>
                    }
                    <div className="flex items-center justify-between pl-2 mt-5 lg:mt-14 ">
                        <div className='w-full lg:mr-96 name-left lg:ml-0'>
                            <h1 className='flex items-center text-3xl font-bold lg:ml-2'><BsPersonBadge></BsPersonBadge>  {user?.name?.firstName} {user?.name?.lastName}</h1>
                        </div>
                        {/* --------------------------------------edit profile modal-------------------------------------- */}
                        <dialog id="my_modal_4" className="modal" open={isUserModalOpen} onClose={closeUserModal}>
                            <div className="w-11/12 max-w-5xl modal-box rounded-3xl">
                                <div className="modal-content">
                                    <div className="flex justify-center mb-2 border-b-8 modal-header">
                                        <div className=''>
                                            <FaUserEdit className="ml-5 text-6xl text-blue-900"></FaUserEdit>
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
                        {/* ---------------------------------------image modal------------------------------------------- */}
                        <dialog id="my_modal_2" className=" modal" open={isImageModalOpen} onClose={closeImageModal}>
                            <div className="modal-box rounded-2xl">
                                <div>
                                    <UploadImage></UploadImage>
                                </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                        {/* ---------------------------------------password change modal-------------------------------------- */}
                        <dialog id="my_modal_2" className=" modal" open={isPasswordModalOpen} onClose={closePasswordModal}>
                            <div className="modal-box rounded-2xl">
                                <div>
                                    <ChangePassword></ChangePassword>
                                </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                    <div className='p-3 lg:mt-5 lg:p-0'>
                        <div className='p-3 font-bold text-white bg-blue-900 rounded-lg'>
                            <h1>Basic Information</h1>
                        </div>
                        <div className='p-2 mt-2'>
                            <h1 className='mt-3 font-bold border-b-4'>Email  : {user?.email}</h1>
                            <h1 className='mt-3 font-bold border-b-4'>Phone  : {user?.phoneNumber}</h1>
                        </div>
                        {user?.division && user?.city && user?.present_address !== undefined ? <>
                            <div className='p-3 mt-5 font-bold text-white bg-blue-900 rounded-lg'>
                                <h1>Address</h1>
                            </div>
                            <div className='p-2 mt-2'>
                                <h1 className='mt-3 font-bold border-b-4'>Division : {user?.division}</h1>
                                <h1 className='mt-3 font-bold border-b-4'>Post Code  : {user?.post_code}</h1>
                                <h1 className='mt-3 font-bold border-b-4'>City : {user?.city}</h1>
                                <h1 className='mt-3 font-bold border-b-4'>Present Address : {user?.present_address}</h1>
                                <h1 className='mt-3 font-bold border-b-4'>Permanent Address : {user?.permanent_address}</h1>
                            </div>
                        </> :
                            <div className='flex justify-center mt-5 mb-20'>
                                <h1 className='p-2 bg-red-400 rounded-lg'>ⓘ For more Info please Edit your profile</h1>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}