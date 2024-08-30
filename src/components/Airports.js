import React, { useEffect, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoIosAirplane } from 'react-icons/io';
import { css } from "../styles/Airport.css";

function Airports({showListFrom,setShowListFrom, setAirportFrom, setAirportTo, showListTo, setShowListTo }) {
    const [apList, setApList] = useState([]);

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/airport',{
                    headers: {
                        projectID: '3fqlxt7o7trf'
                    }
                })
                ;
                const data = await response.json();
                setApList(data.data.airports);
            } catch (error) {
                console.error('Error fetching airports:', error);
                // Handle error here, such as setting a state for error message
            }
        };

        fetchAirports();

    },[])

    const handleAirportFrom = (ap)=>{
        setAirportFrom(ap);
        setShowListFrom(false);
        setShowListTo(true);

    }
    const handleAirportTo = (ap)=>{
        setAirportTo(ap);
        setShowListTo(false);
    }
    
    return (
        <>
            {showListFrom && (
                <div className='airport-source w-3/12 h-[50vh] cursor-pointer absolute top-32 left-52 shadow-md overflow-y-scroll bg-white'>
                    <div className='relative'>
                        <div className='flex absolute top-1 w-[97%] m-2'>
                            <input placeholder='From' className='p-1 text-xs w-full' />
                            <IoMdCloseCircle
                                className='text-xl ml-2'
                                onClick={() => setShowListFrom(false)} 
                            />
                        </div>
                    </div>

                    <div className=' overflow-y-auto mt-10'> {/* Added mt-10 for spacing */}
                        <div className='p-2 bg-sky-100'><p className='text-xs font-semibold'>Top Cities</p></div>
                        <div>
                            {/* Sample airport entries */}
                            {apList.map((ap, index) => (
                                <div key={index} className='p-3 flex justify-between cursor-pointer items-end border-b-2'>
                                    <div className='flex gap-2 items-center'>
                                        <IoIosAirplane className='text-gray-500 text-xl' />
                                        <div onClick={()=>handleAirportFrom(ap)}>
                                            <p className='font-bold text-sm'>{ap.city} ({ap.iata_code})</p>
                                            <p className='text-xs text-gray-500'>{ap.name}</p>
                                        </div>
                                    </div>
                                    <p className='text-xs text-gray-500'>{ap.country}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {showListTo && (
                <div className='airport-destination w-3/12 h-[50vh] cursor-pointer absolute top-32 left-[30%] shadow-md overflow-y-scroll bg-white'>
                    <div className='relative'>
                        <div className='flex absolute top-1 w-[97%] m-2'>
                            <input placeholder='To' className='p-1 text-xs w-full' />
                            <IoMdCloseCircle
                                className='text-xl ml-2'
                                onClick={() => setShowListTo(false)} 
                            />
                        </div>
                    </div>

                    <div className=' overflow-y-auto mt-10'> {/* Added mt-10 for spacing */}
                        <div className='p-2 bg-sky-100'><p className='text-xs font-semibold'>Top Cities</p></div>
                        <div>
                            {/* Sample airport entries */}
                            {apList.map((ap, index) => (
                                <div key={index} className='p-3 flex justify-between items-end border-b-2'>
                                    <div className='flex gap-2 items-center'>
                                        <IoIosAirplane className='text-gray-500 text-xl' />
                                        <div onClick={()=>handleAirportTo(ap)}>
                                            <p className='font-bold text-sm'>{ap.city} ({ap.iata_code})</p>
                                            <p className='text-xs text-gray-500'>{ap.name}</p>
                                        </div>
                                    </div>
                                    <p className='text-xs text-gray-500'>{ap.country}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Airports;
