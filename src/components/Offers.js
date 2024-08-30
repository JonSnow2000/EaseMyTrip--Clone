import React, { useEffect, useState } from 'react';
import offerbanner from '../Assets/special-top-banner.webp';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { BiSolidOffer } from "react-icons/bi";
import { BsBank } from "react-icons/bs";
import { IoAirplane } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaUmbrellaBeach } from "react-icons/fa";
import { FaHotjar } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { FaBus } from "react-icons/fa";
import { FaTrainSubway } from "react-icons/fa6";
import { toast } from 'react-toastify';

function Offers() {
    const [offers, setOffers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    useEffect(() => {
        async function fetchOffers() {
            try {
                const response = await axios.get(
                    `https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"${selectedCategory}"}`,
                    {
                        headers: {
                            projectID: '3fqlxt7o7trf',
                        }
                    }
                );
                // console.log(response.data.data.offers);
                setOffers(response.data.data.offers);
            } catch (error) {
                console.error('Error fetching offers:', error);
            }
        }

        fetchOffers();
    }, [selectedCategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
    const calculateValidity = (startDate) => {
        const endDate = moment(startDate).add(3, 'days').format('MMMM Do YYYY'); // Add 3 days to start date
        return `Valid until ${endDate}`;
    };

    const offerHandler = ()=>{
        toast.info('NO offer avilable this time!');
    }

    return (
        <div>
            <div className=''>
                <img className='w-11/12 mx-auto mt-5 rounded-2xl' src={offerbanner} alt="Special Offer Banner" />
            </div>
            <div className='mt-5 w-9/12 mx-auto relative'>
                <h1 className='font-bold text-2xl mt-12 mb-3'>Amazing Travel Offers and Deals</h1>
                <div className='flex absolute font-bold w-full shadow-lg border -top-20 rounded-lg p-2 bg-white justify-around'>
                    <div style={{display:"flex"}} className={selectedCategory === 'ALL' ? 'bg-blue-500 text-sm text-white rounded-md p-2 justify-center items-center cursor-pointer' : 'justify-center hover:bg-gray-200 p-2 text-gray-800 text-sm items-center rounded-md px-2 cursor-pointer'} onClick={() => handleCategoryClick('ALL')}><BiSolidOffer className='text-xl' />Spacial Offers</div>

                    <div onClick={offerHandler} className='flex justify-center items-center hover:bg-gray-200 text-sm px-2 p-1 rounded-md cursor-pointer'>
                        <BsBank className='mr-1 text-lg ' />Bank offers
                    </div>
                    <div style={{display:"flex"}} className={selectedCategory === 'FLIGHTS' ? 'bg-blue-500 text-white rounded-md px-2 justify-center items-center cursor-pointer' : 'justify-center   text-gray-800 items-center cursor-pointer rounded-md px-2 hover:bg-gray-200'} onClick={() => handleCategoryClick('FLIGHTS')}><IoAirplane className='mr-1 text-lg'/>Flights</div>
                    
                    <div style={{display:"flex"}} className={selectedCategory === 'HOTELS' ? 'bg-blue-500 text-white text-sm rounded-md px-2 justify-center items-center cursor-pointer' : 'justify-center  text-gray-800 items-center text-sm cursor-pointer rounded-md px-2 hover:bg-gray-200'} onClick={() => handleCategoryClick('HOTELS')}><FaHotel className='text-lg mr-1'/> Hotels</div>

                    <div style={{display:"flex"}} className={selectedCategory === 'BUSES' ? 'bg-blue-500 text-white text-sm rounded-md px-2 justify-center items-center cursor-pointer' : 'justify-center text-sm text-gray-800 items-center cursor-pointer rounded-md px-2 hover:bg-gray-200'} onClick={() => handleCategoryClick('BUSES')}><FaBus className='mr-1 text-lg '/>Buses</div>

                    <div style={{display:"flex"}} className={selectedCategory === 'RAILS' ? 'bg-blue-500 text-white rounded-md text-sm px-2 justify-center items-center cursor-pointer' : 'justify-center text-sm text-gray-800 items-center cursor-pointer rounded-md px-2 hover:bg-gray-200'} onClick={() => handleCategoryClick('RAILS')}><FaTrainSubway className='mr-1 text-lg'/>Trains</div>

                    <div onClick={offerHandler} className='flex justify-center items-center hover:bg-gray-200 text-sm px-2 p-1 rounded-md cursor-pointer'>
                        <FaCar className='mr-1 text-xl ' />Cab offers
                    </div>

                    <div onClick={offerHandler} className='flex justify-center items-center hover:bg-gray-200 text-sm px-2 p-1 rounded-md cursor-pointer'>
                        <FaUmbrellaBeach className='mr-1 text-xl ' />Holidays offers
                    </div>

                    <div onClick={offerHandler} className='flex justify-center items-center hover:bg-gray-200 text-sm px-2 p-1 rounded-md cursor-pointer'>
                        <FaHotjar className='mr-1 text-lg ' />Hot Deals
                    </div>                    

                </div>
                <div className='my-5 flex flex-wrap justify-between'>
                    {offers.map((offer, index) => (
                        <div key={index} style={{ boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)' }} className='border hover:scale-[1.01] mb-4 cursor-pointer hover:bg-sky-50 rounded-lg p-2 mr-3 my-2 w-64'>
                            <img src={offer.heroUrl} alt={offer.title} className='w object-cover h-40 w-full mr-3 rounded-lg' />
                            <div className=''>
                                <p className='font-bold mt-2 mb-1 text-[15px]'>{offer.lobDisplayText}</p>
                                <p className='text-gray-700 text-sm'>{_.capitalize(offer.pTl)}</p>
                                <div className='mt-2 flex justify-between'>
                                    <div>
                                        <p className='font-bold text-xs'>BOOKING PERIOD</p>
                                        <p className='text-xs'>{calculateValidity(offer.startDate)}</p>
                                    </div>
                                    <div className='border-dashed bg-white relative flex justify-center items-center border-2 border-gray-200 rounded w-20 h-8'>
                                        <p className='font-bold text-xs'>Book now</p>
                                        <p className='absolute flex items-center justify-between -top-2 text-[9px] bg-blue-500 px-1 rounded-full font-bold text-white'>T&Cs Apply</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {offers.length === 0 && <p className='text-4xl font-bold shadow-lg mb-20 p-20 border rounded-lg text-center w-full'>Oop's! No offers available for this category.</p>}
                </div>
            </div>
        </div>
    );
}

export default Offers;
