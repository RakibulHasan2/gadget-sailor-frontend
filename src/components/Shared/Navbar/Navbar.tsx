import NavbarItem from "./NavbarItem";
import { useState, useEffect } from 'react';
import { FaCartArrowDown, FaUserCircle } from 'react-icons/fa';
import { MdBuild } from 'react-icons/md';
import { GiElectric } from 'react-icons/gi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import '../../../styles/Navbar.css'
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/logo/Screenshot_2023-11-15_122159-trsfansformed-remdfosfafvebg-preview_waifu2x_art_noise1_scale.png';
import { userData } from "../../../hooks/getUserData";
import useProductData from "../../../hooks/useProductData";
import { IProduct } from "../../../types/ProductsType";
import { FiTerminal } from "react-icons/fi";


export default function Navbar() {
  const user = userData();
  const [expanded, setExpanded] = useState(true);
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const { data } = useProductData('http://localhost:5000/api/v1/allProducts');

  const navigate = useNavigate()


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
      console.log(`Searching for: ${input.value}`);
      console.log(data);

      // const filteredData = data.filter(item => {
      //   const productNameMatch = item.product_name?.toLowerCase().includes(input.value.toLowerCase());
      //   const brandNameMatch = item.brand_name?.toLowerCase().includes(input.value.toLowerCase());
      //   const categoryNameMatch = item.category_name?.toLowerCase().includes(input.value.toLowerCase());
      //   const subCategoryNameMatch = item.sub_category_name?.toLowerCase().includes(input.value.toLowerCase());


      //   return productNameMatch || brandNameMatch || categoryNameMatch || subCategoryNameMatch;
      // }
      // );
      // setSearchResults(filteredData);


      // searchResults.map(s => {
      //   if (input.value.toLowerCase() === s.brand_name.toLowerCase()
      //   ) {
      //     navigate(`/${s.category_name}/${s.sub_category_name}/${s.brand_name}`)
      //   }
      //   else if (input.value.toLowerCase() === s.category_name.toLowerCase()) {
      //     navigate(`/${s.category_name}`)
      //   }
      //   else if (input.value.toLowerCase() === s.sub_category_name.toLowerCase()) {
      //     navigate(`/${s.category_name}/${s.sub_category_name}`)
      //   }
      //   else {
      //     console.log("sorry")
      //   }
      // })




      // navigate(`/${searchResults[0].category_name}/${searchResults[0].sub_category_name}/${searchResults[0].product_name}/${searchResults[0].brand_name}`);


      const filteredProducts = data.filter((product: IProduct) => {
        const searchTermsLowerCase = input.value.toLowerCase().split(' ');
        console.log(searchTermsLowerCase[0])
        console.log(product)

        return searchTermsLowerCase.every((term: string) => {
          console.log(term)
          const modelLowerCase = (product.model ?? '').toLowerCase();
          const brandLowerCase = (product.brand_name ?? '').toLowerCase();
          const categoryNameMatch = (product.category_name ?? '').toLowerCase();
          const subCategoryNameMatch = (product.sub_category_name ?? '').toLowerCase();
          const productNameMatch = (product.product_name ?? '').toLowerCase();

          return modelLowerCase.includes(term) || brandLowerCase.includes(FiTerminal) || productNameMatch.includes(term) || categoryNameMatch.includes(term) || subCategoryNameMatch.includes(term);
        });
      });
      setSearchResults(filteredProducts)
      console.log(filteredProducts)
      console.log(searchResults)

    };

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, [data, searchResults]);

  const [users, setUsers] = useState(
    sessionStorage.getItem('userData')
  )

  //  console.log(searchResults[0]);

  const handleLogout = () => {
    sessionStorage.removeItem('userData')
    toast.success('logged out successfully')
    setUsers(null)
    navigate('/');
  }

  return (
    <div>
      <div className="p-0 shadow-sm lg:p-5 navbar nav-bg">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            {/* for mobile view---------------------------------------------------------- */}
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 w-60 rounded-lg">
              <div className="flex pb-2 mb-5 border-b-2">
                <input type="text" placeholder="Search Item" className="w-full max-w-xs input input-bordered"


                />

                {/* {searchResults.length > 0 && (
                  <Link to={{ pathname: '/products/search', state: { searchResults } } as unknown as LinkProps}> */}
                <button className="text-black btn btn-ghost btn-circle" >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                {/* </Link>
                )} */}
              </div>


              <div className="pb-5 border-b-2">
                <Link to='/hot-offer'>
                  <div className="p-2 mb-2 text-black bg-blue-50 rounded-xl hover:text-white hover:bg-blue-700">
                    <button className="flex items-center font-bold"><small className="">Hot Offer!</small> <GiElectric className='text-3xl font-extrabol icon'></GiElectric></button>
                  </div>
                </Link>
                <Link to='/my-cart'>
                  <div className="p-2 mb-2 text-black bg-blue-50 rounded-xl hover:text-white hover:bg-blue-700">
                    <button className="flex items-center mr-5 align-middle gap-x-2" title="Cart">My-Cart<FaCartArrowDown className='text-2xl' ></FaCartArrowDown> </button>
                  </div>
                </Link>
                <Link to="/fav-item">
                  <div className="p-2 text-black bg-blue-50 rounded-xl hover:text-white hover:bg-blue-700">
                    <button className="flex items-center mr-5 align-middle rounded-xl gap-x-2" title="wishlist">
                      Favourite<AiOutlineHeart className="text-2xl"></AiOutlineHeart></button>
                  </div>
                </Link>
              </div>
              <Link to='/build-pc'>
                <div className="w-full mt-3">
                  <a className="w-full text-white btn rounded-2xl glow-on-hover"><MdBuild className='text-lg'></MdBuild> Build PC </a>
                </div>
              </Link>
            </ul>
          </div>
          {/* for desktop view---------------------------------------------- */}
          <Link to='/'>
            <img className="w-24 ml-20 lg:ml-0 lg:w-40" src={logo} alt="" />
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
          <div className="hidden mr-4 lg:block">
            <Link to='/hot-offer'><button className="flex items-center font-bold"><small className="hover:text-gray-400">Hot Offer!</small> <GiElectric className='text-3xl font-extrabol icon'></GiElectric></button></Link>
          </div>
          <div className="hidden lg:block">
            <Link to='/my-cart'>
              <button className="mr-5 text-2xl align-middle hover:text-gray-400" title="Cart"><FaCartArrowDown ></FaCartArrowDown></button>
            </Link>
          </div>
          <div className="hidden mr-5 lg:block">
            <Link to="/fav-item">
              <button className="text-2xl align-middle hover:text-red-700" title="wishlist">
                <AiOutlineHeart className=""></AiOutlineHeart></button>
            </Link>
          </div>
          {
            users ? <div className="dropdown dropdown-end">
              <label tabIndex={0} className="m-1"><button className="mt-2 mr-1 text-2xl font-bold text-center lg:mt-2 lg:mr-5 hover:text-gray-400">
                <div className="avatar online">
                  {user?.image !== undefined ? <div className="w-10 rounded-full hover:ring hover:ring-info">
                    <img src={user?.image} />
                  </div> : <div className="text-4xl rounded-full hover:ring hover:ring-info">
                    <FaUserCircle></FaUserCircle>
                  </div>}
                </div></button></label>
              <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-lg w-52 border text-black">
                <Link to='/my-profile'><li><a className=" hover:bg-blue-800 hover:text-white">My Profile</a></li></Link>
                {
                  user?.email === 'gadgetsailoradmin@gmail.com' &&
                  <Link to='/addProduct'><li><a className=" hover:bg-blue-800 hover:text-white">Add Product</a></li></Link>
                }
                <Link to='/payment/orderHistory'>
                  <li>
                    <a className=" hover:bg-blue-800 hover:text-white">
                      Order History</a>
                  </li>
                </Link>
                <li onClick={() => handleLogout()}><a className=" hover:bg-red-600 hover:text-white">Log-out</a></li>
              </ul>
            </div> : <Link to='/login'><button className="flex w-16 p-2 mr-3 font-bold border rounded-lg lg-w-0">Login<BiLogIn className='text-2xl'></BiLogIn></button></Link>
          }
          <div className="hidden lg:block">
            <Link to='/build-pc'> <a className="text-white btn rounded-2xl glow-on-hover"><MdBuild className='text-2xl'></MdBuild> Build PC </a></Link>
          </div>
        </div>
      </div>
      {/* ..........................item area............................ */}
      <div className="navbar-item">
        <NavbarItem></NavbarItem>
      </div>
    </div>
  );
}