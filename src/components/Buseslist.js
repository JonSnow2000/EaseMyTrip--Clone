import React, { useState, useEffect } from 'react';
import { MdGpsFixed } from "react-icons/md";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { IoRibbonOutline } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import luxury from "../Assets/luxury-buses-v1.png";
import budgeted from "../Assets/budgeted-bus-v1.png";
import rated from "../Assets/top-rated-buses-v1.png";
import safety from "../Assets/ultra-safety-v1.png";
import { useNavigate, useLocation } from 'react-router-dom';
import SeatSelectionPopup from './SeatSelectionPopup';  // Import the new component
import css from '../styles/Buseslist.css';
import ReactPaginate from 'react-paginate';
import paginationcss from '../styles/Pagination.css'


const itemsPerPage = 6; // Number of items per page

function Buseslist({ busList, setPaymentDetails }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedBus, setSelectedBus] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [sortOption, setSortOption] = useState('');

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const openSeatSelection = (bus) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login', { state: { from: location } });
            return;
        }
        setSelectedBus(bus);
        setShowPopup(true);
    };

    const closeSeatSelection = () => {
        setShowPopup(false);
        setSelectedBus(null);
    };

    const calculateArrivalTime = (departureTime, totalDuration) => {
        const [departureHours] = departureTime.split(':').map(Number);
        const [duration] = totalDuration.split(':').map(Number);
        const newTime = departureHours + duration;

        return newTime <= 24 ? newTime : newTime - 24;
    };

    const sortBuses = (buses) => {
        switch (sortOption) {
            case 'priceLowToHigh':
                return [...buses].sort((a, b) => a.fare - b.fare);
            case 'arrivalTimeEarlyToLate':
                return [...buses].sort((a, b) => {
                    const arrivalA = calculateArrivalTime(a.departureTime, a.arrivalTime);
                    const arrivalB = calculateArrivalTime(b.departureTime, b.arrivalTime);
                    return arrivalA - arrivalB;
                });
            case 'departureTimeEarlyToLate':
                return [...buses].sort((a, b) => {
                    const [hoursA] = a.departureTime.split(':').map(Number);
                    const [hoursB] = b.departureTime.split(':').map(Number);
                    return hoursA - hoursB;
                });
            case 'durationLowToHigh':
                return [...buses].sort((a, b) => {
                    const [durationA] = a.arrivalTime.split(':').map(Number);
                    const [durationB] = b.arrivalTime.split(':').map(Number);
                    return durationA - durationB;
                });
            default:
                return buses;
        }
    };

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(sortBuses(busList).slice(itemOffset, endOffset));
        setPageCount(Math.ceil(busList.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, busList, sortOption]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % busList.length;
        setItemOffset(newOffset);
    };

    return (
        <div className='bg-sky-50'>
            <div className='bg-blue-400 h-20 w-full'></div>
            <div className='bus-list-container flex w-9/12 gap-5 pt-5 mx-auto'>
                <div className='hide w-[22%] bg-white h-64 rounded-lg border shadow-lg'>
                    <div className="flex flex-col text-sm gap-3 m-2 mb-4">
                        <label className='font-bold'>Sort By:</label>
                        <button
                            onClick={() => setSortOption('priceLowToHigh')}
                            className="bg-blue-200 p-2 rounded transition-all duration-300 ease-in-out hover:bg-blue-300 active:bg-blue-400"
                        >
                            Price (Low to High)
                        </button>
                        <button
                            onClick={() => setSortOption('arrivalTimeEarlyToLate')}
                            className="bg-blue-200 p-2 rounded transition-all duration-300 ease-in-out hover:bg-blue-300 active:bg-blue-400"
                        >
                            Arrival Time (Early to Late)
                        </button>
                        <button
                            onClick={() => setSortOption('departureTimeEarlyToLate')}
                            className="bg-blue-200 p-2 rounded transition-all duration-300 ease-in-out hover:bg-blue-300 active:bg-blue-400"
                        >
                            Departure Time (Early to Late)
                        </button>
                        <button
                            onClick={() => setSortOption('durationLowToHigh')}
                            className="bg-blue-200 p-2 rounded transition-all duration-300 ease-in-out hover:bg-blue-300 active:bg-blue-400"
                        >
                            Duration (Low to High)
                        </button>
                    </div>
                </div>
                <div className='bus-list-main w-[78%]'>
                    <div className='hide flex gap-3 mb-5'>
                        <img src={budgeted} className='w-44 h-24 ' />
                        <img src={luxury} className='w-44 h-24 ' />
                        <img src={rated} className='w-44 h-24 ' />
                        <img src={safety} className='w-44 h-24 ' />
                    </div>
                    <div>
                        {busList && busList.length > 0 && <p className='font-bold text-nowrap text-xl mb-3'>{busList[0].source} <IoArrowForward className='inline' /> {busList[0].destination}</p>}
                    </div>
                    <div className='pl-8 pb-1'>
                        <span className='text-xs font-bold text-nowrap text-gray-400 mr-28'>BUS OPERATOR</span>
                        <span className='text-xs font-bold text-gray-400 mr-10'>DEPARTURE</span>
                        <span className='text-xs font-bold text-gray-400 mr-10'>DURATION</span>
                        <span className='text-xs font-bold text-gray-400 mr-28'>ARRIVAL</span>
                        <span className='text-xs hide font-bold text-gray-400 mr-24'>PRICE</span>
                        <span className='text-xs hide font-bold text-gray-400'>{busList.length} RESULTS</span>
                    </div>
                    <div className='bus-list p-4 bg-white shadow-lg rounded-lg'>
                        {busList && busList.length === 0 ? (
                            <div className='font-bold p-20 text-4xl'>Oop's! Service Unavailable on this route!</div>
                        ) : (
                            currentItems.map((bus, index) => {
                                const arrivalTime = calculateArrivalTime(bus.departureTime, bus.arrivalTime);
                                return (
                                    <div key={index} className="border rounded-md shadow-lg mb-5">
                                        <div className="flex justify-between items-center mb-2 p-3">
                                            <div>
                                                <h2 className="font-bold">{bus.name}</h2>
                                                <p className="text-xs mt-3 text-gray-600">{bus.type}</p>
                                                <div className="flex items-center mt-1">
                                                    <div className="flex items-center text-green-500">
                                                        <span className='border-green-500 flex items-end rounded border pr-1 text-[11px]'><FaStar alt="star" className="bg-green-500 text-white h-5 mr-1" />{bus.ratings}</span>
                                                    </div>
                                                    <span className="pr-1 ml-2 flex items-center text-[10px] bg-green-50 text-green-600 rounded border border-green-600"><IoRibbonOutline className='text-sm bg-green-500 text-white h-5 mr-1' />Recommended</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center pt-7">
                                                <div className="text-center mr-4">
                                                    <p className="font-bold text-lg">{bus.departureTime}</p>
                                                    <p className="text-xs text-gray-600">{bus.source}</p>
                                                </div>
                                                <div className="text-center mx-4">
                                                    <FaArrowRight alt="arrow" className="w-4 h-4 mx-auto" />
                                                    <p className="text-xs text-gray-600 ">{bus.arrivalTime}</p>
                                                </div>
                                                <div className="text-center ml-4">
                                                    <p className="font-bold text-lg">{arrivalTime}:00</p>
                                                    <p className="text-xs">{bus.destination}</p>
                                                </div>
                                            </div>
                                            <div className="text-right pt-3">
                                                <p className="line-through text-xs text-gray-500">₹ {bus.fare}</p>
                                                <p className="text-red-500 font-bold text-lg">₹ {bus.fare}</p>
                                                <p className="text-[10px] text-green-700">BOOKNOW Applied</p>
                                            </div>
                                            <div className="ml-4">
                                                <button className="bg-orange-500 text-nowrap text-white px-4 py-2 rounded-full" onClick={() => openSeatSelection(bus)}>Select Seats</button>
                                                <p className="text-xs text-center text-gray-600 mt-1">{bus.seats} Seat(s) left</p>
                                            </div>
                                        </div>
                                        <div className="flex p-3 justify-between items-center bg-gray-50 border-t pt-2 mt-5 text-xs text-gray-600 ">
                                            <div className="flex items-center space-x-2">
                                                {bus.amenities.map((amenity, index) => (
                                                    <img key={index} src={`https://placehold.co/16x16?text=${amenity}`} alt={amenity} className="w-4 h-4" />
                                                ))}
                                                <span>{bus.amenities.length}+</span>
                                            </div>
                                            <div className="flex space-x-4">
                                                <span>Amenities</span>
                                                <span>Boarding & Dropping Points</span>
                                                <span>Cancellation Policy</span>
                                            </div>
                                            <div className="flex items-center">
                                                <MdGpsFixed alt="live-tracking" className="w-4 h-4 mr-1" />
                                                <span>Live Tracking</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}</div>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel=" Previous"
                        renderOnZeroPageCount={null}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        previousClassName={'previous'}
                        nextClassName={'next'}
                        breakClassName={'break'}
                        disabledClassName={'disabled'}
                    />
                </div>
            </div>

            {showPopup && <SeatSelectionPopup bus={selectedBus} onClose={closeSeatSelection} setPaymentDetails={setPaymentDetails} />}
        </div>
    );
}

export default Buseslist;
