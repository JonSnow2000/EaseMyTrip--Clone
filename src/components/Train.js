import React from 'react'
import irctc from "../Assets/Icon-irctc.svg"
import livestation from "../Assets/_icon_live-station.svg"
import livestatus from "../Assets/_icon_live_status.svg"
import food from "../Assets/_icon_train_food.svg"
import refund from "../Assets/_icon_refund.svg"
import service from "../Assets/_icon_train_24.svg"
import { FaArrowRightLong } from "react-icons/fa6";
import hotelapp from '../Assets/hotel-app.webp';
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import customers from '../Assets/happy-customers.svg';
import playstore from '../Assets/playstore.png';
import iosstore from '../Assets/iosstore.png';
import qrcode from '../Assets/qrcode.png';
import bgtrain from '../Assets/bg_train.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify'
import css from '../styles/Train.css'

function Train({ setTrainData }) {
    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);
    const [day, setDay] = useState(null);
    const navigate = useNavigate();

    const trainCityOptions = [
        { value: 'New Delhi', label: 'New Delhi' },
        { value: 'Delhi Junction', label: 'Delhi Junction' },
        { value: 'Dhanbad Junction', label: 'Dhanbad Junction' },
        { value: 'Surat', label: 'Surat' },
        { value: 'Katpadi Junction', label: 'Katpadi Junction' },
        { value: 'Kanpur Central', label: 'Kanpur Central' },
        { value: 'Kharagpur Junction', label: 'Kharagpur Junction' },
        { value: 'Thiruvananthapuram Central', label: 'Thiruvananthapuram Central' },
        { value: 'Indore Junction', label: 'Indore Junction' },
        { value: 'Chandigarh', label: 'Chandigarh' },
        { value: 'Gwalior Junction', label: 'Gwalior Junction' },
        { value: 'Agra Cantonment', label: 'Agra Cantonment' },
        { value: 'Ambala Cantonment', label: 'Ambala Cantonment' },
        { value: 'Bhusaval Junction', label: 'Bhusaval Junction' },
        { value: 'Manmad Junction', label: 'Manmad Junction' },
        { value: 'Thrissur', label: 'Thrissur' },
        { value: 'Visakhapatnam Junction', label: 'Visakhapatnam Junction' },
        { value: 'Khurda Road Junction', label: 'Khurda Road Junction' },
        { value: 'Ahmedabad Junction', label: 'Ahmedabad Junction' },
        { value: 'Moradabad Junction', label: 'Moradabad Junction' },
        { value: 'Secunderabad Junction', label: 'Secunderabad Junction' },
        { value: 'Nagpur Junction', label: 'Nagpur Junction' },
        { value: 'Howrah Junction', label: 'Howrah Junction' },
        { value: 'Mysuru Junction', label: 'Mysuru Junction' },
        { value: 'Amritsar Junction', label: 'Amritsar Junction' },
        { value: 'Pune Junction', label: 'Pune Junction' },
        { value: 'Raipur Junction', label: 'Raipur Junction' },
        { value: 'Jhansi Junction', label: 'Jhansi Junction' },
        { value: 'Varanasi Junction', label: 'Varanasi Junction' },
        { value: 'Guwahati', label: 'Guwahati' },
        { value: 'Asansol Junction', label: 'Asansol Junction' },
        { value: 'Nadiad Junction', label: 'Nadiad Junction' },
        { value: 'Bhopal Junction', label: 'Bhopal Junction' },
        { value: 'Yesvantpur Junction', label: 'Yesvantpur Junction' },
        { value: 'Kollam Junction', label: 'Kollam Junction' },
        { value: 'Ludhiana Junction', label: 'Ludhiana Junction' },
        { value: 'Bengaluru Cantt', label: 'Bengaluru Cantt' },
        { value: 'Vijayawada Junction', label: 'Vijayawada Junction' },
        { value: 'Warangal', label: 'Warangal' },
        { value: 'Anand Junction', label: 'Anand Junction' },
        { value: 'Hubli Junction', label: 'Hubli Junction' },
        { value: 'Jodhpur Junction', label: 'Jodhpur Junction' },
        // Add any other necessary options here
    ];

    const handleSearch = async () => {
        if (!source) {
            toast.info("Please select source!")
            return
        } else if (!destination) {
            toast.info("Please select destination!")
            return
        } else if (!day) {
            toast.info("Please select date!")
            return
        }
        if (source.value == destination.value) {
            toast.info("Source and destination cann't be the same!")
            return
        }
        const dayAbbreviation = day ? day.toLocaleDateString('en-US', { weekday: 'short' }) : '';
        try {
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/train?&day=${dayAbbreviation}&search={"source":"${source.value}","destination":"${destination.value}"}`, {
                headers: {
                    projectID: '{{3fqlxt7o7trf}}'
                }
            });
            setTrainData(response.data.data.trains);
            navigate('/trainlistinfo');
        } catch (error) {
            console.error('Error searching trains:', error);
        }
    };

    return (
        <>
            <div className="train-blue bg-gradient-to-r from-blue-500 to-sky-400 py-12">
                <div className='w-9/12 mx-auto'>
                    <div className='flex mt-3 shadow-2xl '>
                        <div className='bg-white rounded-s-md w-full flex '>
                            <div className='w-full flex'>
                                <div className='abc py-2 pl-3 w-1/3 cursor-pointer'>
                                    <p className='text-gray-500 mb-1 text-sm font-bold'>From</p>
                                    <Select
                                        menuPortalTarget={document.body}
                                        menuPosition='fixed'
                                        menuPortal={ provided => ({ ...provided, zIndex: 9999 })}
                                        menu ={ provided => ({ ...provided, zIndex: 9999 })}
                                        className=' my-2 font-bold'
                                        options={trainCityOptions}
                                        value={source}
                                        onChange={setSource}
                                        placeholder='Choose Source Station'
                                    />
                                </div>
                                <div className='py-2 pl-3 w-1/3 rounded-s-md border-r cursor-pointer'>
                                    <p className='text-gray-500 text-sm mb-1 font-bold'>To</p>
                                    <Select
                                        menuPortalTarget={document.body}
                                        menuPosition='fixed'
                                        className='my-2 font-bold'
                                        options={trainCityOptions}
                                        value={destination}
                                        onChange={setDestination}
                                        placeholder='Choose Destination Station'
                                    />
                                </div>
                                <div className='flex w-1/3'>
                                    <div className='py-2 pl-3 w-full rounded-s-md cursor-pointer'>
                                        <p className='text-gray-500 mb-1 text-sm font-bold'>Departure Date</p>
                                        <DatePicker
                                            className='font-bold cursor-pointer my-2 focus:outline-none text-lg px-2 w-full'
                                            selected={day}
                                            minDate={new Date()}
                                            onChange={date => setDay(date)}
                                            placeholderText='Select Date'
                                            dateFormat='yyyy-MM-dd'
                                            isClearable
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className='bg-orange-500 rounded-e-md px-8 text-xl text-white font-bold'
                            onClick={handleSearch}
                        >
                            SEARCH
                        </button>
                    </div>
                </div>
            </div>
            <div class="vw97 whyTrain bg-white w-10/12 mx-auto p-8">
                <h2 class="text-3xl font-bold mb-10"><span className='text-sky-500'>Why</span> Book Train Tickets From EaseMyTrip</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div class="p-4 border flex border-sky-300 hover:bg-sky-50 gap-4 items-start rounded-lg shadow-sm">
                        <img src={irctc} alt="IRCTC Authorized Partner" class="mb-3" />

                        <div className='text-sm'>
                            <h3 class="font-semibold">IRCTC Authorized Partner</h3>
                            <hr className='w-14 my-1 rounded border-2 border-sky-400' />
                            <p>EaseMyTrip is authorized partner of IRCTC, booking train tickets since 2018.</p>
                        </div>
                    </div>
                    <div class="p-4 border flex border-sky-300 hover:bg-sky-50 gap-4 items-start rounded-lg shadow-sm">
                        <img src={livestation} alt="Live Station Status" class="mb-3" />
                        <div className='text-sm'>
                            <h3 class="font-semibold">Live Station Status</h3>
                            <hr className='w-14 my-1 rounded border-2 border-sky-400' />
                            <p>Get a complete list of trains that shall be arriving at the railway station of your choice at the time selected by you.</p>
                        </div>
                    </div>
                    <div class="p-4 flex border-sky-300 hover:bg-sky-50 gap-4 items-start border rounded-lg shadow-sm">
                        <img src={livestatus} alt="Live Train Status" class="mb-3" />
                        <div className='text-sm'>
                            <h3 class="font-semibold">Live Train Status</h3>
                            <hr className='w-14 my-1 rounded border-2 border-sky-400' />
                            <p>Get to know the Live Status of railway trains and delays, if any.</p>
                        </div>
                    </div>


                    <div class="p-4 flex border-sky-300 hover:bg-sky-50 gap-4 items-start border rounded-lg shadow-sm">
                        <img src={food} alt="IRCTC Train Food Booking" class="mb-3" />
                        <div className='text-sm'>
                            <h3 class="font-semibold">IRCTC Train Food Booking</h3>
                            <hr className='w-14 my-1 rounded border-2 border-sky-400' />
                            <p>Enjoy booking IRCTC Food & Get Food Delivered on the Train</p>
                        </div>
                    </div>
                    <div class="p-4 flex border-sky-300 hover:bg-sky-50 gap-4 items-start border rounded-lg shadow-sm">
                        <img src={refund} alt="Instant Refunds & Cancellations" class="mb-3" />
                        <div className='text-sm'>
                            <h3 class="font-semibold">Instant Refunds & Cancellations</h3>
                            <hr className='w-14 my-1 rounded border-2 border-sky-400' />
                            <p>Get an instant refund and book your next train ticket without any hassle.</p>
                        </div>
                    </div>
                    <div class="p-4 flex border-sky-300 hover:bg-sky-50 gap-4 items-start border rounded-lg shadow-sm">
                        <img src={service} alt="24*7 Customer Service" class="mb-3" />
                        <div className='text-sm'>
                            <h3 class="font-semibold">24*7 Customer Service</h3>
                            <hr className='w-14 my-1 rounded border-2 border-sky-400' />
                            <p>We work 24 hours a day to make sure our availability whenever our customers need us.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-3xl font-bold mb-8"><span className='text-sky-500'>Top</span> Train Ticket Routes</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div onClick={() => toast.info("We will update this feature soon!")} class="p-4 border bg-sky-50 border-sky-200 rounded-lg shadow-sm">
                        <h2 class="text-md font-semibold">NEW DELHI 🚉 JAMMU TAWI</h2>
                        <div className='flex justify-between'>
                            <p class="text-md text-sky-400 font-bold">NDLS - JAT</p>
                            <button class="hover:text-sky-600 text-sky-400 font-bold text-sm rounded inline-flex gap-1 items-center">
                                Book Now <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                    <div onClick={() => toast.info("We will update this feature soon!")} class="p-4 border bg-sky-50 border-sky-200 rounded-lg shadow-sm">
                        <h2 class="text-md font-semibold ">NEW DELHI 🚉 PATNA JN</h2>
                        <div className='flex justify-between'>
                            <p class="text-md text-sky-400 font-bold">NDLS - PNBE</p>
                            <button class="hover:text-sky-600 text-sky-400 font-bold text-sm rounded inline-flex gap-1 items-center">
                                Book Now <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                    <div onClick={() => toast.info("We will update this feature soon!")} class="p-4 border bg-sky-50 border-sky-200 rounded-lg shadow-sm">
                        <h2 class="text-md font-semibold ">HYDERABAD DECAN 🚉 CHENNAI CENTRAL</h2>
                        <div className='flex justify-between'>
                            <p class="text-md text-sky-400 font-bold">HYB - MAS</p>
                            <button class="hover:text-sky-600 text-sky-400 font-bold text-sm rounded inline-flex gap-1 items-center">
                                Book Now <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                    <div onClick={() => toast.info("We will update this feature soon!")} class="p-4 border bg-sky-50 border-sky-200 rounded-lg shadow-sm">
                        <h2 class="text-md font-semibold ">NEW DELHI 🚉 LUCKNOW</h2>
                        <div className='flex justify-between'>
                            <p class="text-md text-sky-400 font-bold">NDLS - LJN</p>
                            <button class="hover:text-sky-600 text-sky-400 font-bold text-sm rounded inline-flex gap-1 items-center">
                                Book Now <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                    <div onClick={() => toast.info("We will update this feature soon!")} class="p-4 border bg-sky-50 border-sky-200 rounded-lg shadow-sm">
                        <h2 class="text-md font-semibold ">JAIPUR 🚉 AHMEDABAD JN</h2>
                        <div className='flex justify-between'>
                            <p class="text-md text-sky-400 font-bold">JP - ADI</p>
                            <button class="hover:text-sky-600 text-sky-400 font-bold text-sm rounded inline-flex gap-1 items-center">
                                Book Now <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                    <div onClick={() => toast.info("We will update this feature soon!")} class="p-4 border bg-sky-50 border-sky-200 rounded-lg shadow-sm">
                        <h2 class="text-md font-semibold ">MUMBAI CENTRAL 🚉 PUNE JN</h2>
                        <div className='flex justify-between'>
                            <p class="text-md text-sky-400 font-bold">BCT - PUNE</p>
                            <button class="hover:text-sky-600 text-sky-400 font-bold text-sm rounded inline-flex gap-1 items-center">
                                Book Now <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                    <div onClick={() => toast.info("We will update this feature soon!")} class="p-4 border bg-sky-50 border-sky-200 rounded-lg shadow-sm">
                        <h2 class="text-md font-semibold ">VIJAYAWADA JN 🚉 CHENNAI CENTRAL</h2>
                        <div className='flex justify-between'>
                            <p class="text-md text-sky-400 font-bold">BZA - MAS</p>
                            <button class="hover:text-sky-600 text-sky-400 font-bold text-sm rounded inline-flex gap-1 items-center">
                                Book Now <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                    <div onClick={() => toast.info("We will update this feature soon!")} class="p-4 border bg-sky-50 border-sky-200 rounded-lg shadow-sm">
                        <h2 class="text-md font-semibold ">HOWRAH JN 🚉 JAIPUR</h2>
                        <div className='flex justify-between'>
                            <p class="text-md text-sky-400 font-bold">HWH - JP</p>
                            <button class="hover:text-sky-600 text-sky-400 font-bold text-sm rounded inline-flex gap-1 items-center">
                                Book Now <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                    <div onClick={() => toast.info("We will update this feature soon!")} class="p-4 border bg-sky-50 border-sky-200 rounded-lg shadow-sm">
                        <h2 class="text-md font-semibold ">PATNA JN 🚉 GUWAHATI</h2>
                        <div className='flex justify-between'>
                            <p class="text-md text-sky-400 font-bold">PNBE - GHY</p>
                            <button class="hover:text-sky-600 text-sky-400 font-bold text-sm rounded inline-flex gap-1 items-center">
                                Book Now <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                    <div onClick={() => toast.info("We will update this feature soon!")} class="p-4 border bg-sky-50 border-sky-200 rounded-lg shadow-sm">
                        <h2 class="text-md font-semibold ">INDORE JN 🚉 MUMBAI CENTRAL</h2>
                        <div className='flex justify-between'>
                            <p class="text-md text-sky-400 font-bold">INDB - BCT</p>
                            <button class="hover:text-sky-600 text-sky-400 font-bold text-sm rounded inline-flex gap-1 items-center">
                                Book Now <FaArrowRightLong />
                            </button>
                        </div>
                    </div>



                </div>
            </div>

            <div class="hide mx-auto bg-sky-50 px-36 py-6">
                <h1 class="text-3xl font-bold mt-10 mb-4">Grab The Best Deals on Train Ticket Bookings</h1>
                <p class="text-sm text-gray-700 mb-4">
                    Indeed, railways are considered as the most affordable transportation modes across India. Owing to its significant contributions to the tourism industry, EaseMyTrip, one of the leading travel organisations is truly delighted to announce a partnership with IRCTC as an authorised partner. With this beneficial affiliation, travellers can now make online train ticket bookings conveniently via the website and mobile app for a happy journey that everyone desires.
                </p>
                <p class="text-sm text-gray-700 mb-4">
                    The emergence of online train booking services has revolutionised the reservation procedure by offering multiple affordable options in every city. Whether you’re heading towards your hometown or just exploring a new destination, online train ticket booking comes with diverse assured benefits. Some of them include wallet-friendly prices, optimal convenience, a picturesque journey and an opportunity to spend quality time with your near & dear ones. At EaseMyTrip we also allow you to select or keep track of different track routes, timings, fares and seats. Therefore, if you’re craving to kickstart your train journey. Then you book your railway tickets online with EaseMyTrip today and enjoy your delightful expedition tomorrow with instant updates and huge savings.
                </p>
                <p class="text-sm text-gray-700 mb-4">
                    Now those days of standing in queue for ticket bookings have gone, as EaseMyTrip enables each traveller to make online train bookings. You just require your Railway User ID and you’re good to go. To elevate the overall experience, we also provide you with live station/train status, 24/7 immediate customer support, train food booking, instant cancellation and refund options as standard facilities. Along with this, you're further offered with other special benefits also that you can enjoy on making online train bookings through our user-friendly portal.
                </p>
                <p class="text-sm text-gray-700 mb-4">
                    With our platform, you can also apply various filters and search options to personalise your train tour as per your preferences. Whether it's a different kind of train, seat, category, or quota, you can opt for any one of them to enjoy convenience every step of your way.
                </p>
                <div class=" text-gray-800 py-6">
                    <h2 class="text-xl font-semibold mb-4">Required Documents to Carry</h2>
                    <p class="text-sm mb-4">Once the railway train ticket booking is confirmed with EaseMyTrip, you're required to carry your essential documents, including government-recognized ID on the departure date. On the arrival of the train checker, you need to show railway bookings along with your ID. Now here’s the detailed list of IDs that you require to carry while onboarding the train.</p>
                    <ul class="list-disc text-sm list-inside mb-6">
                        <li>Aadhar Card</li>
                        <li>Voter ID</li>
                        <li>Pan Card</li>
                        <li>Passport</li>
                        <li>Driving Licence</li>
                        <li>Bank Passbook with Photograph</li>
                        <li>Student ID Card with Photograph, Issued by Recognised School/College</li>
                    </ul>
                    <p class="text-sm mb-4">So, these are the crucial documents that you need to carry while travelling. At EaseMyTrip we care about everyone’s needs. Thus, to fulfill them, we further provide each and every traveller with different kinds of quotes in railways, including ladies quota, tatkal booking, general booking, senior citizen booking, etc. So, why wait? Use it to your own benefit with EaseMyTrip.</p>

                    <h2 class="text-xl font-semibold mb-4">Best Strategies to Book Tatkal Train Tickets with Ease</h2>
                    <p class="text-sm mb-4">In India, it’s actually a challenging task to obtain Tatkal Train tickets. Several factors, including advanced bookings, travel seasons, excessive demand and increased traffic are involved that make it difficult to avail the train Tatkal ticket.</p>
                    <p class="text-sm mb-4">So, to make your job easier, here we’ve shown some of the best ways through which you can easily book Tatkal train tickets at the last minute. Now, let’s have a look at all these points.</p>
                    <ol class="list-decimal text-sm list-inside mb-6 ">
                        <li className='font-bold'>Prefer Advance Preparation</li>
                        <p className='my-1'>It’s highly advised to prepare and maintain all the train booking-related details like names, age and identity details in advance for a seamless journey.</p>
                        <li className='font-bold'>Rely on Better Network Connections</li>
                        <p className='my-1'>It’s always great to opt for fast, efficient and reliable internet networks or connections to eliminate all the delays while making online train bookings.</p>
                        <li className='font-bold'>Search for the Best Payment Options</li>
                        <p className='my-1'>Instead of relying on different payment gateways, we suggest you stick to only one payment method. It ensures instant transactions with zero hassles.</p>
                        <li className='font-bold'>Create a Back-Up Plan</li>
                        <p className='my-1'>If you want to secure a Tatkal ticket, then having a legitimate backup plan is the best option through which at least you can get an alternate train of a distinct class.</p>
                        <li className='font-bold'>Monitor the Availability of Seats</li>
                        <p className='my-1'>In the majority of the cases, it’s been seen that travellers do not get an opportunity to book Tatkal tickets on the spot. Due to this specific reason, people try to keep a constant tab on other seats. People do it to date as someone might cancel the train ticket at the last moment and you can be the lucky one.</p>
                    </ol>
                    <p class="text-sm">It's always great to opt for fast, efficient and reliable internet networks or connections to eliminate all the delays while making online train bookings. Instead of relying on different payment gateways, we suggest you stick to only one payment method. It ensures instant transactions with zero hassles.</p>

                    <div className='my-4'>
                        <p className='text-lg my-2 font-bold'>How to Book Train Ticket Online</p>
                        <h2 class=" text-sm mb-1">Doing online ticket bookings with EaseMyTrip is extremely easy. Follow the below-mentioned steps to make your train booking with EaseMyTrip:</h2>
                        <ul class="text-sm space-y-2">
                            <li><span className='font-bold mr-1'>Step 1:</span>Visit easemytrip.com and then click on the Trains tab.</li>
                            <li><span className='font-bold mr-1'>Step 2:</span>Type the name of the departure point in the 'From' section and the destination point in the 'To' section. Also, select the departure date and then click on the Search button.</li>
                            <li><span className='font-bold mr-1'>Step 3:</span>See a list of trains according to your search. Choose the train and seat as per your preference. Use the filter option to select seat type or category.</li>
                            <li><span className='font-bold mr-1'>Step 4:</span>Click the continue button if the departure and destination stations are confirmed.</li>
                            <li><span className='font-bold mr-1'>Step 5:</span>Now, mention all the mandatory details related to your booking. Enter the IRCTC user id, select the boarding point, enter contact details and traveller information (the details are to be mentioned separately for every passenger/child).</li>
                            <li><span className='font-bold mr-1'>Step 6:</span>Once all the details are filled in on the Review & Travellers page, review all the details to avoid any issues. Check the Price Summary and if you are okay with everything, go ahead with your payment.</li>
                            <li><span className='font-bold mr-1'>Step 7:</span>If you have any coupon code, enter the same in the required field and save your money.</li>
                            <li><span className='font-bold mr-1'>Step 8:</span>Now, make your payment using your preferred option. You can choose from a wide range of options from Debit card, Credit card, UPI, net banking, or wallet money.</li>
                            <li><span className='font-bold mr-1'>Step 9:</span>Once the payment is done, the IRCTC authentication page will open, and you are required to fill in your IRCTC user ID password. After that, you will also receive your e-ticket on your mobile and email ID.</li>
                        </ul>
                        <p class="mt-6 text-sm">This process for booking train tickets online is simpler with EaseMyTrip. It is better to book your travel online rather than stand in a queue for long hours. You just need to have an IRCTC user ID to book your train tickets with us. In case you don’t have an IRCTC user ID, you can easily create it online on the official site or by visiting our website.</p>
                        <div className='text-sm my-5 flex justify-between'>
                            <p><span className='font-bold mr-1'>Disclaimer :</span>The train running or station information is not affiliated with or endorsed by Indian Railways or IRCTC.</p>
                            <img className='h-16' src={bgtrain} /></div>
                    </div>
                </div>
            </div>

            <div className='app-info bg-gray-100 my-10 flex items-center p-3'>
                <div className='flex w-1/2 ml-28 items-center'>
                    <div className='relative flex justify-center h-96 items-center w-1/2'>
                        <div className='w-80 h-80 rounded-full bg-blue-300'></div>
                        <img className='absolute h-80' src={hotelapp} />
                    </div>
                    <div className=' border-r p-2 border-black pr-10'>
                        <h className='font-bold text-xl my-3'>Highest-rated mobile app</h>
                        <div className='flex mt-10 gap-3'>
                            <div className='flex flex-col justify-between'>
                                <p className='text-5xl font-bold'>4.6</p>
                                <div className='flex text-sm text-gray-700'><FaStar /><FaStar /><FaStar /><FaStar /><FaRegStarHalfStroke /></div>
                                <p className='text-md flex gap-1'><FaUser />4,83,459</p>
                            </div>
                            <div>
                                <div className='flex items-center'>
                                    <p>5</p>
                                    <div className='ml-2 w-24 h-[14px] bg-green-500'></div>
                                </div>
                                <div className='flex items-center'>
                                    <p>4</p>
                                    <div className='ml-2 w-16 h-[14px] bg-green-400'></div>
                                </div>
                                <div className='flex items-center'>
                                    <p>3</p>
                                    <div className='ml-2 w-10 h-[14px] bg-yellow-500'></div>
                                </div>
                                <div className='flex items-center'>
                                    <p>2</p>
                                    <div className='ml-2 w-6 h-[14px] bg-orange-600'></div>
                                </div>
                                <div className='flex items-center'>
                                    <p>1</p>
                                    <div className='ml-2 w-2 h-4 bg-pink-500'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='trust flex flex-col justify-center items-center'>
                    <p className='font-bold text-nowrap text-xl mb-3'>Trusted By</p>
                    <img src={customers} />
                </div>
                <div className='download ml-10'>
                    <p className='font-bold text-xl mb-3 text-nowrap'>Download EaseMyTrip App</p>
                    <div className='border bg-green-100 w-2/3 p-2 rounded-md text-xs'>
                        <p>Save Up to Rs.5000 OFF on your first hotel booking Use Code: EMTGREET</p>
                    </div>
                    <div>
                        <p className='my-1'>For Hassle-Free Hotel Booking</p>
                        <div>
                            <div className='flex'>
                                <div>
                                    <img className='h-10 rounded-lg my-2' src={playstore} />
                                    <img className='h-10 rounded-lg' src={iosstore} />
                                </div>
                                <div>
                                    <img className='h-24 mt-1 ml-1' src={qrcode} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default Train
