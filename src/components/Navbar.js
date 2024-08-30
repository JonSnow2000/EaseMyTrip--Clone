import React, { useState } from 'react';
import logo from '../Assets/EaseMyTrip_Logo.svg';
import { FaUserTie } from "react-icons/fa";
import { PiBagBold } from "react-icons/pi";
import { IoDiamondOutline } from "react-icons/io5";
import { LiaCrownSolid } from "react-icons/lia";
import indiaMap from "../Assets/india.png"
import Airplane from "../Assets/Airplane.png"
import { FaRegLightbulb } from "react-icons/fa";
import bus from "../Assets/bus.png"
import cab from "../Assets/cab.png"
import flighthotel from "../Assets/flight-hotel.webp"
import holiday from "../Assets/holiday.webp"
import hotel from "../Assets/hotel.png"
import more from "../Assets/more.png"
import train from "../Assets/tain.png"
import { useUser } from '../providers/userProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { MdCardTravel } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa6";
import { PiTicket } from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";
import { CiWallet } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { FaCcVisa } from "react-icons/fa";
import { RiCustomerServiceFill } from "react-icons/ri";
import { GiCruiser } from "react-icons/gi";
import { ImGift } from "react-icons/im";
import { toast } from 'react-toastify';
import { } from "../styles/Nav.css";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const NavBar = () => {
  const { getToken, getName, onTokenHandler, onNameHandler } = useUser();
  const [showOptions, setShowOptions] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log(getToken, getName);
    console.log("logoutHandler called"); // Add this line
    onTokenHandler(null);
    onNameHandler(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    setShowOptions(false);
    navigate('/')
  };

  const handleButtonClick = (buttonName, navigateTo) => {
    setActiveButton(buttonName);
    setMenuOpen(false)
    if (navigateTo) navigate(navigateTo);
  };

  return (
    <div className='nav-bar relative'>
      <div className='border-b-2 border-gray-200'>
        <div className='topNav w-9/12 mx-auto flex items-center justify-between h-20'>
          <div className='mob-menu hidden'>
          {menuOpen?<IoClose onClick={()=>setMenuOpen(false)} className='text-4xl'/>:<HiOutlineMenuAlt2 onClick={()=>setMenuOpen(true)} className='text-4xl' />}
          </div>
          <Link to="/" className=' cursor-pointer'>
            <img src={logo} className='moblogo w-36' />
          </Link>
          <div className='hide flex gap-5'>
            <div onClick={()=>toast.info("This feature is under process")} className='cursor-not-allowed'>
              <p className='font-semibold flex gap-1 items-center text-sm'> <FaUserTie className='' />EMTMate</p>
              <p className='text-[11px] text-gray-600'>Agent travel solution</p>
            </div>
            <div onClick={()=>toast.info("This feature is under process")} className='cursor-not-allowed'>
              <p className='font-semibold text-sm flex gap-1 items-center'><PiBagBold />EMTDesk</p>
              <p className='text-[11px] text-gray-600'>Corporate travel program</p>
            </div>
            <div onClick={()=>toast.info("This feature is under process")} className='cursor-not-allowed'>
              <p className='font-semibold text-sm flex gap-1 items-center'><IoDiamondOutline />EMTRoyale</p>
              <p className='text-[11px] text-gray-600'>For Prime Members</p>
            </div>
            <div onClick={()=>toast.info("This feature is under process")} className='cursor-not-allowed'>
              <p className='font-semibold text-sm flex gap-1 items-center'><img className='w-4' src={indiaMap} />Explore Bharat</p>
              <p className='text-[11px] text-gray-600'>A Tour to India</p>
            </div>
            <div onClick={()=>toast.info("This feature is under process")} className='cursor-not-allowed'>
              <p className='font-semibold text-sm flex gap-1 items-center'><LiaCrownSolid />Join EMTPro</p>
              <p className='text-[11px] text-gray-600'>Enjoy More Benefits</p>
            </div>
            <div className="inline-block text-left">
              <div className="inline-flex rounded-md">
                <button
                  type="button"
                  className="font-bold flex border px-2 py-1 rounded-full items-center"
                  onMouseEnter={() => {
                    setShowOptions(!showOptions)
                    setShowOffers(false)
                  }}
                >
                  {getName || (
                    <button className="bg-blue-500 rounded-full cursor-pointer text-white font-semibold px-3 py-1">
                      Login or Signup
                    </button>
                  )}
                  <FaChevronDown className="mt-1 ml-2" />
                </button>
              </div>
            </div>

          </div>

        </div>


      </div>
      <div className=' border shadow-lg'>

        <div className='hide w-9/12 mx-auto flex gap-1 my-1 text-sm'>

          <div
            className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'flights' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
            onClick={() => handleButtonClick('flights', '/')}
          >
            <img src={Airplane} className='w-9' alt='Flights Icon' />
            <p className='mt-1'>Flights</p>
          </div>
          <div
            className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'hotels' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
            onClick={() => handleButtonClick('hotels', 'hotels')}
          >
            <img src={hotel} className='w-8 h-8' alt='Hotels Icon' />
            <p className='mt-1'>Hotels</p>
          </div>
          <div
            className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'flightHotels' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
            onClick={() => toast.info("This feature will update soon!")}
          >
            <img src={flighthotel} className='w-8' alt='Flight + Hotels Icon' />
            <p className='mt-1'>Flight + Hotels</p>
          </div>
          <div
            className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'trains' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
            onClick={() => handleButtonClick('trains', 'railways')}
          >
            <img src={train} className='w-9' alt='Trains Icon' />
            <p className='mt-1'>Trains</p>
          </div>
          <div
            className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'bus' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
            onClick={() => handleButtonClick('bus', 'bus')}
          >
            <img src={bus} className='w-9 h-8' alt='Bus Icon' />
            <p className='mt-1'>Bus</p>
          </div>
          <div
            className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'holidays' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
            onClick={() => toast.info("This feature will update soon!")}
          >
            <img src={holiday} className='w-8 h-8' alt='Holidays Icon' />
            <p className='mt-1'>Holidays</p>
          </div>
          <div
            className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'cabs' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
            onClick={() => toast.info("This feature will update soon!")}
          >
            <img src={cab} className='w-7 h-7' alt='Cabs Icon' />
            <p className='mt-1'>Cabs</p>
          </div>
          <div
            className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'activities' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
            onClick={() => toast.info("This feature will update soon!")}
          >
            <FaRegLightbulb className='w-7 h-6 mt-1' />
            <p className='mt-1'>Activities</p>
          </div>
          <div
            className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'more' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
            onMouseEnter={() => {
              setShowOffers(true);
              setShowOptions(false);
            }}
            onClick={() => handleButtonClick('more')}
          >
            <img src={more} className='w-8' alt='More Icon' />
            <p className='mt-1'>More</p>
          </div>
        </div>
      </div>

      {showOptions && (
        <div
          onMouseLeave={() => setShowOptions(false)}
          className="mob-login-option absolute w-72 right-44 z-10 top-14 rounded-md shadow-md bg-white"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {getToken ? (
              <div className=' shadow-2xl border rounded-md'>
                <Link
                  onClick={()=>toast.info("This feature is under process")}
                  className="block px-4 pt-2 hover:bg-sky-100 "
                  role="menuitem"
                >
                  <div className='border-b-2 pb-3 flex gap-3 cursor-not-allowed justify-start items-center'>
                    <LiaUserEditSolid className='text-3xl' />
                    <div className="font-bold text-sm">My Profile
                      <p className=' text-xs font-semibold'>Manage your profile and password</p>
                    </div>
                  </div>
                </Link>
                <Link
                  onClick={()=>toast.info("This feature is under process")}
                  className="block px-4 pt-2  cursor-not-allowed  hover:bg-sky-100 "
                  role="menuitem"
                >
                  <div className='border-b-2 pb-3 flex gap-3 justify-start items-center'>
                    <CiWallet className='text-3xl' />
                    <div className="font-bold text-sm">EMT Wallet
                      <p className=' text-xs font-semibold'>Use your wallet money to avail discounts</p>
                    </div>
                  </div>
                </Link>

                <Link
                  onClick={()=>toast.info("This feature is under process")}
                  className="block px-4 pt-2 cursor-not-allowed  hover:bg-sky-100 "
                  role="menuitem"
                >
                  <div className='border-b-2 pb-3 flex gap-3 justify-start items-center'>
                    <PiTicket className='text-3xl' />
                    <div className="font-bold text-sm">My Booking
                      <p className=' text-xs font-semibold'>Manage your bookings here</p>
                    </div>
                  </div>
                </Link>
                <Link
                  to="/login"
                  onClick={logoutHandler}
                  className="block px-4 pt-2 hover:bg-sky-100 "
                  role="menuitem"
                >
                  <div className='border-b-2 pb-3 flex gap-3 justify-start items-center'>
                    <IoLogOutOutline className='text-3xl' />
                    <div className="font-bold text-sm">Log Out
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div onClick={()=>{setShowOptions(false)}} className=' shadow-2xl border rounded-md'>
                <Link
                  to="/login"
                  className="block px-4 pt-2 hover:bg-sky-100 "
                  role="menuitem"
                >
                  <div className='border-b-2 pb-3 flex gap-3 justify-start items-center'>
                    <FaRegUser className='text-3xl' />
                    <div className="font-bold text-sm">Coustmer Login
                      <p className=' text-xs font-semibold'>Login & check bookings</p>
                    </div>
                  </div>
                </Link>
                <Link
                  to="/register"
                  className="block px-4 pt-2  hover:bg-sky-100 cursor-not-allowed"
                  role="menuitem"
                >
                  <div className='border-b-2 pb-3 flex gap-3 justify-start items-center'>
                    <MdCardTravel className='text-3xl' />
                    <div className="font-bold text-sm">Corporate Travel
                      <p className=' text-xs font-semibold'>Login corporate account</p>
                    </div>
                  </div>
                </Link>
                <Link
                  to="/register"
                  className="block px-4 pt-2 hover:bg-sky-100  cursor-not-allowed"
                  role="menuitem"
                >
                  <div className='border-b-2 pb-3 flex gap-3 justify-start items-center'>
                    <FaUserGraduate className='text-3xl' />
                    <div className="font-bold text-sm">Agent Login
                      <p className=' text-xs font-semibold'>Login your agent account</p>
                    </div>
                  </div>
                </Link>
                <Link
                  to="/register"
                  className="block px-4 pt-2 hover:bg-sky-100  cursor-not-allowed"
                  role="menuitem"
                >
                  <div className='border-b-2  pb-3 flex gap-3 justify-start items-center'>
                    <PiTicket className='text-3xl' />
                    <div className="font-bold text-sm">My Booking
                      <p className=' text-xs font-semibold'>Manage your bookings here</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}

          </div>

        </div>
      )}
      {showOffers && (
        <div className='mob-offer relative rounded-sm'>
          <div
            onMouseLeave={() => setShowOffers(false)}
            className='bg-white rounded-sm cursor-pointer absolute top-0 right-60 z-10 shadow-2xl text-black'
          >
            <div className='block px-4 pt-2 hover:bg-sky-100'>
              <div className='border-b-2 pb-3 flex gap-3 justify-start items-center'>
                <BiSolidOffer className='text-2xl' />
                <div onClick={() =>{ 
                  setShowOffers(false)
                  navigate("/offers")}
                  } className='font-bold text-sm'>
                  Offers
                  <p className='text-xs font-semibold'>Check best latest offers</p>
                </div>
              </div>
            </div>
            <div onClick={()=>{setShowOffers(false)
              toast.info("This feature will update soon!")
            }} className='block px-4 pt-2 hover:bg-sky-100  cursor-not-allowed'>
              <div className='border-b-2 pb-3 flex gap-3 justify-start items-center'>
                <img src={Airplane} className='w-8' />
                <div className='font-bold text-sm'>
                  Charters
                  <p className='text-xs font-semibold'>Book private charter here</p>
                </div>
              </div>
            </div>
            <div onClick={()=>{setShowOffers(false)
              toast.info("This feature will update soon!")
            }} className='block px-4 pt-2 hover:bg-sky-100 cursor-not-allowed'>
              <div className='border-b-2 pb-3 flex gap-3 justify-start items-center'>
                <FaCcVisa className='text-2xl' />
                <div className='font-bold text-sm'>
                  Visa
                  <p className='text-xs font-semibold'>Apply for a UAE visa online</p>
                </div>
              </div>
            </div>
            <div onClick={()=>{setShowOffers(false)
              toast.info("This feature will update soon!")
            }} className='block px-4 pt-2 hover:bg-sky-100 cursor-not-allowed'>
              <div className='border-b-2 pb-3 flex gap-3 justify-start items-center'>
                <RiCustomerServiceFill className='text-2xl' />
                <div className='font-bold text-sm'>
                  Airport service
                  <p className='text-xs font-semibold'>Enjoy airport service</p>
                </div>
              </div>
            </div>
            <div onClick={()=>{setShowOffers(false)
              toast.info("This feature will update soon!")
            }} className='block px-4 pt-2 hover:bg-sky-100 cursor-not-allowed'>
              <div className='border-b-2 pb-3 flex gap-3 justify-start items-center'>
                <GiCruiser className='text-2xl' />
                <div className='font-bold text-sm'>
                  Cruise
                  <p className='text-xs font-semibold'>Book cruise here</p>
                </div>
              </div>
            </div>
            <div onClick={()=>{setShowOffers(false)
              toast.info("This feature will update soon!")
            }} className='block px-4 pt-2 hover:bg-sky-100 cursor-not-allowed'>
              <div className='border-b-2 pb-3 flex gap-3 justify-start items-center'>
                <ImGift className='text-2xl' />
                <div className='font-bold text-sm'>
                  Gift card
                  <p className='text-xs font-semibold'>Buy gitfcards here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {menuOpen &&
        (<div className='absolute  z-50 bg-white w-[98vw] left-1 border shadow-lg'>

          <div className='mobileMenu hidden w-9/12 mx-auto gap-1 my-1 text-sm'>
            <div onClick={() => handleButtonClick()} className="inline-block w-full text-left">
              
                <button
                  type="button"
                  className="font-bold flex px-2 py-1 rounded-full items-center"
                  onMouseEnter={() => {
                    setShowOptions(!showOptions)
                    setShowOffers(false)
                  }}
                >
                  {getName || (
                    <button className="bg-blue-500 rounded-full cursor-pointer text-white font-semibold px-3 py-1">
                      Login or Signup
                    </button>
                  )}
                  <FaChevronDown className="hide mt-1 ml-2" />
                </button>
              
            </div>

            <div
              className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'flights' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
              onClick={() => handleButtonClick('flights', '/')}
            >
              <img src={Airplane} className='w-9' alt='Flights Icon' />
              <p className='mt-1'>Flights</p>
            </div>
            <div
              className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'hotels' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
              onClick={() => handleButtonClick('hotels', 'hotels')}
            >
              <img src={hotel} className='w-8 h-8' alt='Hotels Icon' />
              <p className='mt-1'>Hotels</p>
            </div>
            <div
              className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'flightHotels' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
              onClick={() => toast.info("This feature will update soon!")}
            >
              <img src={flighthotel} className='w-8' alt='Flight + Hotels Icon' />
              <p className='mt-1'>Flight + Hotels</p>
            </div>
            <div
              className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'trains' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
              onClick={() => handleButtonClick('trains', 'railways')}
            >
              <img src={train} className='w-9' alt='Trains Icon' />
              <p className='mt-1'>Trains</p>
            </div>
            <div
              className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'bus' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
              onClick={() => handleButtonClick('bus', 'bus')}
            >
              <img src={bus} className='w-9 h-8' alt='Bus Icon' />
              <p className='mt-1'>Bus</p>
            </div>
            <div
              className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'holidays' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
              onClick={() => toast.info("This feature will update soon!")}
            >
              <img src={holiday} className='w-8 h-8' alt='Holidays Icon' />
              <p className='mt-1'>Holidays</p>
            </div>
            <div
              className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'cabs' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
              onClick={() => toast.info("This feature will update soon!")}
            >
              <img src={cab} className='w-7 h-7' alt='Cabs Icon' />
              <p className='mt-1'>Cabs</p>
            </div>
            <div
              className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'activities' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
              onClick={() => toast.info("This feature will update soon!")}
            >
              <FaRegLightbulb className='w-7 h-6 mt-1' />
              <p className='mt-1'>Activities</p>
            </div>
            <div
              className={`rounded-lg px-4 py-1 flex item-center font-semibold text-gray-600 gap-1 cursor-pointer ${activeButton === 'more' ? 'bg-sky-100' : 'hover:bg-sky-100'}`}
              onMouseEnter={() => {
                setShowOffers(true);
                setShowOptions(false);
              }}
              onClick={() => handleButtonClick('more')}
            >
              <img src={more} className='w-8' alt='More Icon' />
              <p className='mt-1'>More</p>
            </div>
          </div>
        </div>
        )
      }

    </div>
  )
};

export default NavBar;