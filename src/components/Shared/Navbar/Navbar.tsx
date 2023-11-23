import NavbarItem from "./NavbarItem";
import { useState, useEffect } from 'react';
import { FaCartArrowDown, FaUserCircle } from 'react-icons/fa';
import { MdBuild } from 'react-icons/md';
import { GiElectric } from 'react-icons/gi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import '../../../styles/Navbar.css'
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import logo from '../../../assets/logo/Screenshot_2023-11-15_122159-trsfansformed-remdfosfafvebg-preview_waifu2x_art_noise1_scale.png';
import FavModal from "../../Favourites/FavModal";

export default function Navbar() {

  const [isFavModalOpen, setIsFavModalOpen] = useState(false);

  const toggleFavModal = () => {
    setIsFavModalOpen(!isFavModalOpen);
  };
  const handleFav = () => {
    alert('Please log in to see the favourite list.');

  }
  const userData = sessionStorage.getItem('userData');
  const user = JSON.parse(userData as string);
  const [expanded, setExpanded] = useState(true);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const input: any = document.getElementById("myInput");

    const handleFocus = () => {
      setExpanded(false);
    };

    const handleBlur = () => {
      if (!input.value) {
        setExpanded(true);
      }
    };

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, []);

  const [users, setUsers] = useState(
    sessionStorage.getItem('userData')
  )


  const handleLogout = () => {
    sessionStorage.removeItem('userData')
    toast.success('logged out successfully')
    setUsers(null)
  }

  return (
    <div className="">
      <div className="p-5 shadow-sm navbar nav-bg">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-80">
              <div className="flex">
                <input type="text" placeholder="Search Item" className="w-full max-w-xs input input-bordered" />
                <button className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>

            </ul>
          </div>
          <Link to='/'>
            <img className="w-40" src={logo} alt="" />
          </Link>
        </div>
        <div className="hidden navbar-center lg:flex">
          <input
            type="text"
            placeholder="Looking for..."
            className={`w-28 lg:w-96 input input-bordered expandable-input text-black ${expanded ? "expanded" : ""
              }`}
            id="myInput"
          />
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
        <div className="navbar-end">
          <div className="mr-4">
            <Link to='/hot-offer'><button className="flex items-center font-bold"><small className="hover:text-gray-400">Hot Offer!</small> <GiElectric className='text-3xl font-extrabol icon'></GiElectric></button></Link>
          </div>
          <div>
            <Link to='/my-order'>
              <button className="mr-5 text-2xl align-middle hover:text-gray-400" title="Cart"><FaCartArrowDown></FaCartArrowDown></button>
            </Link>
          </div>
          <div className="mr-5">

            <button onClick={user ? toggleFavModal : handleFav} className="text-2xl align-middle hover:text-red-700" title="wishlist"><AiOutlineHeart></AiOutlineHeart></button>
            {isFavModalOpen && <FavModal onClose={toggleFavModal} />}
          </div>
          {
            users ? <div className="dropdown dropdown-end">
              <label tabIndex={0} className="m-1"><button className="mt-2 mr-5 text-2xl font-bold text-center hover:text-gray-400">
                <div className="avatar online">

                  {user?.image !== undefined ? <div className="w-10 rounded-full hover:ring hover:ring-info">
                    <img src={user?.image} />
                  </div> : <div className="text-4xl rounded-full hover:ring hover:ring-info">
                    <FaUserCircle></FaUserCircle>
                  </div>}

                </div></button></label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-lg w-52 border text-black">
                <Link to='/my-profile'><li><a className=" hover:bg-blue-800 hover:text-white">My Profile</a></li></Link>
                <Link to='/addProduct'><li><a className=" hover:bg-blue-800 hover:text-white">Add Product</a></li></Link>
                <li onClick={() => handleLogout()}><a className=" hover:bg-red-600 hover:text-white">Log-out</a></li>
              </ul>
            </div> : <Link to='/login'><button className="flex p-2 mr-3 font-bold border rounded-lg">Login<BiLogIn className='text-2xl'></BiLogIn></button></Link>
          }
          <Link to='/build-pc'> <a className="text-white btn rounded-2xl glow-on-hover"><MdBuild className='text-2xl'></MdBuild> Build PC </a></Link>
        </div>
      </div>
      {/* ..........................item area............................ */}
      <div className="navbar-item">
        <NavbarItem></NavbarItem>
      </div>

    </div>
  );
}