import React, { useState, useEffect } from 'react';
import chatBot from '../Assets/ChatBot.svg';
import lakshadweep from '../Assets/lakshadweep.svg';
import andaman from '../Assets/andaman-new.png';
import kashmir from '../Assets/kashmir.svg';
import jaipur from '../Assets/jaipur.svg';
import bangalore from '../Assets/bangalore.svg';
import paris from '../Assets/paris.svg';
import leh from '../Assets/leh.svg';
import bali from '../Assets/bali-indonesia.svg';
import dubai from '../Assets/dubai.svg';
import kerala from '../Assets/kerala.svg';
import indidaflag from '../Assets/indiaflag.png';
import easybooking from '../Assets/easy-booking.svg';
import lowestbooking from '../Assets/lowest-booking.svg';
import excdeal from '../Assets/exc-deal.svg';
import support from '../Assets/support.svg';
import hinduNewYear from '../Assets/hindu-new-year-2024-hp.webp';
import seamless from '../Assets/seamless-online-cab-booking-hp.webp';
import holi from '../Assets/post-holi-long-weekend-hp.webp';
import marchVisit from '../Assets/places-to-visit-in-march-hp.webp';
import mumbai from '../Assets/mumbai-img.png';
import ahmedabad from '../Assets/ahmedabad-img.png';
import lucknow from '../Assets/lucknow-img.png';
import chennai from '../Assets/chennai-img.png';
import dubai1 from '../Assets/dubai-img.png';
import kolkata from '../Assets/kolkata-img.png';
import bangalore1 from '../Assets/bangalore-img.png';
import jaipurimg from '../Assets/jaipur-img.png';
import worldmap from '../Assets/worldmap.png';
import important from '../Assets/important.svg';
import { RxCalendar } from "react-icons/rx";
import trvlguid from '../Assets/trvl-guid.svg';
import Airports from "./Airports";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronDown } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosAirplane } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { Homecss } from "../styles/Home.css";


function Home({ setPassengerDetails, setSource, setDestination, setFlightData }) {
  const [bounce, setBounce] = useState(false);
  const [showListFrom, setShowListFrom] = useState(false);
  const [showListTo, setShowListTo] = useState(false);
  const [airportFrom, setAirportFrom] = useState({});
  const [airportTo, setAirportTo] = useState({});
  const [apList, setApList] = useState([]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [passanger, setPassanger] = useState(false);

  const handleHideallDropdown = ()=>{
    setShowCalendar(false)
    setShowListFrom(false)
    setShowListTo(false)
    setPassanger(false)
  }

  const totalGuests = adults + children;

  const handleAdultPlus = () => {
    setAdults(adults + 1)
  };

  const handleChildPlus = () => {
    setChildren(children + 1)
  };

  const handleAdultMinus = () => {
    if (adults > 0) {
      setAdults(adults - 1)
    }
  };

  const handleChildMinus = () => {
    if (children > 0) {
      setChildren(children - 1)
    }
  };

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today)
    const fetchAirports = async () => {
      try {
        const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/airport', {
          headers: {
            projectID: '3fqlxt7o7trf'
          }
        })
          ;
        const data = await response.json();
        setApList(data.data.airports);
        console.log(apList);
      } catch (error) {
        console.error('Error fetching airports:', error);
      }
    };

    fetchAirports();

  }, [])


  const handleFrom = () => {
    setShowListFrom(true);
  };
  const handleTo = () => {
    setShowListTo(true);
  };

  const [currentDate, setCurrentDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const today = new Date();
    const optionsDate = { day: 'numeric' };
    const optionsMonth = { year: 'numeric', month: 'long' };
    setCurrentDate(today.toLocaleDateString('en-US', optionsDate));
    setCurrentMonth(today.toLocaleDateString('en-US', optionsMonth));
    setCurrentDay(today.toLocaleDateString('en-US', { weekday: 'long' }));
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const navigate = useNavigate();

  const defaultFlightSearch = async (src, dest) => {
    const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3);
    const response = await axios.get(
      `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${src.iata_code}","destination":"${dest.iata_code}"}&day=${formattedDate}`,
      {
        headers: {
          projectID: '{{3fqlxt7o7trf}}',
        },
      }
    );

    console.log('Flight search response:', response.data.data);
    setFlightData(response.data.data.flights);
    setSource(src)
    setDestination(dest)
    if (response.data.data.flights.length > 0) {
      navigate("/flights");
    }
  }

  const handleSearch = async () => {
    if (totalGuests == 0) {
      toast.info("Please select the number of Traveller!");
    }
    setPassengerDetails(prevDetails => ({
      ...prevDetails,
      "destination": airportTo,
      "origin": airportFrom,
      "departureDate": selectedDate,
      "totalGuests": totalGuests
    }))

    try {
      if (!selectedDate) {
        toast.info("Please select the journey date");
        return;
      } else if (!airportFrom.iata_code) {
        toast.info("Please select source.");
        return;
      } else if (!airportTo.iata_code) {
        toast.info("Please select destination.");
        return;
      }else if(airportFrom.iata_code == airportTo.iata_code){
        toast.info("Source and destination cann't be the same!");
        return
      }

      const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3);
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${airportFrom.iata_code}","destination":"${airportTo.iata_code}"}&day=${formattedDate}`,
        {
          headers: {
            projectID: '{{3fqlxt7o7trf}}',
          },
        }
      );

      console.log('Flight search response:', response.data.data);
      setFlightData(response.data.data.flights);
      setSource(airportFrom)
      setDestination(airportTo)
      if (response.data.data.flights.length > 0) {
        navigate("/flights");
      }
    } catch (error) {
      console.error('Error searching for flights:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 900); // Reset bounce after 900ms
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative'>
      <div>
        <div  className="bluedivperent bg-gradient-to-r from-blue-500 to-sky-400 py-12">
          <div className='bluediv w-9/12 mx-auto'>
            <div className="hide flex justify-between items-center">
              <div className='text-xs'>
                <button className="bg-white text-blue-500 font-semibold rounded-full px-4 py-1">One Way</button>
                <button onClick={()=>toast.info("This feature is under process!")} className="text-gray-200 font-semibold py-1 px-4 cursor-not-allowed ">Round Trip</button>
                <button onClick={()=>toast.info("This feature is under process!")} className="text-gray-200 font-semibold py-1 px-4 cursor-not-allowed">Multicity</button>
              </div>
              <p className='text-white font-bold text-xl'>Search Lowest Price</p>
            </div>
            <div className='flex mt-3 shadow-2xl '>
              <div className='search-container bg-white  rounded-s-md w-full flex '>
                <div className=' w-1/2 flex'>
                  <div onClick={handleFrom} className='from py-2 pl-3 w-1/2 overflow-hidden rounded-s-md border-r hover:bg-sky-100 cursor-pointer'>
                    <p className='text-gray-500 text-xs'>FROM</p>
                    <p className='from-p font-bold text-2xl'>{airportFrom.city ? airportFrom.city : "Source"}</p>
                    <p className='hide text-gray-500 text-xs'>[{airportFrom.iata_code ? airportFrom.iata_code : "Airport code"}] {airportFrom.name ? airportFrom.name : "Airport name"}</p>
                  </div>
                  <div onClick={handleTo} className='to py-2 overflow-hidden text-nowrap border-r w-1/2 pl-3 hover:bg-sky-100 cursor-pointer'>
                    <p className='text-gray-500 text-xs'>TO</p>
                    <p className='to-p font-bold text-2xl'>{airportTo.city ? airportTo.city : "Destination"}</p>
                    <p className='hide text-gray-500 text-xs'>
                      [{airportTo.iata_code ? airportTo.iata_code : "Airport code"}] {airportTo.name ? airportTo.name : "Airport name"}</p>
                  </div>
                </div>
                <div className=' flex departure w-1/2'>
                  <div className='date py-2 border-r w-1/3 pl-6 hover:bg-sky-100 cursor-pointer'>
                    <p className='text-gray-500 text-nowrap text-xs'>DEPARTURE DATE</p>
                    <div className='flex items-baseline gap-1'>
                      <div className='date-p flex items-baseline' onClick={() => setShowCalendar(!showCalendar)}>
                        <p className='font-bold  text-2xl'>{selectedDate ? selectedDate.toLocaleDateString('en-US', { day: "numeric" }) : currentDate}</p>
                        <p className='noWrap ml-1 text-sm'>{selectedDate ? selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : currentMonth}</p>
                      </div>
                      <RxCalendar className='hide ml-1 text-gray-400 text-xl' />
                      {showCalendar && (
                        <div className='calender absolute'>
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateSelect}
                            inline
                            minDate={new Date()}
                          />
                        </div>
                      )}
                    </div>
                    <p className='text-gray-500 text-xs'>{selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long' }) : currentDay}</p>
                  </div>

                  <div className='hide tabHide w-1/3 py-2 hover:bg-sky-100 cursor-not-allowed pl-3'>
                    <p className='text-gray-500 text-xs'>RETURN DATE</p>
                    <div className='flex'>
                      <p className='text-gray-500 w-28 text-xs'>Book a round trip to save more</p>
                      <RxCalendar className='ml-1 text-gray-400 text-xl' />
                    </div>
                  </div>



                  <div onClick={() => setPassanger(true)} className='guest w-1/3 py-2 hover:bg-sky-100 cursor-pointer pl-3'>
                    <p className=' text-gray-500 text-xs'>TRAVELLER & CLASS</p>
                    <div className='flex font-bold items-center'>
                      <span className='text-2xl'>{totalGuests}</span><p className='text-sm'>Traveller(s)<FaChevronDown className='hide tabHide inline ml-2' /></p>
                    </div>
                    <p className='hide tabHide text-gray-500 text-xs'>FIRST</p>
                  </div>
                </div>
              </div>
              <button onClick={handleSearch} className='search bg-orange-500 rounded-e-md px-8 text-xl text-white font-bold'>SEARCH</button>
            </div>
            <div className='hide flex justify-between'>
              <div className="flex space-x-4 text-md mt-4">
                <div className='flex justify-center items-center gap-1'>
                  <input className='w-4 h-4' type="radio" name="discount" />
                  <label className="text-white"> Defence Forces</label>
                </div>
                <div className='flex justify-center items-center gap-1'>
                  <input className='w-4 h-4' type="radio" name="discount" />
                  <label className="text-white"> Students</label>
                </div>
                <div className='flex justify-center items-center gap-1'>
                  <input className='w-4 h-4' type="radio" name="discount" />
                  <label className="text-white"> Senior Citizens</label>
                </div>
                <div className='flex justify-center items-center gap-1'>
                  <input className='w-4 h-4' type="radio" name="discount" />
                  <label className="text-white"> Doctors Nurses</label>
                </div>
              </div>
              <div onClick={()=>toast.info("This feature is under process!")} className="text-right mt-4">
                <button className="border  text-white py-1 bg-sky-400 px-2 text-sm rounded-sm"><img className='inline mr-2 w-6 cursor-not-allowed' src='https://www.easemytrip.com/images/flight-img/web-checkin-icon-v1.svg' />Web Check-In</button>
              </div>
            </div>
          </div>
        </div>


        <div onClick={handleHideallDropdown} className='headingperent w-9/12 relative gap-5 mx-auto flex  my-16 flex-col justify-center items-center'>
          <img className=' absolute -z-50 bg-cover opacity-5 top-0 w-10/12 h-2/12' src={worldmap} />
          <p className='heading text-4xl text-center my-5 font-bold'><img src={indidaflag} className='w-12 mr-3 inline' />Top Flight Routes<img src={indidaflag} className='w-12 inline ml-3' /></p>

          <div className='topflight w-full flex flex-wrap justify-center gap-10 items-center'>
            <div onClick={() => defaultFlightSearch(apList[11], apList[8])} className='flex gap-4 cursor-pointer hover:bg-sky-100 p-1 w-[353px] rounded-lg '>
              <img src={mumbai} className='w-18 rounded-xl' />
              <div className='flex flex-col items-start justify-between'>
                <p className='font-semibold text-xl'>Chennai <IoIosAirplane className='inline' /> Mumbai</p>
                <p className='font-bold text-blue-500'>MAA-BOM</p>
              </div>
            </div>
            <div onClick={() => defaultFlightSearch(apList[7], apList[1])} className='flex gap-4 cursor-pointer hover:bg-sky-100 p-1 w-[353px] rounded-lg'>
              <img src={ahmedabad} className='w-18 rounded-xl' />
              <div className='flex flex-col items-start justify-between'>
                <p className='font-semibold text-xl'>Delhi <IoIosAirplane className='inline' /> Ahmedabad</p>
                <p className='font-bold text-blue-500'>DEL-AMD</p>
              </div>
            </div>
            <div onClick={() => defaultFlightSearch(apList[7], apList[16])} className='flex gap-4 cursor-pointer hover:bg-sky-100 p-1 w-[353px] rounded-lg'>
              <img src={lucknow} className='w-18 rounded-xl' />
              <div className='flex flex-col items-start justify-between'>
                <p className='font-semibold text-xl'>Delhi <IoIosAirplane className='inline' /> Lucknow</p>
                <p className='font-bold text-blue-500'>DEL-LKO</p>
              </div>
            </div>
            <div onClick={() => defaultFlightSearch(apList[8], apList[11])} className='flex gap-4 cursor-pointer hover:bg-sky-100 p-1 w-[353px] rounded-lg'>
              <img src={chennai} className='w-18 rounded-xl' />
              <div className='flex flex-col items-start justify-between'>
                <p className='font-semibold text-xl'>Mumbai <IoIosAirplane className='inline' /> Chennai</p>
                <p className='font-bold text-blue-500'>BOM-MAA</p>
              </div>
            </div>
            <div onClick={() => defaultFlightSearch(apList[8], apList[19])} className='flex gap-4 cursor-pointer hover:bg-sky-100 p-1 w-[353px] rounded-lg'>
              <img src={dubai1} className='w-18 rounded-xl' />
              <div className='flex flex-col items-start justify-between'>
                <p className='font-semibold text-xl'>Mumbai <IoIosAirplane className='inline' /> Amritser</p>
                <p className='font-bold text-blue-500'>BOM-ATQ</p>
              </div>
            </div>
            <div onClick={() => defaultFlightSearch(apList[8], apList[10])} className='flex gap-4 cursor-pointer hover:bg-sky-100 p-1  w-[353px] rounded-lg'>
              <img src={kolkata} className='w-18 rounded-xl' />
              <div className='flex flex-col items-start justify-between'>
                <p className='font-semibold text-xl'>Mumbai <IoIosAirplane className='inline' /> Kolkata</p>
                <p className='font-bold text-blue-500'>BOM-CCU</p>
              </div>
            </div>
            <div onClick={() => defaultFlightSearch(apList[0], apList[9])} className='flex gap-4 cursor-pointer hover:bg-sky-100 p-1 w-[353px] rounded-lg'>
              <img src={bangalore1} className='w-18 rounded-xl' />
              <div className='flex flex-col items-start justify-between'>
                <p className='font-semibold text-xl'>Hyderabad <IoIosAirplane className='inline' /> Bangalore</p>
                <p className='font-bold text-blue-500'>HYD-BLR</p>
              </div>
            </div>
            <div onClick={() => defaultFlightSearch(apList[8], apList[5])} className='flex gap-4 cursor-pointer hover:bg-sky-100 p-1 w-[353px] rounded-lg'>
              <img src={jaipurimg} className='w-18 rounded-xl' />
              <div className='flex flex-col items-start justify-between'>
                <p className='font-semibold text-xl'>Mumbai <IoIosAirplane className='inline' /> jaipur</p>
                <p className='font-bold text-blue-500'>BOM-JAI</p>
              </div>
            </div>
            <div onClick={() => defaultFlightSearch(apList[7], apList[5])} className='flex gap-4 cursor-pointer hover:bg-sky-100 p-1 w-[353px] rounded-lg'>
              <img src={dubai1} className='w-18 rounded-xl' />
              <div className='flex flex-col items-start justify-between'>
                <p className='font-semibold text-xl'>Delhi <IoIosAirplane className='inline' /> Jaipur</p>
                <p className='font-bold text-blue-500'>DEL-JAI</p>
              </div>
            </div>
          </div>

          <div className='hide flex w-full gap-6 mt-10 justify-between items-center'>
            <div className='flex gap-6 bg-white shadow-md w-1/2 p-4 rounded-lg'>
              <img src={important} className='w-10' />
              <div className=''>
                <p className='font-semibold '>Important Info:</p>
                <p className='text-sm'>To cancel/claim refund or reschedule/modify your booking. <span className='text-blue-400 block cursor-not-allowed'>Click here...</span></p>
              </div>
            </div>
            <div className='flex gap-6 shadow-md p-4 w-1/2 rounded-lg'>
              <img src={important} className='w-10' />
              <div className=''>
                <p className='font-semibold '>Travel Guide</p>
                <p className='text-sm'>Get latest information on airlines & airports guidelines, state-wise quarantine rules, travel checklists, web-checkin etc.<span className='text-blue-400 cursor-not-allowed'>Click here...</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className='headingperent w-9/12 gap-5 mx-auto flex  my-16 flex-col justify-center items-center'>

          <p className='heading text-4xl text-center my-5 font-bold'><img src={indidaflag} className='w-12 mr-3 inline' />Famous Tourist Attraction<img src={indidaflag} className='w-12 inline ml-3' /></p>
          <div className='famousParent'>
            <div className='famous flex gap-20'>
              <div className='hover:text-sky-400 cursor-pointer'>
                <img src={lakshadweep} className='w-28' />
                <p className='font-semibold text-xl text-center hover:text-sky-400'>Lakshadweep</p>
              </div>
              <div className='hover:text-sky-400 cursor-pointer'>
                <img src={andaman} className='w-28' />
                <p className='font-semibold text-xl text-center hover:text-sky-400'>Andaman</p>
              </div>
              <div className='hover:text-sky-400 cursor-pointer'>
                <img src={kashmir} className='w-28' />
                <p className='font-semibold text-xl text-center hover:text-sky-400'>Kashmir</p>
              </div>
              <div className='hover:text-sky-400 cursor-pointer'>
                <img src={jaipur} className='w-28' />
                <p className='font-semibold text-xl text-center hover:text-sky-400'>Jaipur</p>
              </div>
              <div className='hover:text-sky-400 cursor-pointer'>
                <img src={bangalore} className='w-28' />
                <p className='font-semibold text-xl text-center hover:text-sky-400'>Bangalore</p>
              </div>
            </div>

            <div className='famous flex gap-20'>
              <div className='hover:text-sky-400 cursor-pointer'>
                <img src={paris} className='w-28' />
                <p className='font-semibold text-xl text-center hover:text-sky-400'>Paris</p>
              </div>
              <div className='hover:text-sky-400 cursor-pointer'>
                <img src={leh} className='w-28' />
                <p className='font-semibold text-xl text-center hover:text-sky-400'>Leh</p>
              </div>
              <div className='hover:text-sky-400 cursor-pointer'>
                <img src={bali} className='w-28' />
                <p className='font-semibold text-xl text-center hover:text-sky-400'>Bali</p>
              </div>
              <div className='hover:text-sky-400 cursor-pointer'>
                <img src={dubai} className='w-28' />
                <p className='font-semibold text-xl text-center hover:text-sky-400'>Dubai</p>
              </div>
              <div className='hover:text-sky-400 cursor-pointer'>
                <img src={kerala} className='w-28' />
                <p className='font-semibold text-xl text-center hover:text-sky-400'>Kerala</p>
              </div>
            </div>
          </div>

        </div>

        <div className='headingperent w-9/12 gap-5 mx-auto flex flex-col my-16 justify-center items-center'>
          <p className='heading text-4xl text-center my-5 font-bold'><img src={indidaflag} className='w-12 mr-3 inline' />Enjoy Fresh Travel Blogs<img src={indidaflag} className='w-12 inline ml-3' /></p>

          <div className='blog flex gap-4'>

            <div className='relative'>
              <div className=''><img className='rounded-2xl' src={hinduNewYear} /></div>
              <div className='bg-black h-full w-full absolute top-0 rounded-2xl opacity-20'></div>
              <div className=' flex flex-col items-start justify-between absolute top-3 left-4 text-white h-3/4 font-semibold  '>
                <p className='px-3 w-36 text-xs rounded-full py-1 bg-blue-500'>Holiday Destinations</p>
                <p>Embracing Sacred Vibes With Hindu New Year 2024</p>
              </div>
              <div className='absolute backdrop-blur-md rounded-b-2xl bottom-0 flex justify-between items-center w-full text-white px-5 text-sm py-2  cursor-not-allowed'>
                <p>Read More</p>
                <FaArrowRightLong className='text-xl' />
              </div>
            </div>
            <div className='relative'>
              <div className=''><img className='rounded-2xl' src={seamless} /></div>
              <div className='bg-black h-full w-full absolute top-0 rounded-2xl opacity-20'></div>
              <div className=' flex flex-col items-start justify-between absolute top-3 left-4 text-white h-3/4 font-semibold  '>
                <p className='px-3 w-36 text-xs rounded-full py-1 bg-blue-500'>Holiday Destinations</p>
                <p>Navigate Any City Like A Local: Insider Tips For Seamless Cab Booking</p>
              </div>
              <div className='absolute backdrop-blur-md rounded-b-2xl bottom-0 flex justify-between items-center w-full text-white px-5 text-sm py-2 cursor-not-allowed'>
                <p>Read More</p>
                <FaArrowRightLong className='text-xl' />
              </div>
            </div>
            <div className='relative'>
              <div className=''><img className='rounded-2xl' src={holi} /></div>
              <div className='bg-black h-full w-full absolute top-0 rounded-2xl opacity-20'></div>
              <div className=' flex flex-col items-start justify-between absolute top-3 left-4 text-white h-3/4 font-semibold  '>
                <p className='px-3 w-36 text-xs rounded-full py-1 bg-blue-500'>Holiday Destinations</p>
                <p>Post-Holi Bliss: Top 7 Destinations for a Serene Long Weekend</p>
              </div>
              <div className='absolute backdrop-blur-md rounded-b-2xl bottom-0 flex justify-between items-center w-full text-white px-5 text-sm py-2 cursor-not-allowed'>
                <p>Read More</p>
                <FaArrowRightLong className='text-xl' />
              </div>
            </div>

            <div className='relative'>
              <div className=''><img className='rounded-2xl' src={marchVisit} /></div>
              <div className='bg-black h-full w-full absolute top-0 rounded-2xl opacity-20'></div>
              <div className=' flex flex-col items-start justify-between absolute top-3 left-4 text-white h-3/4 font-semibold  '>
                <p className='px-3 w-36 text-xs rounded-full py-1 bg-blue-500'>Holiday Destinations</p>
                <p>Discovering The Best Places To Visit In March With Family</p>
              </div>
              <div className='absolute backdrop-blur-md rounded-b-2xl bottom-0 flex justify-between items-center w-full text-white px-5 text-sm py-2 cursor-not-allowed'>
                <p>Read More</p>
                <FaArrowRightLong className='text-xl' />
              </div>
            </div>
          </div>
        </div>

        <div className='headingperent w-9/12 gap-5  my-16 mx-auto flex flex-col justify-center items-center'>
          <p className='heading text-4xl text-center my-5 font-bold'><img src={indidaflag} className='w-12 mr-3 inline' />Why book with us?<img src={indidaflag} className='w-12 inline ml-3' /></p>
          <div className='whyBook flex gap-3 w-full'>
            <div className='border px-4 text-center flex flex-col justify-center items-center rounded-2xl border-blue-300 w-1/4'>
              <img src={easybooking} className='w-20 my-4' />
              <h2 className='font-bold text-xl mb-4'>Easy Booking</h2>
              <p className='text-gray-500 text-sm'>We offer easy and convenient flight bookings with attractive offers.</p>
            </div>
            <div className='border px-4 text-center flex flex-col justify-center items-center rounded-2xl border-blue-300 w-1/4'>
              <img src={lowestbooking} className='w-20 my-4' />
              <h2 className='font-bold text-xl mb-4'>Lowest Price</h2>
              <p className='text-gray-500 text-sm'>We ensure low rates on hotel reservation, holiday packages and on flight tickets.</p>
            </div>
            <div className='border px-4 pb-3 text-center flex flex-col justify-center items-center rounded-2xl border-blue-300 w-1/4'>
              <img src={excdeal} className='w-20 my-4' />
              <h2 className='font-bold text-xl mb-4'>Exciting Deals</h2>
              <p className='text-gray-500 text-sm'>Enjoy exciting deals on flights, hotels, buses, car rental and tour packages.</p>
            </div>
            <div className='border px-4 pb-3 text-center flex flex-col justify-center items-center rounded-2xl border-blue-300 w-1/4'>
              <img src={support} className='w-20 my-4' />
              <h2 className='font-bold text-xl mb-4'>24/7 Support</h2>
              <p className='text-gray-500 text-sm'>Get assistance 24/7 on any kind of travel related query. We are happy to assist you.</p>
            </div>
          </div>
        </div>

        <div className='hide py-5 px-44 w-full  my-16 flex flex-col justify-center items-center bg-neutral-50'>
          <p className='font-bold text-2xl my-5'>Search Flights, Hotels, Bus and Holiday Packages</p>
          <div>
            <p className='text-gray-500 text-sm mb-3'>EaseMyTrip is one of the largest online travel platforms in India, and a trusted name in the Indian travel industry. We offer "end to end" travel solutions including air tickets, hotel booking, cab and bus booking, train tickets and holiday packages. Additionally, we offer ancillary value-added services.</p>

            <p className='text-gray-500 text-sm mb-3'>We understand that planning a trip can be overwhelming, so we have simplified the process to make it easy for you to find the perfect travel deals that suit your needs. Our website is user-friendly and provides a wide range of options to choose from. Whether you're planning a family vacation, a solo adventure, or a business trip, we have you covered with our comprehensive travel packages. From flights to hotels, car rentals to holiday packages, we offer everything you need to make your trip a success.</p>

            <p className='text-gray-500 text-sm mb-3'>We believe in transparency and honesty in all our dealings. We do not charge any hidden fees, and our prices are always competitive. With EaseMyTrip, you can be assured of getting the best travel deals in the market. If you're looking for a hassle-free and affordable way to plan your next trip, look no further than EaseMyTrip. We promise to make your travel experience a memorable one.</p>

          </div>
        </div>
      </div>

      <img
      onClick={()=>toast.info("Team is working on this feature!")}
        className={`eva fixed right-10 bottom-5 ${bounce ? 'animate-bounce' : ''}`}
        src={chatBot}
        alt="ChatBot"
      />
      <style jsx>{`
        @keyframes bounce {
          0% {
            transform: translateY(0);
          }
          18% {
            transform: translateY(-15px);
          }
          35% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          65% {
            transform: translateY(0px);
          }
          80% {
            transform: translateY(-3px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-bounce {
          animation: bounce 0.7s ease;
        }
      `}</style>

      <Airports showListFrom={showListFrom}
        setShowListFrom={setShowListFrom}
        setAirportFrom={setAirportFrom} setAirportTo={setAirportTo} showListTo={showListTo} setShowListTo={setShowListTo} />
      <div>

      </div>

      {passanger && <div className='passanger absolute w-72 bg-white top-44 p-2 right-80 rounded shadow'>
        <div className='max-h-72'>
          <div className='mt-2 border-t pt-2'>
            <div className='flex justify-between'>
              <div>
                <p className='text-sm'>Adult</p>
                <p className='text-xs text-gray-500'>(Above 12 Year)</p>
              </div>
              <div className='font-bold border flex mb-1 items-center'>
                <div onClick={() => handleAdultMinus()} className='px-2 border-r'><FaMinus /></div>
                <p className='px-2'>{adults}</p>
                <div onClick={() => handleAdultPlus()} className='px-2 border-l'><FaPlus /></div>
              </div>
            </div>
            <div className='flex mt-2 justify-between'>
              <div>
                <p className='text-sm'>Child</p>
                <p className='text-xs text-gray-500'>(Below 12 Year)</p>
              </div>
              <div className='font-bold border flex mb-1 items-center'>
                <div onClick={() => handleChildMinus()} className='px-2 border-r'><FaMinus /></div>
                <p className='px-2'>{children}</p>
                <div onClick={() => handleChildPlus()} className='px-2 border-l'><FaPlus /></div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex text-sm justify-end mt-4'>

          <button onClick={() => setPassanger(false)} className='rounded-full text-white py-1 hover:bg-orange-700 bg-orange-600 px-5'>Done</button>
        </div>
      </div>}
    </div>
  );
}

export default Home;
