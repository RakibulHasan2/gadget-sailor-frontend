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
        <div className='flex background-my-profile'>
            {/* Dashboard side bar */}
            <div className='p-5 bg-blue-900 w-60'>
                <h1 className='flex items-center justify-center mb-10 text-3xl text-white border-b-2'><BiSolidDashboard />My Profile</h1>
                <div>
                    <Link to='/my-cart'>
                        <button className="flex items-center justify-center w-full h-10 mb-5 font-bold btn-one gap-x-2"><FaCartArrowDown /> My Cart</button>
                    </Link>
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
            <div className="w-2/3 ml-20">
                <div className="mb-10 ">
                    <div className="">
                        <img src="https://codedesign.org/storage/app/media/uploaded-files/how-to-choose-the-right-e-commerce-agency.jpeg" alt="" className="w-full object-cover rounded-lg h-52" />
                    </div>
                    {user.image !== undefined ? <div className="absolute ml-10 top-40 avatar online">
                        <div className="w-24 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
                            <img src={user.image} />
                        </div>
                    </div> :
                        <div className="absolute ml-10 top-40 avatar online">
                            <div className='bg-white rounded-full text-8xl ring ring-info'>
                                <FaUserCircle></FaUserCircle>
                            </div>
                        </div>
                    }
                    <div className="flex items-center justify-between mt-14">
                        <h1 className='flex items-center ml-2 text-3xl font-bold'><BsPersonBadge></BsPersonBadge>  {user?.name?.firstName} {user?.name?.lastName}</h1>
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
                    <div className='mt-5'>
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