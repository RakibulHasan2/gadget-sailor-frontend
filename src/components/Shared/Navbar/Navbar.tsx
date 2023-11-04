import NavbarItem from "./NavbarItem";
import logo from '../../../assets/images/368572024_642047007826578_1321780034725554955_n-removebg-preview.png'
import { useState, useEffect } from 'react';
import { FaCartArrowDown, FaUserAlt} from 'react-icons/fa';
import { MdBuild} from 'react-icons/md';
import { GiElectric} from 'react-icons/gi';
import { AiOutlineHeart} from 'react-icons/ai';
import '../../../styles/Navbar.css'

export default function Navbar() {

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


  return (
    <div className="">
      <div className="mb-5 shadow-md navbar bg-base-100">
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
          <a className="text-xl normal-case btn btn-ghost"><img src={logo} alt="" className="w-32" /></a>
        </div>
        <div className="hidden navbar-center lg:flex">

          <input
            type="text"
            placeholder="Looking for..."
            className={`w-28 lg:w-96 input input-bordered expandable-input ${expanded ? "expanded" : ""
              }`}
            id="myInput"
          />
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
        <div className="navbar-end">
          <div className="mr-4">
            <button className="flex items-center font-bold"><small className="hover:text-gray-400">Hot Offer!</small> <GiElectric className='text-3xl font-extrabold icon'></GiElectric></button>
          </div>
          <div>
            <button className="mr-5 text-2xl align-middle hover:text-gray-400" title="Cart"><FaCartArrowDown></FaCartArrowDown></button>
          </div>
          <div className="mr-5">
            <button className="text-2xl align-middle hover:text-red-700" title="wishlist"><AiOutlineHeart></AiOutlineHeart></button>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="m-1"><button className="mt-2 mr-5 text-2xl font-bold text-center hover:text-gray-400"><FaUserAlt></FaUserAlt></button></label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-lg w-52 border">

              <li><a>Login</a></li>
              <li><a>My Profile</a></li>
              <li><a>Log-out</a></li>
            </ul>
          </div>
          {/* <button><MdBuild></MdBuild></button> */}
          <a className="btn rounded-2xl"><MdBuild className='text-2xl'></MdBuild> Build PC </a>
        </div>
      </div>
      {/* ..........................item area............................ */}
      <div className="">
        <NavbarItem></NavbarItem>
      </div>

    </div>
  );
}