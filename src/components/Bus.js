import React, { useState, useEffect } from 'react';
import axios from 'axios';
import operator from '../Assets/bus-operator.png';
import payment from '../Assets/bus-payment-option.png';
import exclusive from '../Assets/bus-exclusive-options.png';
import discount2 from '../Assets/bus-discount2.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import css from '../styles/Bus.css';

function Bus({ setBusList }) {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [day, setDay] = useState(null);
    const [error, setError] = useState('');
    const [buses, setBuses] = useState([]);

    const navigate = useNavigate();
    const BusToCity = [
        "Indore, Madhya Pradesh",
        "Vadodara, Gujarat",
        "Varanasi, Uttar Pradesh",
        "Ghaziabad, Uttar Pradesh",
        "Meerut, Uttar Pradesh",
        "Rajkot, Gujarat",
        "Visakhapatnam, Andhra Pradesh",
        "Thane, Maharashtra",
        "Kanpur, Uttar Pradesh",
        "Delhi, National Capital Territory of Delhi",
        "Vijayawada, Andhra Pradesh",
        "Chennai, Tamil Nadu",
        "Hyderabad, Telangana",
        "Pune, Maharashtra",
        "Ahmedabad, Gujarat",
        "Jaipur, Rajasthan",
        "Lucknow, Uttar Pradesh",
        "Pimpri-Chinchwad, Maharashtra",
        "Patna, Bihar",
        "Ludhiana, Punjab",
        "Agra, Uttar Pradesh",
        "Nashik, Maharashtra",
        "Faridabad, Haryana",
        "Kalyan-Dombivali, Maharashtra",
        "Vasai-Virar, Maharashtra",
        "Kolkata, West Bengal",
        "Surat, Gujarat",
        "Srinagar, Jammu and Kashmir",
        "Dhanbad, Jharkhand",
        "Jodhpur, Rajasthan",
        "Coimbatore, Tamil Nadu",
        "Jabalpur, Madhya Pradesh",
        "Gwalior, Madhya Pradesh",
        "Allahabad, Uttar Pradesh",
        "Raipur, Chhattisgarh",
        "Amritsar, Punjab",
    ];

    const cityOptions = BusToCity.map(city => ({ value: city.split(',')[0], label: city }));

    const searchBuses = async () => {
        if (!source) {
            toast.info("Please select source!");
            return;
        } else if (!destination) {
            toast.info("Please select destination!");
            return;
        } else if (!day) {
            toast.info("Please select date!");
            return;
        }
        if (source === destination) {
            toast.info("Source and destination can't be the same!");
            return;
        }
        try {
            const response = await axios.get(
                `https://academics.newtonschool.co/api/v1/bookingportals/bus?search={"source":"${source}","destination":"${destination}"}&day=${day.toString().slice(0, 3)}`,
                {
                    headers: {
                        projectID: '3fqlxt7o7trf'
                    }
                }
            );

            setBusList(response.data.data.buses);
            setError('');
            navigate('/buseslist');
        } catch (error) {
            setError('No buses available for the selected route and day.');
            setBuses([]);
        }
    };

    return (
        <div>
            <div className="bus-bluediv bg-gradient-to-r from-blue-500 to-sky-400 py-12">
                <div className='w-9/12 mx-auto relative'>
                    <div className='flex mt-3 shadow-2xl '>
                        <div className='bg-white rounded-s-md w-full flex '>
                            <div className='w-full flex'>
                                <div className='py-2 pl-3 w-1/3 rounded-s-md border-r cursor-pointer'>
                                    <p className='text-gray-500 mb-1 text-sm font-bold'>From</p>
                                    <Select
                                        menuPortalTarget={document.body}
                                        menuPosition='fixed'
                                        menuPortal={provided => ({ ...provided, zIndex: 9999 })}
                                        menu={provided => ({ ...provided, zIndex: 9999 })}
                                        options={cityOptions}
                                        value={cityOptions.find(option => option.value === source)}
                                        onChange={option => setSource(option.value)}
                                        placeholder='Choose Source Station'
                                        className='font-bold text-nowrap cursor-pointer my-2 focus:outline-none text-lg px-2'
                                    />
                                </div>
                                <div className='py-2 pl-3 w-1/3 rounded-s-md border-r cursor-pointer '>
                                    <p className='text-gray-500 text-sm mb-1 font-bold'>To</p>
                                    <Select
                                        menuPortalTarget={document.body}
                                        menuPosition='fixed'
                                        menuPortal={provided => ({ ...provided, zIndex: 9999 })}
                                        menu={provided => ({ ...provided, zIndex: 9999 })}
                                        options={cityOptions}
                                        value={cityOptions.find(option => option.value === destination)}
                                        onChange={option => setDestination(option.value)}
                                        placeholder='Choose Destination Station'
                                        className='font-bold text-nowrap cursor-pointer my-2 focus:outline-none text-lg px-2'
                                    />
                                </div>
                                <div className='flex w-1/3 '>
                                    <div className='py-2 pl-3 w-full rounded-s-md cursor-pointer'>
                                        <p className='text-gray-500 mb-1 text-sm font-bold'>Departure Date</p>
                                        <DatePicker
                                            selected={day}
                                            minDate={new Date()}
                                            onChange={(date) => setDay(date)}
                                            placeholderText='Depart Date'
                                            className='font-bold cursor-pointer my-2 focus:outline-none text-lg px-2 w-full'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className='bg-orange-500 rounded-e-md px-8 text-xl text-white font-bold' onClick={searchBuses}>
                            SEARCH
                        </button>
                    </div>
                    {error && <p className='text-red-500 mt-4'>{error}</p>}
                </div>
            </div>
            <div class="max-w-6xl mx-auto p-4 space-y-8 text-sm">
                <section class="text-center">
                    <h2 class="text-2xl font-bold">Book Your Bus Ticket with Us</h2>
                    <div class="mt-4 p-4 bg-gray-50 rounded-lg text-left shadow-md">
                        <p>Who doesn’t love exploring places by road? The captivating landscapes that are seen on both sides of the bus are the sites to behold. Travelers who love to explore places by road can choose online bus booking at EaseMyTrip and also save huge money. Why would you go out and look for a travel agency to book a tour bus when you can do it by yourself? It takes less than a minute to book a bus ticket at EaseMyTrip. The simple interface, easy navigation, and fast speed of the portal allow you to book a bus to your favorite destination within a few seconds.</p>
                        <p class="mt-2">Whether you want to travel via AC/Non-AC bus, semi-sleeper bus, smart bus, deluxe bus, luxury bus, budgeted bus, or Volvo bus booking EaseMyTrip has got everything covered for you. Enjoy a hassle-free booking experience at EaseMyTrip and discover your favorite place. There are around 3999+ bus operators for online bus ticket booking at this portal, choose the best one that suits your bus ticket booking demand and enjoy your bus journey like never before!</p>
                    </div>
                </section>

                <section class="text-center">
                    <h2 class="text-2xl font-bold">Why EaseMyTrip for Bus Booking?</h2>
                    <div class="mt-4 p-4 bg-gray-50  text-left rounded-lg shadow-md">
                        <p>Gear up for an amazing journey through online bus booking at EaseMyTrip.com. Travel within India to any destination and save huge on your online bus ticket booking using exciting promo codes. EaseMyTrip is a wonderful platform for all bus travelers. Discover your favorite place through luxury bus or budgeted bus including sleeper, AC/NON-Ac, Volvo, semi-sleeper, and room. We provide a hassle-free booking experience for the bus journey. Anybody can use our website and can book a bus to any destination from the comfort of your home. Avoid standing in long queues and go for bus booking online at EaseMyTrip.</p>
                        <p class="mt-2">No matter, wherever you want to go, which bus you want to choose, EaseMyTrip has got everything covered for you. Choose from 3999+ bus operators and book bus tickets online from the comfort of your home. Booking bus ticket online was never been this easy, but with EaseMyTrip's simple user interface, you can book bus tickets within a few clicks. For a better and smooth booking experience, you must download the EaseMyTrip app and continue with your best price flight tickets, train and bus tickets. You can also avail of huge discounts and cashback on your bus booking in India.</p>
                    </div>
                </section>
            </div>
            <div class="hide p-4 max-w-6xl mx-auto">
                <div class="flex space-x-1 overflow-x-auto">
                    <button class="bg-blue-500 text-white text-xs px-3 py-2 hover:bg-blue-500 hover:text-white rounded">A</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">B</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">C</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">D</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">E</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">F</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">G</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">H</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">I</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">J</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">K</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">L</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">M</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">N</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">O</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">P</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">Q</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">R</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">S</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">T</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">U</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">V</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">W</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">X</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">Y</button>
                    <button class="bg-gray-200 text-sm px-3 py-2 hover:bg-blue-500 hover:text-white rounded">Z</button>
                </div>
                <div class="grid grid-cols-1 shadow-xl md:grid-cols-3 gap-4 mt-4 text-sm">
                    <ul class="list-disc pl-5 flex flex-col gap-3">
                        <li>Adilabad Hyderabad Bus</li>
                        <li>Agra Azamgarh Bus</li>
                        <li>Agra Haridwar Bus</li>
                        <li>Agra Varanasi Bus</li>
                        <li>Ahmedabad Aurangabad Bus</li>
                        <li>Ahmedabad Bhilwara Bus</li>
                        <li>Ahmedabad Delhi Bus</li>
                        <li>Ahmedabad Hyderabad Bus</li>
                        <li>Ahmedabad Jaisalmer Bus</li>
                        <li>Ahmedabad Junagadh Bus</li>
                        <li>Ahmedabad Nagpur Bus</li>
                        <li>Ahmedabad Reliance Bus</li>
                        <li>Ahmedabad Udaipur Bus</li>
                        <li>Ahmedabad Vashi Bus</li>
                        <li>Ahmednagar Hyderabad Bus</li>
                        <li>Ajmer Delhi Bus</li>
                        <li>Akola Hyderabad Bus</li>
                        <li>Akola Surat Bus</li>
                    </ul>
                    <ul class="list-disc pl-5 flex flex-col gap-3">
                        <li>Adipur Ahmedabad Bus</li>
                        <li>Agra Dehradun Bus</li>
                        <li>Agra Kanpur Bus</li>
                        <li>Ahmedabad Agra Bus</li>
                        <li>Ahmedabad Bangalore Bus</li>
                        <li>Ahmedabad Bhopal Bus</li>
                        <li>Ahmedabad Gandhidham Bus</li>
                        <li>Ahmedabad Indore Bus</li>
                        <li>Ahmedabad Jalgaon Bus</li>
                        <li>Ahmedabad Keshod Bus</li>
                        <li>Ahmedabad Nathdwara Bus</li>
                        <li>Ahmedabad Somnath Bus</li>
                        <li>Ahmedabad Ujjain Bus</li>
                        <li>Ahmednagar Ahmedabad Bus</li>
                        <li>Ahmednagar Indore Bus</li>
                        <li>Ajmer Kanpur Bus</li>
                        <li>Akola Indore Bus</li>
                        <li>Akot Pune Bus</li>
                    </ul>
                    <ul class="list-disc pl-5 flex flex-col gap-3">
                        <li>Agra Ajmer Bus</li>
                        <li>Agra Delhi Bus</li>
                        <li>Agra Lucknow Bus</li>
                        <li>Ahmedabad Ahmednagar Bus</li>
                        <li>Ahmedabad Baroda Bus</li>
                        <li>Ahmedabad Bhuj Bus</li>
                        <li>Ahmedabad Gurgaon Bus</li>
                        <li>Ahmedabad Jafarabad Bus</li>
                        <li>Ahmedabad Jamnagar Bus</li>
                        <li>Ahmedabad Mumbai Bus</li>
                        <li>Ahmedabad Pune Bus</li>
                        <li>Ahmedabad Surat Bus</li>
                        <li>Ahmedabad Ulhasnagar Bus</li>
                        <li>Ahmednagar Amravati Bus</li>
                        <li>Ahmednagar Nagpur Bus</li>
                        <li>Ajmer Surat Bus</li>
                        <li>Akola Mumbai Bus</li>
                        <li>Alappuzha Pondicherry Bus</li>
                    </ul>
                </div>
            </div>
            <div class="w-9/12 mx-auto p-4">
                <h2 class="text-2xl font-bold text-center mb-6">FAQ's</h2>
                <div class="space-y-4">
                    <div class="border-b">
                        <button class="w-full text-left py-4 flex justify-between items-center">
                            <span class="font-semibold">Why should I book bus tickets with EaseMyTrip.com?</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="border-b">
                        <button class="w-full text-left py-4 flex justify-between items-center">
                            <span class="font-semibold">What are the payment methods for booking bus tickets?</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="border-b">
                        <button class="w-full text-left py-4 flex justify-between items-center">
                            <span class="font-semibold">How to avail discount on bus booking with EaseMyTrip?</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="border-b">
                        <button class="w-full text-left py-4 flex justify-between items-center">
                            <span class="font-semibold">What to do if I lose my ticket?</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="border-b">
                        <button class="w-full text-left py-4 flex justify-between items-center">
                            <span class="font-semibold">How can I cancel my bus ticket at EaseMyTrip?</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="max-w-6xl mx-auto p-4">
                <h2 class="text-center text-2xl font-bold mb-6">Benefit of booking bus with EaseMyTrip</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <div class="bg-white p-6 rounded-lg shadow-md text-center">
                        <img src={exclusive} alt="Safe and Secure" class="mx-auto mb-4" />
                        <h3 class="text-sm font-semibold mb-2">Safe and Secure</h3>
                        <p class="text-xs">Book from a wide variety of buses, including AC, Non-AC, Deluxe, Volvo and more.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center">
                        <img src={payment} alt="Lowest ticket charges" class="mx-auto mb-4" />
                        <h3 class="text-sm font-semibold mb-2">Lowest ticket charges</h3>
                        <p class="text-xs">Grab huge discounts and cashbacks on your bus booking with EaseMyTrip.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center">
                        <img src={discount2} alt="Meet the criteria" class="mx-auto mb-4" />
                        <h3 class="text-sm font-semibold mb-2">Meet the criteria</h3>
                        <p class="text-xs">We give you freedom to choose your mode of payment. Pay through cards, net banking, UPI or mobile wallets.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center">
                        <img src={operator} alt="Achieved 20k+ customer's trust" class="mx-auto mb-4" />
                        <h3 class="text-sm font-semibold mb-2">Achieved 20k+ customer's trust</h3>
                        <p class="text-xs">We have tied up with India's best bus operators to make travel easy for our customers.</p>
                    </div>
                </div>
                <h2 class="text-center text-2xl font-bold mb-6">Gaining the trust day by day</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 class="text-sm font-semibold mb-2">Our Trusted Operators</h3>
                        <p class="text-3xl font-bold">3999+</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center">
                        <h3 class="text-sm font-semibold mb-2">No. of Tickets Booked</h3>
                        <p class="text-3xl font-bold">499999+</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bus;
