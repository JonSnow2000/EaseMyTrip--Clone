import React, { useEffect, useState } from 'react'
import cheapest from '../Assets/chepest-icon.svg';
import mealicon from '../Assets/meal-icon-new.svg';
import vistara from '../Assets/vistara.png';
import E6 from '../Assets/6E.png';
import AI from '../Assets/AI.png';
import SG from '../Assets/SG.png';
import I5 from '../Assets/I5.png';
import { IoSend } from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import css from '../styles/Flight.css'
import paginationcss from '../styles/Pagination.css'
import ReactPaginate from 'react-paginate';
const itemsPerPage = 8; // Number of items per page


function Flights({ setFlightDetails, source, destination, flightData }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [activeTab, setActiveTab] = useState('Finfo');
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
  const [filters, setFilters] = useState({
    nonstop: false,
    onestop: false,
    twostop: false,
    morningDeparture: false,
    indigo: false,
    priceRange: [0, 10000],
  });
  const [sortOption, setSortOption] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem('token')
  // console.log(token);

  const handleFlightDetailsClick = (index) => {
    setSelectedFlightIndex(index);
  };

  const handleFlightBooking = (flight) => {
    if (token) {
      setFlightDetails(flight);
      navigate('/bookFlight');
    } else {
      toast.info("Please Login First!")
      navigate('/login', { state: { from: location } });
    }

  };

  let name = '';
  const getAirlineLogo = (flightID) => {
    const prefix = flightID.substring(0, 2);
    switch (prefix) {
      case '6E':
        name = 'Indigo';
        return E6;
      case 'AI':
        name = 'Air India';
        return AI;
      case 'SG':
        name = 'Spice Jet';
        return SG;
      case 'UK':
        name = 'Vistara';
        return vistara;
      case 'G8':
        name = 'Air India Express';
        return I5;
      default:
        return null;
    }
  };

  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const handlePriceRangeChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: [parseInt(event.target.value, 10), prevFilters.priceRange[1]],
    }));
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const applyFiltersAndSort = (flights) => {
    // console.log(filters);
    // console.log(flights);

    let filteredFlights = flights;

    if (filters.nonstop) {
      filteredFlights = filteredFlights.filter((flight) => flight.stops === 0);
      // console.log(filteredFlights)
    }
    if (filters.onestop) {
      filteredFlights = filteredFlights.filter((flight) => flight.stops === 1);
      // console.log(filteredFlights)
    }
    if (filters.twostop) {
      filteredFlights = filteredFlights.filter((flight) => flight.stops === 2);
      // console.log(filteredFlights)
    }
    if (filters.morningDeparture) {
      filteredFlights = filteredFlights.filter((flight) =>
        parseInt(flight.departureTime.split(':')[0], 10) < 12
      );
      console.log(filteredFlights)
    }
    filteredFlights = filteredFlights.filter(
      (flight) => flight.ticketPrice >= filters.priceRange[0] && flight.ticketPrice <= filters.priceRange[1]
    );

    if (sortOption === 'priceLowToHigh') {
      filteredFlights.sort((a, b) => a.ticketPrice - b.ticketPrice);
    } else if (sortOption === 'priceHighToLow') {
      filteredFlights.sort((a, b) => b.ticketPrice - a.ticketPrice);
    }

    // console.log(filteredFlights);
    return filteredFlights;
  };

  const sortedFilteredFlights = applyFiltersAndSort(flightData);
  // console.log(flightData);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(applyFiltersAndSort(flightData).slice(itemOffset, endOffset));
    setPageCount(Math.ceil(flightData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, flightData, sortOption]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % flightData.length;
    setItemOffset(newOffset);
  };


  return (
    <div className='w-full bg-sky-100'>
      <div className='main-container flex pt-5 ml-44 '>
        <div className='hide sort-section mr-5  w-2/12 h-96'>
          <div className='bg-white p-4 rounded-lg shadow-md text-xs'>
            <h2 className='text-sm font-bold mb-4'>FILTER</h2>
            <div className='mb-4'>
              <h3 className='text-sm font-bold mb-2'>Popular Filters</h3>
              <div className='flex items-center mb-2'>
                <input
                  type='checkbox'
                  id='nonstop'
                  className='form-checkbox h-4 w-4 text-blue-600'
                  checked={filters.nonstop}
                  onChange={() => handleFilterChange('nonstop')}
                />
                <label htmlFor='nonstop' className='ml-2'>
                  Nonstop
                </label>
              </div>

              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='onestop'
                  className='form-checkbox h-4 w-4 text-blue-600'
                  checked={filters.onestop}
                  onChange={() => handleFilterChange('onestop')}
                />
                <label htmlFor='onestop' className='ml-2'>
                  Onestop
                </label>
              </div>
              <div className='flex mt-2 items-center'>
                <input
                  type='checkbox'
                  id='twostop'
                  className='form-checkbox h-4 w-4 text-blue-600'
                  checked={filters.twostop}
                  onChange={() => handleFilterChange('twostop')}
                />
                <label htmlFor='twostop' className='ml-2'>
                  Twostop
                </label>
              </div>
              <div className='flex mt-2 items-center'>
                <input
                  type='checkbox'
                  id='morning-departure'
                  className='form-checkbox h-4 w-4 text-blue-600'
                  checked={filters.morningDeparture}
                  onChange={() => handleFilterChange('morningDeparture')}
                />
                <label htmlFor='morning-departure' className='ml-2'>
                  Morning Departure
                </label>
              </div>
            </div>
            <div className='mb-4'>
              <h3 className='text-sm font-bold mb-2'>Price Range</h3>
              <div className='flex items-center mb-2'>
                <input
                  type='range'
                  className='w-full'
                  min='0'
                  max='10000'
                  value={filters.priceRange[0]}
                  onChange={handlePriceRangeChange}
                />
              </div>
              <div className='text-sm'>
                Rs. {filters.priceRange[0]} - Rs. {filters.priceRange[1]}
              </div>
            </div>
            <div>
              <h3 className='text-sm font-bold mb-2'>Sort By</h3>
              <select
                className='w-full p-2 border rounded-md'
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value=''>Select</option>
                <option value='priceLowToHigh'>Price: Low to High</option>
                <option value='priceHighToLow'>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <div className='flight-list-container w-9/12'>

          <div className='flex gap-1 items-baseline p-1'>
            <img src={cheapest} />
            <p className='bg-emerald-500 rounded-full text-white font-semibold py-[2px] px-3 text-sm flex items-center'>Cheapest</p>
            <p className=' font-semibold text-xl '>Flights starting from </p>
          </div>
          <div className='pl-6 mt-5'>
            <span className='hide text-xs font-bold text-gray-400 mr-24'>AIRLINES</span>
            <span className='text-xs font-bold text-gray-400 mr-24'>DEPARTURE</span>
            <span className='text-xs font-bold text-gray-400 mr-24'>DURATION</span>
            <span className='hide text-xs font-bold text-gray-400 mr-24'>ARRIVAL</span>
            <span className='text-xs font-bold text-gray-400'>PRICE</span>

          </div>
          <div className='flight-list flex-1'>
            {sortedFilteredFlights && sortedFilteredFlights.length == 0 ? (<div className='text-4xl font-bold py-28 mt-2 text-center bg-white border rounded-lg shadow-md '>Oop's! No flight found in this price range!</div>) : (currentItems.map((flight, index) => (
              <div key={index} className='flight-div bg-white mt-2 mb-4 hover:shadow-xl cursor-pointer rounded-xl shadow-md'>
                <div className='meal flex text-xs p-1 gap-1 font-semibold items-center bg-gradient-to-r from-yellow-200 w-1/6 to-white'>
                  <img className='w-4' src={mealicon} /><p>Enjoy Free Meals</p>
                </div>
                <div className='duration-div flex pt-2 px-7 gap-14 justify-between'>
                  <div className='flex w-5/12 justify-between items-start'>
                    <div className='flex gap-2 items-center'>
                      <img className='w-10' src={getAirlineLogo(flight.flightID)} alt='Airline Logo' />
                      <div className=''>
                        <p className='hide flno text-xs'>{name}</p>
                        <p className='hide flno text-xs mt-1 text-gray-500'>{(flight.flightID).substring(0, 5)}</p>
                      </div>
                    </div>
                    <div>
                      <p className=' font-bold text-xl'>{flight.departureTime}</p>
                      <p className='text-sm text-gray-600'>{source.city}</p>
                    </div>
                    <div className='w-24'>
                      <p className='ml-4 text-gray-500'>0{flight.duration}h:00m</p>
                      <div className=' relative'>
                        <hr className=' border-t-1 border-gray-500' />
                        <IoSend className=' absolute h-[7px] -right-1 -top-[3px]' />
                      </div>
                      <p className='ml-5 text-xs text-gray-500'>{flight.stops}-stops</p>
                    </div>
                  </div>
                  <div className='btn w-6/12 flex justify-between items-start'>
                    <div>
                      <p className=' font-bold text-xl'>{flight.arrivalTime}</p>
                      <p className='text-sm text-gray-600'>{destination.city}</p>
                    </div>
                    <div className='price flex flex-col items-start'>
                      <p className=' font-bold text-2xl text-orange-600'>₹ {flight.ticketPrice}</p>
                      <p className='text-blue-400 text-xs font-semibold py-1 border border-blue-400 rounded-full px-3 cursor-not-allowed'>+ More Fare</p>
                      <p className='font-semibold text-xs text-green-600'>Get Rs.400 OFF with BOOKNOW</p>
                    </div>
                    <button onClick={() => handleFlightBooking(flight)} className=' bg-orange-500 font-bold text-white rounded-full py-1 px-3'>BOOK NOW</button>
                  </div>
                </div>
                <div onClick={() => handleFlightDetailsClick(index)} className='bg-gray-100 py-1 rounded-b-xl px-3 text-sm text-blue-500'>
                  <p>Flight Details</p>
                </div>
                {selectedFlightIndex === index && <div>
                  <div className='mx-2 bg-gray-100 items-center flex rounded-full mt-2 justify-between'>
                    <button
                      className={`  rounded-full  py-1 px-10 ${activeTab === 'Finfo' ? 'active bg-blue-500 text-white' : ''}`}
                      onClick={() => setActiveTab('Finfo')}
                    >Flight Information</button>

                    <button
                      className={` rounded-full py-1 px-10 ${activeTab === 'ruleDetails' ? 'active bg-blue-500 text-white' : ''}`}
                      onClick={() => setActiveTab('ruleDetails')}
                    >Fare Details & Rules </button>

                    <button
                      className={` rounded-full py-1 px-10 ${activeTab === 'BaggageInfo' ? 'active bg-blue-500 text-white' : ''}`}
                      onClick={() => setActiveTab('BaggageInfo')}
                    >Baggage Information</button>

                    <button
                      className={` rounded-full py-1 px-10 ${activeTab === 'CancellationInfo' ? 'active bg-blue-500 text-white' : ''}`}
                      onClick={() => setActiveTab('CancellationInfo')}
                    >Cancellation & Change Rule</button>
                    <IoMdCloseCircle className='text-xl mr-2' onClick={() => setSelectedFlightIndex(false)} />
                  </div>
                  {activeTab === 'Finfo' && <div className='my-2'>
                    <div className='flex gap-1 ml-3 items-center'>
                      <p className='text-sm'>{flight.source}</p>
                      <div className=' relative w-5'>
                        <hr className=' border-t-1 border-gray-500' />
                        <IoSend className=' absolute h-[7px] -right-1 -top-[3px]' />
                      </div>
                      <p className='text-sm'>{flight.destination}</p>
                    </div>

                    <div className='ml-5 mr-28 p-2'>
                      <div className='flex justify-between'>
                        <div className='flex'>
                          <img className='w-6 h-6 mr-6' src={getAirlineLogo(flight.flightID)} alt='Airline Logo' />
                          <div>
                            <p className='text-sm'>{name}</p>
                            <p className='text-xs mt-1 text-gray-500'>{(flight.flightID).substring(0, 5)}</p>
                          </div>
                        </div>

                        <div className='w-32'>
                          <p className=' font-bold text-xl'>{flight.departureTime}</p>
                          <p className='text-xs mt-1 font-semibold text-gray-500'>{source.city} ({source.iata_code})</p>
                          <p className='text-xs text-gray-500'>{source.name}</p>
                        </div>

                        <div className='flex flex-col justify-center items-center'>
                          <LuAlarmClock className='text-lg' />
                          <p className='text-xs'>0{flight.duration}h:00m</p>
                        </div>

                        <div className='w-32'>
                          <p className=' font-bold text-xl'>{flight.arrivalTime}</p>
                          <p className='text-xs mt-1 font-semibold text-gray-500'>{destination.city} ({destination.iata_code})</p>
                          <p className='text-xs text-gray-500 text-wrap'>{destination.name}</p>
                        </div>

                      </div>
                    </div>
                  </div>}
                  {activeTab === 'ruleDetails' && <div className='flex pt-3'>
                    <div class="bg-white p-4 text-xs w-1/3 mx-2 max-w-sm border">
                      <table class="w-full">
                        <tbody class="text-gray-800">
                          <tr class="border-b">
                            <td class="py-2">1 x Adult</td>
                            <td class="py-2 text-right">₹ {flight.ticketPrice}</td>
                          </tr>
                          <tr class="border-b">
                            <td class="py-2">1 x Child</td>
                            <td class="py-2 text-right">₹ {flight.ticketPrice}</td>
                          </tr>
                          <tr class="border-b font-semibold">
                            <td class="py-2">Total (Base Fare)</td>
                            <td class="py-2 text-right">₹ {flight.ticketPrice * 2}</td>
                          </tr>
                          <tr class="border-b">
                            <td class="py-2">Total Tax</td>
                            <td class="py-2 text-right">₹ 00</td>
                          </tr>
                          <tr>
                            <td class="py-2 font-semibold">Total (Fee & Surcharge)</td>
                            <td class="py-2 text-right font-bold">₹ {flight.ticketPrice * 2}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="p-3 w-2/3 text-xs border mr-2">
                      <div class="flex justify-between items-center mb-4">
                        <h1 class="text-sm font-semibold">Fare Rules</h1>
                        <button class=" text-green-500 border text-xs border-green-500 px-4 py-1 rounded-full">Refundable</button>
                      </div>
                      <div class="overflow-x-auto">
                        <table class="min-w-full table-auto  text-left text-gray-500">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                              <th scope="col" class="py-1 px-6">Time Frame to cancel</th>
                              <th scope="col" class="py-1 px-6">Airline Fees per passenger</th>
                              <th scope="col" class="py-1 px-6">EMT Fees per passenger</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="bg-white border-b">
                              <td class="py-1 px-6">Before scheduled departure time</td>
                              <td class="py-1 px-6">₹ 3000</td>
                              <td class="py-1 px-6">₹ 300</td>
                            </tr>
                            <tr class="bg-white border-b">
                              <td class="py-1 px-6">Cancel Before 72 hours of departure time.</td>
                              <td class="py-1 px-6">₹ 3500</td>
                              <td class="py-1 px-6">₹ 300</td>
                            </tr>
                            <tr class="bg-white">
                              <td class="py-1 px-6">Cancel within 72 hours & before 4 hours of departure time.</td>
                              <td class="py-1 px-6">₹ 3500</td>
                              <td class="py-1 px-6">₹ 300</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="mt-6 overflow-x-auto">
                        <table class="min-w-full table-auto text-sm text-left text-gray-500">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                              <th scope="col" class="py-1 px-6">Time Frame to reschedule</th>
                              <th scope="col" class="py-1 px-6">Airline Fees per passenger</th>
                              <th scope="col" class="py-1 px-6">EMT Fees per passenger</th>
                            </tr>
                          </thead>
                          <tbody className='text-xs'>
                            <tr class="bg-white border-b">
                              <td class="py-1 px-6">Before scheduled departure time</td>
                              <td class="py-1 px-6">₹ 2750</td>
                              <td class="py-1 px-6">₹ 300</td>
                            </tr>
                            <tr class="bg-white border-b">
                              <td class="py-1 px-6">Reschedule before 72 hours of departure time.</td>
                              <td class="py-1 px-6">₹ 2750</td>
                              <td class="py-1 px-6">₹ 300</td>
                            </tr>
                            <tr class="bg-white">
                              <td class="py-1 px-6">Reschedule within 72 hours & before 4 hours of departure time.</td>
                              <td class="py-1 px-6">₹ 3250</td>
                              <td class="py-1 px-6">₹ 300</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="mt-6  text-xs">
                        <h2 class=" font-semibold">Terms & Conditions</h2>
                        <ul class="list-disc pl-6 mt-2 text-gray-600">
                          <li>Total Rescheduling Charges Airlines Rescheduling fees Fare Difference if applicable + EMT Fees.</li>
                          <li>The airline cancel reschedule fees is indicative and can be changed without any prior notice by the airlines.</li>
                          <li>EaseMyTrip does not guarantee the accuracy of cancel reschedule fees.</li>
                          <li>Partial cancellation is not allowed on the flight tickets which are book under special round trip discounted fares.</li>
                          <li>Airlines doesnt allow any additional baggage allowance for any infant added in the booking.</li>
                          <li>In certain situations of restricted cases, no amendments and cancellation is allowed.</li>
                          <li>Airlines cancel reschedule should be reconfirmed before requesting for a cancellation or amendment.</li>
                        </ul>
                      </div>
                    </div>
                  </div>}

                  {activeTab === 'BaggageInfo' && <div className='w-full py-5'>
                    <div class="container mx-auto px-4 py-2 w-11/12 border">
                      <table class="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className='bg-gray-100'>
                          <tr>
                            <th class="border border-gray-300 px-4 py-1 text-left text-sm font-medium">Airline</th>
                            <th class="border border-gray-300 px-4 py-1 text-left text-sm font-medium">Check-in Baggage</th>
                            <th class="border border-gray-300 px-4 py-1 text-left text-sm font-medium">Cabin Baggage</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="border border-gray-300 px-4 py-1 text-xs">
                              <div class="flex items-center space-x-2">
                                <img className='w-7' src={getAirlineLogo(flight.flightID)} alt='Airline Logo' />
                                <div className=''>
                                  <p className='text-xs'>{name}</p>
                                  <p className='text-xs mt-1 text-gray-500'>{(flight.flightID).substring(0, 5)}</p>
                                </div>
                              </div>
                            </td>
                            <td class="border border-gray-300 px-4 py-1 text-xs">15kgs</td>
                            <td class="border border-gray-300 px-4 py-1 text-xs">7kg</td>
                          </tr>
                          <tr>
                            <td class="border border-gray-300 px-4 py-1 text-xs">
                              <div class="flex items-center space-x-2">
                                <img className='w-7' src={getAirlineLogo(flight.flightID)} alt='Airline Logo' />
                                <div className=''>
                                  <p className='text-xs'>{name}</p>
                                  <p className='text-xs mt-1 text-gray-500'>{(flight.flightID).substring(0, 5)}</p>
                                </div>
                              </div>
                            </td>
                            <td class="border border-gray-300 px-4 py-1 text-xs">15kgs</td>
                            <td class="border border-gray-300 px-4 py-1 text-xs">7kg</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="mt-4 text-xs">
                        <ul class="list-disc pl-5">
                          <li>Baggage information mentioned above is obtained from airline's reservation system, EaseMyTrip does not guarantee the accuracy of this information.</li>
                          <li>The baggage allowance may vary according to stop-overs, connecting flights, changes in airline rules, etc.</li>
                        </ul>
                      </div>
                    </div>
                  </div>}

                  {activeTab === 'CancellationInfo' && <div className='w-full py-5'>
                    <div class="p-3 w-2/3 text-xs border mx-auto">
                      <div class="flex justify-between items-center mb-4">
                        <h1 class="text-sm font-semibold">Fare Rules</h1>
                        <button class=" text-green-500 border text-xs border-green-500 px-4 py-1 rounded-full">Refundable</button>
                      </div>
                      <div class="overflow-x-auto">
                        <table class="min-w-full table-auto  text-left text-gray-500">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                              <th scope="col" class="py-1 px-6">Time Frame to cancel</th>
                              <th scope="col" class="py-1 px-6">Airline Fees per passenger</th>
                              <th scope="col" class="py-1 px-6">EMT Fees per passenger</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="bg-white border-b">
                              <td class="py-1 px-6">Before scheduled departure time</td>
                              <td class="py-1 px-6">₹ 3000</td>
                              <td class="py-1 px-6">₹ 300</td>
                            </tr>
                            <tr class="bg-white border-b">
                              <td class="py-1 px-6">Cancel Before 72 hours of departure time.</td>
                              <td class="py-1 px-6">₹ 3500</td>
                              <td class="py-1 px-6">₹ 300</td>
                            </tr>
                            <tr class="bg-white">
                              <td class="py-1 px-6">Cancel within 72 hours & before 4 hours of departure time.</td>
                              <td class="py-1 px-6">₹ 3500</td>
                              <td class="py-1 px-6">₹ 300</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="mt-6 overflow-x-auto">
                        <table class="min-w-full table-auto text-sm text-left text-gray-500">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                              <th scope="col" class="py-1 px-6">Time Frame to reschedule</th>
                              <th scope="col" class="py-1 px-6">Airline Fees per passenger</th>
                              <th scope="col" class="py-1 px-6">EMT Fees per passenger</th>
                            </tr>
                          </thead>
                          <tbody className='text-xs'>
                            <tr class="bg-white border-b">
                              <td class="py-1 px-6">Before scheduled departure time</td>
                              <td class="py-1 px-6">₹ 2750</td>
                              <td class="py-1 px-6">₹ 300</td>
                            </tr>
                            <tr class="bg-white border-b">
                              <td class="py-1 px-6">Reschedule before 72 hours of departure time.</td>
                              <td class="py-1 px-6">₹ 2750</td>
                              <td class="py-1 px-6">₹ 300</td>
                            </tr>
                            <tr class="bg-white">
                              <td class="py-1 px-6">Reschedule within 72 hours & before 4 hours of departure time.</td>
                              <td class="py-1 px-6">₹ 3250</td>
                              <td class="py-1 px-6">₹ 300</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="mt-6  text-xs">
                        <h2 class=" font-semibold">Terms & Conditions</h2>
                        <ul class="list-disc pl-6 mt-2 text-gray-600">
                          <li>Total Rescheduling Charges Airlines Rescheduling fees Fare Difference if applicable + EMT Fees.</li>
                          <li>The airline cancel reschedule fees is indicative and can be changed without any prior notice by the airlines.</li>
                          <li>EaseMyTrip does not guarantee the accuracy of cancel reschedule fees.</li>
                          <li>Partial cancellation is not allowed on the flight tickets which are book under special round trip discounted fares.</li>
                          <li>Airlines doesnt allow any additional baggage allowance for any infant added in the booking.</li>
                          <li>In certain situations of restricted cases, no amendments and cancellation is allowed.</li>
                          <li>Airlines cancel reschedule should be reconfirmed before requesting for a cancellation or amendment.</li>
                        </ul>
                      </div>
                    </div>
                  </div>}

                </div>}
              </div>
            )))}
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
    </div>
  )
}

export default Flights
