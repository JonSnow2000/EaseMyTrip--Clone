import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { BiCheckDouble } from "react-icons/bi";
import { BiSolidOffer } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import LazyLoad from 'react-lazyload';
import { FaRegCheckCircle } from "react-icons/fa";
import { GrFormPreviousLink } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import css from '../styles/Hoteldetails.css'
import ReactPaginate from 'react-paginate';
import paginationcss from '../styles/Pagination.css'


const itemsPerPage = 6; // Number of items per page

function Hoteldetails({ hotelList, setHotelBookingData }) {
    // console.log(hotelList);
    const [hotelData, setHotelData] = useState({});
    const token = sessionStorage.getItem('token');
    const [htlList, setHtlList] = useState(true);
    const [hotelInfo, setHoteInfo] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('');
    const [filteredHotels, setFilteredHotels] = useState(hotelList);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const navigate = useNavigate()
    const location = useLocation()

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        let sortedHotels = [...hotelList];

        if (sortCriteria === 'Low To High') {
            sortedHotels.sort((a, b) => a.avgCostPerNight - b.avgCostPerNight);
        } else if (sortCriteria === 'High To Low') {
            sortedHotels.sort((a, b) => b.avgCostPerNight - a.avgCostPerNight);
        } else if (sortCriteria === 'Top Rating Hotel') {
            sortedHotels.sort((a, b) => b.rating - a.rating);
        }

        setFilteredHotels(sortedHotels);
    }, [sortCriteria, hotelList]);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = [...hotelList];

            if (selectedFilters.length > 0) {
                filtered = filtered.filter(hotel =>
                    selectedFilters.some(range => {
                        const [min, max] = JSON.parse(range);
                        return hotel.avgCostPerNight >= min && hotel.avgCostPerNight <= max;
                    })
                );
            }

            setFilteredHotels(filtered);
        };

        applyFilters();
    }, [selectedFilters, hotelList]);

    const handleFilterChange = (range) => {
        const rangeStr = JSON.stringify(range);
        setSelectedFilters(prevFilters => {
            if (prevFilters.includes(rangeStr)) {
                return prevFilters.filter(f => f !== rangeStr);
            } else {
                return [...prevFilters, rangeStr];
            }
        });
    };

    const backButton = () => {
        setHoteInfo(false);
        setHtlList(true);
    }

    const fetchHotelInfo = async (hotelId) => {
        try {
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotelId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    projectID: "3fqlxt7o7trf"
                }
            });
            console.log(response.data.data);
            setHtlList(false)
            setHoteInfo(true)
            setHotelData(response.data.data);
        } catch (error) {
            console.error('Error fetching hotel data:', error);
        }
    };

    const handleBookHotel = (hotelData, room) => {
        // console.log(room);
        if (token) {
            setHotelBookingData(hotelData);
            setHotelBookingData(prevDetails => ({
                ...prevDetails,
                roomDetails: room
            }));
            navigate('/bookhotel');
        } else {
            toast.info("Please login first!")
            console.log(location);
            navigate('/login', { state: { from: location } });
            return
        }

    };
    // console.log(hotelData);
    const priceRanges = [
        [0, 1500], [1500, 2500], [2500, 5500],
        [5500, 8500], [8500, 15500], [15500, 30000],
        [30000, Infinity]
    ];

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filteredHotels.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(hotelList.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, hotelList, sortCriteria, selectedFilters]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % hotelList.length;
        setItemOffset(newOffset);
    };

    return (
        <div className='bg-sky-100'>
            <div className='w-full h-20 border mx-auto bg-blue-400'>

            </div>
            {htlList && (
                <div className=''>
                    <div className='hotel-list w-11/12 mx-auto p-5 flex gap-3'>
                        <div className='hide w-3/12 h-96 border bg-white rounded-lg shadow-md'>
                            <div className='font-bold  relative mx-4 mt-4 mb-2 p-2'>Sort by:
                                <select className='border-2 border-sky-400 absolute p-1 right-1 rounded-md' onChange={(e) => setSortCriteria(e.target.value)}>
                                    <option value="Low To High">Low To High</option>
                                    <option value="High To Low">High To Low</option>
                                    <option value="Top Rating Hotel">Top Rating Hotel</option>
                                </select>
                            </div>
                            <div className="bg-white border  p-4 rounded-lg max-w-sm mx-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Select Filters</h2>
                                    <a href="#" onClick={() => setSelectedFilters([])} className="text-blue-500 text-sm">Clear All</a>
                                </div>
                                <div>
                                    <h3 className="text-md font-semibold text-gray-800  mb-2">PRICE (PER NIGHT)</h3>
                                    <div className="space-y-2">
                                        {priceRanges.map((range, index) => (
                                            <label key={index} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-4 w-4 text-blue-600"
                                                    checked={selectedFilters.includes(JSON.stringify(range))}
                                                    onChange={() => handleFilterChange(range)}
                                                />
                                                <span className="ml-2 text-gray-700">
                                                    {range[1] === Infinity
                                                        ? `Above ₹${range[0]}`
                                                        : `₹${range[0]} - ₹${range[1]}`}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' w-9/12'>
                            {filteredHotels.length === 0 ? (
                                <div className='font-bold text-4xl text-center py-20 bg-white'>No Hotel found in this price range</div>
                            ) : (
                                currentItems.map((hotel, index) => (
                                    <div key={index} className='h-list flex border mb-4 bg-white p-2 rounded-lg shadow-md'>
                                        <div className='w-1/3'>
                                            <div className='relative' height={200} offset={100}>
                                                <img alt={`Hotel ${index}`} className='h-36 w-80 mb-1 rounded-xl object-cover' src={hotel.images[0]} />
                                                <div className='top-1 right-3 absolute font-semibold text-[10px] bg-blue-700 rounded-full py-1 px-3 text-white'>
                                                    DEAL OF THE DAY
                                                </div>
                                            </div>
                                            <div className='flex gap-[1px]'>
                                                {hotel.images.slice(1, 4).map((img, idx) => (
                                                    <img key={idx} alt={`Image ${idx}`} className='w-28 h-14 rounded-lg mr-1' src={img} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className='htldetails flex border-r w-5/12 justify-between flex-col'>
                                            <div>
                                                <p className='font-bold pl-2 border-l-4 border-blue-700 rounded'>{hotel.name}</p>
                                                <p className='text-sm my-1 flex items-center text-gray-500'><IoLocationOutline className='inline text-lg' />{hotel.location}</p>
                                                <p className='text-xs ml-1 text-gray-400 font-bold'>
                                                    {hotel.amenities.map((facility, idx) => (
                                                        <span key={idx}>{facility} <BiCheckDouble className='inline text-green-600' /> </span>
                                                    ))}
                                                </p>
                                                <p className='flex ml-1 mt-3 items-center text-sm text-green-600'>Ratings: {hotel.rating} <FaStar className='inline mb-1 ml-1' /></p>
                                                <div className='text-yellow-600 text-xs flex gap-1 items-center mt-2 ml-1'><FaRegEye /> {Math.round(hotel.rating) * 5} People viewing</div>
                                            </div>
                                            <div className='px-2 w-52 mb-1 ml-2 py-1 flex items-center rounded-full bg-fuchsia-200 text-xs font-bold'><BiSolidOffer className='text-lg mr-1' /> EMTSTAY Discount Applied</div>
                                        </div>
                                        <div className='view flex w-1/4 pr-3 items-end flex-col'>
                                            <div className='flex items-end gap-2'>
                                                <p className='font-bold text-xs'>
                                                    {hotel.rating > 4
                                                        ? 'Excellent'
                                                        : hotel.rating >= 3.5
                                                            ? 'Very Good'
                                                            : hotel.rating >= 2.5
                                                                ? 'Good'
                                                                : 'Poor'
                                                    }
                                                </p>
                                                <div className='px-1 text-sm font-bold text-white bg-blue-950 rounded'>{hotel.rating}</div>
                                            </div>
                                            <p className='text-orange-600 mt-2 line-through text-sm font-bold'>₹ {Math.round(hotel.avgCostPerNight * 1.2)}</p>
                                            <div className='font-bold text-2xl my-2'>₹ {Math.round(hotel.avgCostPerNight)}</div>
                                            <p className='text-xs font-semibold text-gray-400'>+ {hotel.rating * 100} Taxes & fees</p>
                                            <p className='text-xs font-semibold text-gray-400'>Per Night</p>
                                            <button onClick={() => fetchHotelInfo(hotel._id)} className='bg-orange-500 text-white font-bold px-16 py-2 text-sm mt-3 text-nowrap cursor-pointer mb-2 hover:scale-[1.05] rounded-full'>View Room</button>
                                            <p className='text-sky-500 w-48 font-bold text-sm text-center'>Hurry Up! & Save More</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            )}

            {hotelInfo && (<div className='viewMore w-full relative'>
                <button onClick={backButton} className='border text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white  rounded-full px-2 py-1 text-sm m-2 absolute right-28 font-semibold -top-14 flex items-center gap-1'><GrFormPreviousLink className='text-lg' /> Back to Hotel List</button>
                <div className='img-div w-10/12 mt-16 mx-auto border bg-white p-2 shadow-md rounded-md h-96'>
                    <h1 className='text-xl font-bold'>{hotelData.name}</h1>
                    <div>
                        <p className='text-gray-400 font-bold text-sm'>{hotelData.location}</p>
                    </div>
                    <div className='flex'>
                        {hotelData && hotelData?.images && hotelData?.images?.length > 0 && (<div className='htlimg flex gap-2 w-2/3'>
                            <img src={hotelData.images[0]} className='object-cover h-[305px] w-3/4' alt='Hotel' />

                            <div className='flex flex-col justify-between'>
                                <img src={hotelData.images[1]} className='object-cover h-24 w-40' alt='Hotel' />
                                <img src={hotelData.images[2]} className='object-cover h-24 w-40' alt='Hotel' />
                                <img src={hotelData.images[3]} className='object-cover h-24 w-40' alt='Hotel' />
                            </div>
                        </div>)}

                        <div className='htlinfo flex flex-col justify-between w-1/3'>
                            <div className='flex justify-between'>
                                <div>
                                    <div className='border-l-4 pl-2 border-yellow-200 rounded text-blue-400 text-nowrap font-semibold'>Executive Room</div>
                                    <p className='text-sm text-nowrap text-gray-500 font-bold'>2 x Guest | 1 x Room</p>
                                </div>
                                <div className='text-end'>
                                    <p className='text-red-500 font-semibold line-through'>₹{Math.round((hotelData.avgCostPerNight * 1.2))}</p>
                                    <p className='text-2xl font-bold my-1'>₹ {Math.round(hotelData.avgCostPerNight)}</p>
                                    <p className='text-[13px] font-semibold text-gray-500'>₹ {Math.round(hotelData.avgCostPerNight * 0.2)} Taxes & fees</p>
                                    <p className='text-gray-500 text-[13px]'>base price(Per Night)</p>
                                </div>
                            </div>
                            <div className='mt-3'>
                                {hotelData && hotelData?.amenities && hotelData.amenities.length > 0 && (<p className='text-xs ml-1 w-44 flex flex-wrap gap-1  text-gray-400 font-bold'>{hotelData.amenities.map((facility, index) => {
                                    return <span key={index} className='p-1 bg-sky-50 hover:bg-sky-100'>{facility} <FaRegCheckCircle className='inline text-white bg-green-500 rounded-full ' /> </span>
                                })}</p>)}
                                <p onClick={() => toast.info('For more information check below!')} className='text-sm text-blue-500 cursor-pointer w-[125px] hover:bg-blue-200 p-1 mt-2'>+ More Amenities</p>
                            </div>
                            <div className='flex justify-between'>
                                <button onClick={() => toast.info('For more information check below!')} className='border px-8 hover:bg-blue-400 hover:text-white border-blue-400 py-2 text-blue-400 rounded-full font-bold text-nowrap text-md '>SELECT ROOMS</button>
                                <button onClick={() => toast.info("Select room from below!")} className='border px-10 hover:bg-orange-600 border-orange-500  py-2 text-white bg-orange-500 rounded-full font-bold  text-nowrap text-md '>BOOK NOW</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='amanities bg-white px-2 pt-3 my-5 w-10/12 mx-auto pb-1 rounded-md shadow-md'>
                    <button className='px-8 mr-3 py-3 border-b-4 border-blue-500 hover:text-blue-500 font-bold text-sm'>Rooms</button>
                    <button className='px-8 cursor-not-allowed mr-3 py-3 hover:border-b-4 border-blue-500 hover:text-blue-500 font-bold text-sm'>Overview</button>
                    <button className='px-8 cursor-not-allowed  mr-3 py-3 hover:border-b-4 border-blue-500 hover:text-blue-500 font-bold text-sm'>Amanities</button>
                    <button className='px-8 cursor-not-allowed  mr-3 py-3 hover:border-b-4 border-blue-500 hover:text-blue-500 font-bold text-sm'>Location</button>
                    <button className='px-8 mr-3 cursor-not-allowed hide py-3 hover:border-b-4 border-blue-500 hover:text-blue-500 font-bold text-sm'>Booking Policy</button>
                    <button className='px-8 mr-3 cursor-not-allowed py-3 hover:border-b-4 border-blue-500 hover:text-blue-500 font-bold text-sm'>Guest Raiting</button>
                </div>
                <div className='htlData w-10/12 mx-auto border border-orange-200 bg-white rounded'>
                    <div className='bg-orange-100  p-3 rounded-t flex '>
                        <div className='text-sm font-semibold w-1/4'>Room Type</div>
                        <div className='text-sm font-semibold w-1/2'>Benefits</div>
                        <div className='text-sm font-semibold w-1/4'>Per Night Price</div>
                    </div>
                    {hotelData && hotelData?.rooms && hotelData?.rooms?.length > 0 && hotelData?.rooms.map((room, index) => {
                        return <div key={index} className=' border-orange-200 border-b justify-between flex items-start'>
                            <div className='roomtype w-1/5 p-3 border-orange-200 border-r'>
                                <div className='w-1/4'>
                                    <p className='font-bold'>{room.roomType}</p>
                                </div>
                                <div>
                                    <img className='object-cover w-56 h-40 rounded' src='http://media.easemytrip.com/media/Hotel/SHL-1902876561368/Common/CommonTnleMt.jpg' />
                                </div>
                                <div className='mt-2 flex gap-2'>
                                    <p className='p-1 rounded bg-sky-100 text-xs'>{room.bedDetail}</p>
                                    <p className='p-1 rounded bg-sky-100 text-xs'>{room.roomSize} sq.ft Sq Ft.</p>
                                </div>
                            </div>
                            <div className='w-1/4 p-3 border-orange-200 border-r'>
                                <div className='border-l-4 pl-2 mb-2 text-sm border-yellow-200 rounded text-blue-400 font-semibold'>Room With Breakfast</div>
                                <ul>
                                    <li className='text-sm '><FaRegCheckCircle className='inline text-white mr-1 bg-green-500 rounded-full ' />Breakfast</li>
                                    <li className='text-sm '><FaRegCheckCircle className='inline text-white mr-1 bg-green-500 rounded-full ' />Parking</li>
                                    <li className='text-sm '><FaRegCheckCircle className='inline text-white mr-1 bg-green-500 rounded-full ' />Express check-in</li>
                                    <li className='text-sm '><FaRegCheckCircle className='inline text-white mr-1 bg-green-500 rounded-full ' />Free WiFi</li>
                                    <li className='text-sm '><FaRegCheckCircle className='inline text-white mr-1 bg-green-500 rounded-full ' />Free fitness center access</li>
                                    <li className='text-sm '><FaRegCheckCircle className='inline text-white mr-1 bg-green-500 rounded-full ' />Booking is Non Refundable</li>
                                </ul>
                            </div>
                            <div className='w-1/4 p-3 order-orange-200 border-r'>
                                <div className='flex relative flex-col items-end'>
                                    <p className='py-1 px-2 bg-green-200 w-48 text-xs'>Book Now and Get Rs. {Math.round(room.costPerNight * 1.2 - (room.costPerNight))} Off</p>
                                    <div className='w-2 h-2 absolute top-5 right-4 bg-green-200 rotate-45'></div>
                                    <p className='text-red-500 mt-2 font-semibold line-through'>₹{Math.round((room.costPerNight * 1.2))}</p>
                                    <p className='text-2xl font-bold my-1'>₹ {Math.round(room.costPerNight)}</p>
                                    <p className='text-[13px] font-semibold text-gray-500'>₹ {Math.round(room.costDetails.taxesAndFees)} Taxes & fees</p>
                                    <p className='text-gray-400 font-bold text-[12px]'>(Per Night)</p>
                                    <p className='text-gray-500 text-[12px]'>Booking is Non Refundable</p>
                                </div>
                            </div>
                            <div className='booknow w-1/4 py-3 pr-8 flex flex-col items-end'>
                                <button onClick={() => handleBookHotel(hotelData, room)} className='border px-4 hover:bg-orange-600 border-orange-500  py-1 text-white bg-orange-500 rounded-full font-bold text-md '>BOOK NOW</button>
                                <p className='py-1 hide px-2 mt-2 mr-3 bg-green-100 font-bold text-gray-500 w-52 text-[10px]'><TiTick className='inline text-sm' />EMTSTAY Coupon code is applied</p>
                            </div>
                        </div>
                    })

                    }
                </div>
            </div>)}
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
    );
}

export default Hoteldetails;
