import NavbarItem from "./NavbarItem";
import logo from '../../../assets/images/368572024_642047007826578_1321780034725554955_n-removebg-preview.png'
import { FcSearch } from 'react-icons/fc';
import { FaUserAlt } from 'react-icons/fa';
import { GiBoxUnpacking } from 'react-icons/gi';
import { useState } from "react";
import '../../../styles/Navbar.css'


export default function Navbar() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="">
      <div className="flex items-center justify-between p-2 shadow-lg bg-slate-200">
        <div className="flex">
          <div>
            <img className="w-40 rounded-2xl" src={logo} alt="" />
          </div>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                className={`h-10 border rounded-md bg-slate-50 ${isFocused || inputValue ? "w-96" : "w-56"
                  } transition-width duration-500 ease-in-out pl-3`}
                placeholder="Search item"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />

            </div>
            <button>
              <FcSearch className="text-3xl font-bold"></FcSearch>
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-7">
            <button className="flex">
              <GiBoxUnpacking className="mt-2 text-3xl"></GiBoxUnpacking>
              <div className="pl-1 text-left">
              <p>Offers</p>
              <small>Latest Offers</small>
              </div>
            </button>
          </div>
          <div className="mr-2 text-3xl">
            <button className="mt-2 hover:text-gray-500" title="My Account"><FaUserAlt></FaUserAlt></button>
          </div>
          <div>
            <button className="btn-build-pc">Build Pc</button>
          </div>

        </div>

      </div>
      {/* ..........................item area............................ */}
      <div className="">
        <NavbarItem></NavbarItem>
      </div>

    </div>
  );
}