import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import css from '../styles/Traininfo.css'
import ReactPaginate from 'react-paginate';
import paginationcss from '../styles/Pagination.css'


const itemsPerPage = 6; // Number of items per page


function Trainlistinfo({ trainData, setTrain, setCoach }) {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const [sortOption, setSortOption] = useState('priceLowToHigh');
    const [filters, setFilters] = useState({
        timeOfDay: [],
        fareClasses: [],
        trainTypes: [],
    });

    const coachDescriptions = {
        'SL': 'Sleeper Class',
        'EA': 'Executive Class',
        '2S': 'Second Seater',
        '1A': 'First AC',
        '3E': 'Third Economy',
        '2A': 'Second AC',
        'CC': 'Chair Car'
    };

    const coachMultipliers = {
        '2S': 1,
        'SL': 1.1,
        '3E': 1.3,
        'CC': 1.5,
        '2A': 1.7,
        '1A': 1.9,
        'EA': 2.1
    };

    const handleTrainBooking = (baseFare, coachType, train, coach) => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            navigate('/login', { state: { from: location } });
            return;
        }
        setTrain(train);
        setCoach({ ...coach, finalFare: Math.round(baseFare * (coachMultipliers[coachType] || 1)) });
        navigate("/booktrain");
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: prev[type].includes(value) ? prev[type].filter(item => item !== value) : [...prev[type], value]
        }));
    };

    const applyFilters = (data) => {
        let filteredData = data;

        if (filters.timeOfDay.length > 0) {
            filteredData = filteredData.filter(train => {
                const hour = new Date(train.departureTime).getHours();
                return filters.timeOfDay.some(range => {
                    if (range === 'Early Morning' && hour >= 0 && hour < 6) return true;
                    if (range === 'Morning' && hour >= 6 && hour < 12) return true;
                    if (range === 'Afternoon' && hour >= 12 && hour < 18) return true;
                    if (range === 'Night' && hour >= 18 && hour < 24) return true;
                    return false;
                });
            });
        }

        if (filters.fareClasses.length > 0) {
            filteredData = filteredData.filter(train =>
                train.coaches.some(coach => filters.fareClasses.includes(coach.coachType))
            );
        }

        if (filters.trainTypes.length > 0) {
            filteredData = filteredData.filter(train => filters.trainTypes.includes(train.trainType));
        }

        return filteredData;
    };

    const sortTrainData = (data) => {
        switch (sortOption) {
            case 'priceLowToHigh':
                return data.sort((a, b) => a.fare - b.fare);
            case 'priceHighToLow':
                return data.sort((a, b) => b.fare - a.fare);
            case 'availabilityHighToLow':
                return data.sort((a, b) =>
                    b.coaches.reduce((acc, coach) => acc + coach.numberOfSeats, 0) -
                    a.coaches.reduce((acc, coach) => acc + coach.numberOfSeats, 0)
                );
            case 'departureTimeHighToLow':
                return data.sort((a, b) => new Date(b.departureTime) - new Date(a.departureTime));
            default:
                return data;
        }
    };

    const sortedAndFilteredData = sortTrainData(applyFilters(trainData));

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(sortedAndFilteredData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(trainData.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, trainData, sortOption]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % trainData.length;
        setItemOffset(newOffset);
    };

    return (
        <div>
            <div className='h-20 bg-blue-400'></div>
            <div className="traininfo-main bg-sky-50">
                <div className='flex w-[84%] pt-10 mx-auto justify-between'>
                    <div className='w-[20%] hide bg-white rounded-md shadow-md h-60 border pt-4'>
                        <div className="flex justify-between  mx-4 items-center">
                            <p className="font-bold">Sort by:</p>
                            <select value={sortOption} onChange={handleSortChange} className='p-1 text-sm w-2/3 rounded-full border-2 border-blue-400'>
                                <option value='priceLowToHigh'>Price (Low to High)</option>
                                <option value='priceHighToLow'>Price (High to Low)</option>
                                <option value='availabilityHighToLow'>Availability (High to Low)</option>
                                <option value='departureTimeHighToLow'>Departure Time (High to Low)</option>
                            </select>
                        </div>
                        <div className=" p-4 rounded-lg w-64 text-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold">Filter By</h2>
                                <button onClick={() => setFilters({ timeOfDay: [], fareClasses: [], trainTypes: [] })} className="text-blue-500 text-xs">Reset All</button>
                            </div>
                            {/* <div className="mb-4">
                            <div className="pl-4">
                                {['Early Morning', 'Morning', 'Afternoon', 'Night'].map(time => (
                                    <label key={time} className="flex items-center mb-2">
                                        <input type="checkbox" className="mr-2" onChange={() => handleFilterChange('timeOfDay', time)} checked={filters.timeOfDay.includes(time)} />
                                        {time}
                                    </label>
                                ))}
                            </div>
                        </div> */}
                            <div className="mb-4">
                                <div className="pl-4">
                                    {['SL', '3A', '2A', '1A'].map(fareClass => (
                                        <label key={fareClass} className="flex items-center mb-2">
                                            <input type="checkbox" className="mr-2" onChange={() => handleFilterChange('fareClasses', fareClass)} checked={filters.fareClasses.includes(fareClass)} />
                                            {coachDescriptions[fareClass]} ({fareClass})
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {/* <div className="mb-4">
                            <div className="pl-4">
                                {['OTHERS', 'Rajdhani', 'Duranto'].map(trainType => (
                                    <label key={trainType} className="flex items-center mb-2">
                                        <input type="checkbox" className="mr-2" onChange={() => handleFilterChange('trainTypes', trainType)} checked={filters.trainTypes.includes(trainType)} />
                                        {trainType}
                                    </label>
                                ))}
                            </div>
                        </div> */}
                        </div>
                    </div>
                    <div className=' w-[78%]'>
                        {currentItems.map((train, index) => (
                            <div key={index} className='train-list rounded-lg shadow-lg bg-white mb-5 border'>
                                <div className='bg-blue-100 flex py-1 px-4 justify-between'>
                                    <div className='text-sm'>NDLS -- PUNE</div>
                                    <div className='text-xs'>Runs on: {train.daysOfOperation.join(', ')}</div>
                                </div>
                                <div className='flex bg-white border-b pb-5 my-5'>
                                    <div className='w-1/5 px-3'>
                                        <div className='font-bold '>{train.trainName}</div>
                                        <div className='text-sm font-semibold border w-14 rounded bg-blue-50 p-1 '>{train.trainNumber}</div>
                                    </div>
                                    <div className='w-1/5'>
                                        <p className='font-bold text-xl'>{train.arrivalTime}</p>
                                        <p className='text-gray-500 font-semibold text-xs'>{train.source}</p>
                                    </div>
                                    <div className='w-2/5 flex flex-col justify-center items-center'>
                                        <p className='text-center text-xs text-gray-500'>{train.travelDuration}</p>
                                        <p className='text-xs relative my-3 justify-center text-gray-400 flex items-center'>
                                            <GoDotFill />-----------------------------------
                                            <GoDotFill />
                                            <PiAirplaneTakeoffLight className='text-center absolute border bg-white rounded-full h-7 border-gray-400 p-1 inline w-7' />
                                        </p>
                                        <div className='font-bold text-xs text-blue-600'>View Route</div>
                                    </div>
                                    <div className='w-1/5'>
                                        <p className='font-bold text-xl'>{train.departureTime}</p>
                                        <p className='text-gray-500 font-semibold text-xs'>{train.destination}</p>
                                    </div>
                                </div>
                                <div className='flex m-2 bg-white justify-between'>
                                    <p>Seat Availability</p>
                                    <div className='flex gap-2'>
                                        <p>Quota</p>
                                        <select className='p-1 text-sm w-20 rounded-full border'>
                                            {['General', 'Senior Citizen', 'Ladies Quota', 'DP', 'Tatkal'].map(quota => (
                                                <option key={quota} className='text-xs'>{quota}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='coach flex p-2'>
                                    {train.coaches.map((coach, index) => (
                                        <div key={index} className='bg-orange-50 flex justify-center items-center flex-col p-2 m-1 w-40 rounded'>
                                            <p className='text-xs text-nowrap text-gray-500'>{coachDescriptions[coach.coachType]} ({coach.coachType})</p>
                                            <p className='text-sm font-bold'>₹{Math.round(train.fare * (coachMultipliers[coach.coachType] || 1))}</p>
                                            <p className='text-sm text-green-500'>AVL {coach.numberOfSeats}</p>
                                             <button onClick={() => handleTrainBooking(train.fare, coach.coachType, train, coach)} className='text-xs text-white text-nowrap bg-orange-600 rounded-full py-[2px] px-2'>Book Now</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
    );
}

export default Trainlistinfo;
