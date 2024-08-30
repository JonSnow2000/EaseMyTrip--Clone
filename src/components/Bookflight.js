import { GrNext } from "react-icons/gr";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import vistara from '../Assets/vistara.png';
import E6 from '../Assets/6E.png';
import AI from '../Assets/AI.png';
import SG from '../Assets/SG.png';
import I5 from '../Assets/I5.png';
import f from '../Assets/f-icon-9.png';
import { FaBedPulse } from "react-icons/fa6";
import acko from '../Assets/acko-logo.png';
import coverage from '../Assets/coverage-icon-v1.svg'
import { FaClinicMedical } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdInfoOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import css from '../styles/BookFlight.css'


function Bookflight({ flightDetails, passengerDetails, setPaymentDetails }) {
    // console.log(flightDetails);
    // console.log(passengerDetails);
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const navigate = useNavigate()

    let name = "";

    const handleBooking = () => {
        if (!email) {
            toast.error("Please enter your email address")
            return;
        } else if (passengerDetails.totalGuests == 0) {
            toast.info("Please add at least one Traveller!")
            navigate('/')
            return;
        }

        setPaymentDetails({
            fare: flightDetails.ticketPrice * passengerDetails.totalGuests
        });
        navigate('/payment');
    }
    const getAirlineLogo = (flightID) => {
        const prefix = flightID.substring(0, 2);
        switch (prefix) {
            case '6E':
                name = "Indigo"
                return E6;
            case 'AI':
                name = "Air India"
                return AI;
            case 'SG':
                name = "Spice Jet"
                return SG;
            case 'UK':
                name = "Vistara"
                return vistara;
            case 'G8':
                name = "Air India Express"
                return I5;

        }
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(e.target.value));
    };


    return (
        <div className='bg-blue-50 p-2'>
            <div className='flight-booking-main-container w-[76%] mx-auto'>
                <div className='flex'>
                    <p className='font-bold text-sm text-sky-700 '>1. Review</p>
                    <GrNext className='text-xl text-gray-300 mx-3' />
                    <p className=' text-sm '>2. Travellers</p>
                    <GrNext className='text-xl text-gray-300 mx-3' />
                    <p className=' text-sm  '>3. Payment</p>

                </div>
                <div className='flght-booking-section flex justify-between'>
                    <div className='booking-details w-[70%]'>
                        <div className=' rounded shadow-xl border bg-white'>
                            <div className='bg-sky-200 p-2'>
                                <p><PiAirplaneTakeoffLight className=' border-2 mr-2 border-black rounded-full h-7 p-1 inline w-7  ' />Flight Detail</p>
                            </div>
                            <div className='flight-details m-4 border rounded shadow-md'>
                                <span className='bg-gray-700 text-white text-sm font-semibold rounded-br-xl p-1'>DEPART</span>
                                <div className='m-2 flex items-center'>
                                    <PiAirplaneTakeoffLight className='text-4xl inline' />
                                    <p className='ml-2 text-xl'>{passengerDetails.origin.city} - {passengerDetails.destination.city} |<span className='text-sm text-gray-500'>{passengerDetails.departureDate.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3)}-{passengerDetails.departureDate.toLocaleDateString('en-US')}</span></p>
                                </div>
                                <div className='flight-logo-div flex'>
                                    <div className='w-1/5 p-3'>
                                        <div className='flex gap-5 items-center'>
                                            <img className='w-7' src={getAirlineLogo(flightDetails.flightID)} alt='Airline Logo' />
                                            <div className='mt-2'>
                                                <p className=''>{name}</p>
                                                <p className='text-xs mt-1 text-gray-500'>{(flightDetails.flightID).substring(0, 5)}</p>
                                            </div>
                                        </div>
                                        <p className='bg-gray-200 w-24 text-sm mt-3 font-semibold rounded-full px-2'>Family fare</p>
                                    </div>
                                    <div className="flex w-full justify-between px-3">
                                        <div className='w-1/5'>
                                            <p className='font-bold text-xl'>{flightDetails.departureTime}</p>
                                            <p className='hide text-gray-500 font-semibold text-xs'>{passengerDetails.origin.city}({(passengerDetails.origin.city).toUpperCase()})</p>
                                            <p className='text-xs text-gray-500'>{passengerDetails.departureDate.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3)}-{passengerDetails.departureDate.toLocaleDateString('en-US')}</p>
                                            <p className='text-xs text-gray-500'></p>
                                        </div>
                                        <div className='w-2/5 flex flex-col justify-center items-center'>
                                            <p className='text-center text-xs text-gray-500'>0{flightDetails.duration}:00h</p>
                                            <p className='text-xs relative my-3 justify-center text-gray-400 flex items-center'><GoDotFill />-----------------------------------<GoDotFill /><PiAirplaneTakeoffLight className='text-center absolute border bg-white  rounded-full h-7 border-gray-400 p-1 inline w-7  ' /></p>
                                            <div className='text-green-500 border rounded-full pt-1 text-[10px] border-green-500 px-4'>REFUNDABLE</div>


                                        </div>
                                        <div className='w-1/5'>
                                            <p className='font-bold text-xl'>{flightDetails.arrivalTime}</p>
                                            <p className='hide text-gray-500 font-semibold text-xs'>{passengerDetails.destination.city}({(passengerDetails.destination.city).toUpperCase()})</p>
                                            <p className='text-xs text-gray-500'>{passengerDetails.departureDate.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3)}-{passengerDetails.departureDate.toLocaleDateString('en-US')}</p>
                                            <p className='text-xs text-gray-500'></p>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-sm my-5 ml-3 text-gray-500'>Fare Rules Baggage</p>
                            </div>
                        </div>

                        <div class=" space-y-6 mt-5">
                            <div class=" p-4 rounded-lg shadow-xl border bg-white">
                                <div class="flex items-center space-x-2">
                                    <img src={coverage} alt="shield" />
                                    <h2 class="text-blue-700 font-bold text-sm">FREE Medical Refund Policy <span class="text-blue-500">✔️</span></h2>
                                </div>
                                <p class="text-sm mt-2">Get full airline refund, if you cancel tickets due to illness or sickness. This service is provided at ZERO additional charges.</p>
                                <div class="mt-4 space-y-2">
                                    <label class="flex items-center space-x-2">
                                        <input type="radio" name="medical-refund" class="text-blue-500" />
                                        <span class="text-xs">Yes, I want to add Medical Refund Policy (FREE) to this flight (OPTIONAL)</span>
                                    </label>
                                    <label class="flex items-center space-x-2">
                                        <input type="radio" name="medical-refund" class="text-blue-500" />
                                        <span class="text-xs">No, I don't wish to add Medical Refund Policy (FREE) to this flight  (OPTIONAL)</span>
                                    </label>
                                </div>
                            </div>

                            <div class="bg-white rounded-lg border shadow-xl">
                                <div class="flex bg-green-100 p-2 items-center space-x-2">
                                    <img src={f} alt="info" />
                                    <div>
                                        <h2 class="text-green-700 font-bold text-sm">Good to Know</h2>
                                        <p class="text-xs mt-1">Information you should know</p>
                                    </div>
                                </div>
                                <ul class="list-disc px-4 py-1 list-inside text-xs mt-2 space-y-1">
                                    <li>15 Kgs per passenger Check-in Baggage included for your selected flight on the sector Delhi to Chennai</li>
                                    <li>Airline Cancellation Fee is Rs 3000 per passenger for your selected flight on the sector Delhi to Chennai</li>
                                    <li>Remember to web check-in before arriving at the airport</li>
                                    <li>Face masks are advisable</li>
                                </ul>
                            </div>

                            <div class="bg-white rounded-lg">
                                <div class="flex bg-purple-200 p-2 items-center justify-around">
                                    <FaClinicMedical className='text-3xl text-gray-600' />
                                    <div className='ml-3'>
                                        <h2 class="text-purple-700 font-bold text-sm">Add Travel Insurance and Secure your Trip with ACKO View/ print your booking ₹ 199/Person</h2>
                                        <p class="text-xs">(Upon Selecting Travel Insurance, You accept the Terms and Conditions of the travel insurance policy)</p>
                                    </div>
                                    <img src={acko} alt="acko" class="w-12 ml-auto" />
                                </div>
                                <div class="grid mx-4 grid-cols-4 gap-4 mt-4">
                                    <div class="bg-white p-4 border rounded-lg flex flex-col items-center justify-center text-center">
                                        <FaBedPulse className='text-2xl text-blue-500' />
                                        <p class="text-sm">Sum Insured : INR 1,00,000</p>
                                    </div>
                                    <div class="bg-white flex flex-col items-center justify-center  p-4 border  rounded-lg text-center">
                                        <FaPersonWalking className='text-2xl text-blue-500' />
                                        <p class="text-sm">Sum Insured : INR 20,000</p>
                                    </div>
                                    <div class="bg-white flex flex-col items-center justify-center  p-4 border  rounded-lg text-center">
                                        <PiAirplaneTakeoffLight className='text-2xl text-blue-500' />
                                        <p class="text-sm">Sum Insured : INR 10,000</p>
                                    </div>
                                    <div class=" bg-white flex items-center justify-center  p-4 border rounded-lg text-center">
                                        <p class="text-blue-500 text-xl">+4 More</p>
                                    </div>
                                </div>
                                <div class="mt-4 mx-4 space-y-2 pb-3">
                                    <label class="flex items-center space-x-2">
                                        <input type="radio" name="travel-insurance" class="text-purple-500" />
                                        <span class="text-xs">Yes, I want to secure my trip with insurance. (OPTIONAL)</span>
                                    </label>
                                    <p class="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-lg">More than 36% of our customer choose to secure their trip.</p>
                                    <label class="flex items-center space-x-2">
                                        <input type="radio" name="travel-insurance" class="text-purple-500" />
                                        <span class="text-xs">No, I do not want to insure my trip. (OPTIONAL)</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="contact bg-blue-50 w-[70%] py-6 rounded-lg max-w-lg">
                            <div className="mb-4 flex items-baseline gap-2">
                                <h2 className="text-xl font-semibold">Contact Information</h2>
                                <p className="text-xs text-gray-600">Your ticket will be sent to this email address</p>
                            </div>
                            <div className="mb-4">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter Email Address"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className={`w-full p-4 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${isValid ? 'focus:ring-blue-500' : 'focus:ring-red-500'}`}
                                    />
                                    <GoMail aria-hidden="true" alt="email icon" className="absolute left-4 top-1/2 transform text-2xl text-gray-300 -translate-y-1/2" />
                                    {!isValid && <span className="text-red-500 mt-2 block">Please enter a valid email address.</span>}
                                </div>

                                {!email && <p className="text-red-500 text-sm mt-1">Please enter your email address *</p>}
                            </div>

                            <button
                                onClick={handleBooking}
                                className="w-[85%] my-2 bg-orange-500 text-white py-3 rounded-full mx-[50%] text-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                Continue Booking
                            </button>
                        </div>
                    </div>
                    <div className='fare w-[26%] sticky top-4 rounded h-72 mb-10 '>
                        <div className='bg-white shadow-lg border rounded'>

                            <div className='bg-blue-100 text-sm flex font-bold items-end gap-2 p-2'>
                                <HiOutlineCurrencyRupee className='text-xl' /> Flight Price Details
                            </div>
                            <div className=' mx-3 pb-1 pt-3 flex justify-between'>
                                <p className='text-sm font-semibold'>Total Passengers :</p>
                                <p className='text-sm font-semibold'>{passengerDetails.totalGuests}</p>
                            </div>
                            <div className='mx-3 py-1 flex border-b pb-2 justify-between'>
                                <p className='text-sm font-semibold text-blue-400'>Total Discount <MdInfoOutline className='inline' /></p>
                                <p className='text-sm font-semibold text-blue-400'>00</p>
                            </div>
                            <div className=' mx-3 py-2 flex border-b pb-2 justify-between'>
                                <p className='text-sm font-semibold'>Price after Discount</p>
                                <p className='text-sm font-semibold'>{flightDetails.ticketPrice * passengerDetails.totalGuests}</p>
                            </div>
                            <div className=' mx-3 py-2 flex border-b pb-2 justify-between'>
                                <p className='text-sm font-semibold'>Taxes & Service Fees</p>
                                <p className='text-sm font-semibold'>Nil</p>
                            </div>
                            <div className=' mx-3 py-2 flex font-bold text-orange-700 justify-between'>
                                <p>Grand Total</p>
                                <p>{flightDetails.ticketPrice * passengerDetails.totalGuests}</p>
                            </div>
                        </div>

                        <button onClick={handleBooking} class=" w-full bg-orange-500 text-white py-2 rounded-full mt-8 text-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">Continue Booking</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Bookflight
