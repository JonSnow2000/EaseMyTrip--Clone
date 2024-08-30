import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrNext } from "react-icons/gr";
import { MdPeopleAlt } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdInfoOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import css from '../styles/Bookhotel.css'

function Bookhotel({ hotelBookingData, guestDetails, setPaymentDetails }) {
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isMobileValid, setIsMobileValid] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Function to validate email
    const validateEmail = (email) => {
        return emailRegex.test(email);
    };

    // Function to validate mobile number (you can customize the length as needed)
    const validateMobile = (mobile) => {
        return /^\d{10}$/.test(mobile);
    };

    useEffect(() => {
        setIsEmailValid(validateEmail(email));
        setIsMobileValid(validateMobile(mobile));
    }, [email, mobile]);

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')

    // console.log(guestDetails);
    // console.log(hotelBookingData);

    const checkIn = new Date(guestDetails.checkIn);
    const checkOut = new Date(guestDetails.checkOut);

    const totalNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    // console.log((totalNights));

    const handleHotelBooking = () => {
        if (!isEmailValid){  
            toast.error('Please enter correct email!');
            return
        } else if (!isMobileValid){
            toast.error('Please enter correct mobile number!');
            return
        } else if(!isChecked) {
            toast.error('Please accept terms & conditions!');
            return
        } 
        else if (!token) {
            toast.info("Please login first!")
            navigate('/login');
            return
        }
        setPaymentDetails({ fare: (hotelBookingData.roomDetails.costDetails.taxesAndFees * totalNights * guestDetails.roomCount) + (hotelBookingData.roomDetails.costPerNight * totalNights * guestDetails.roomCount - (hotelBookingData.roomDetails.costDetails.discount)) })

        navigate('/payment', { state: { hotelBookingData, guestDetails } });
    }

    // Check if hotelBookingData is defined and has the necessary properties
    if (!hotelBookingData || !hotelBookingData.name || !hotelBookingData.location || !hotelBookingData.images) {
        return <div className='text-4xl font-bold w-full text-center py-64'>Loading...</div>;
    }

    return (
        <div className='bg-sky-50'>
            <div className='w-11/12 mx-auto py-5'>
                <p className='text-sm my-2'>1. Review and Travellers <GrNext className='inline' /> 2. Payment</p>
                <div className='hotelbooking-main flex justify-between'>
                    <div className=' w-[70%] p-3 bg-white shadow rounded'>
                        <div className='flex justify-between items-center'>
                            <p className='font-bold text-xl'>{hotelBookingData.name}</p>
                            <p onClick={() => navigate('/hoteldetails')} className='text-sm text-blue-600'>[Change Hotel]</p>
                        </div>
                        <p className='text-sm text-gray-500 my-2'>{hotelBookingData.location}</p>
                        <div className='hotelbooking flex gap-5'>
                            <div>
                                <img className='rounded-md w-72 h-72' src={hotelBookingData.images[0]} alt="Hotel" />
                            </div>
                            <div className='w-9/12'>
                                <div className='bg-sky-50  flex rounded p-3'>
                                    <div className='w-1/4'>
                                        <p className='text-sm text-gray-500'>Check-In</p>
                                        <p className='font-bold my-1'>{guestDetails.checkIn.toLocaleDateString('en-US')}</p>
                                        <p className='text-sm text-gray-500'>{guestDetails.checkIn.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <div className='w-1/4'>
                                        <p className='text-sm text-gray-500'>Check-Out</p>
                                        <p className='font-bold my-1'>{guestDetails.checkOut.toLocaleDateString('en-US')}</p>
                                        <p className='text-sm text-gray-500'>{guestDetails.checkIn.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <div className='w-1/4'>
                                        <p className='text-sm text-gray-500'>Guest</p>
                                        <p className='font-bold my-1'>{guestDetails.room[0].adults} Adults,{guestDetails.room[0].children} Children</p>
                                        <p className='text-sm text-gray-500'>{guestDetails.roomCount} Room | {totalNights} Night(s)</p>
                                    </div>
                                </div>
                                <div className='border rounded-md border-blue-300 p-2 mt-5'>
                                    <div className='flex justify-between'>
                                        <p className='font-bold'>Room Type: {hotelBookingData.roomDetails.roomType} | {hotelBookingData.roomDetails.bedDetail}</p>
                                        <p onClick={() => navigate('/hoteldetails')} className='text-sm text-blue-600'>[Change Hotel]</p>
                                    </div>
                                    <p className='text-xs text-gray-500 py-2 border-b border-gray-200'>Breakfast included</p>
                                    <p className='font-bold text-sm my-2'>Cancellation Policy</p>
                                    <p className='text-xs text-gray-500 '>{hotelBookingData.roomDetails.cancellationPolicy}</p>
                                    <p className=' cursor-not-allowed text-xs text-blue-400 my-2'>View More</p>
                                    <p className='text-xs text-green-500 pt-2 border-t border-blue-300'>{hotelBookingData.roomDetails.cancellationPolicy}</p>
                                </div>
                            </div>
                        </div>
                        <div className='primaryparent rounded m-1 shadow-md'>
                            <div className='bg-blue-100 mt-3 text-sm flex items-end gap-2 p-2'>
                                <MdPeopleAlt className='text-xl' /> Primary Guest Details
                            </div>
                            <div className='primary p-2'>
                                {guestDetails && guestDetails.room && guestDetails.room.map((room, index) => {
                                    return <div key={index} className='border-l mb-5 pb-3 relative text-gray-600 pl-14 p-3 flex  justify-between items-center flex-wrap ml-14 border-gray-400'>
                                        <div className='w-[10%] font-bold'>Adult 1</div>
                                        <div className='w-[10%]'>
                                            <p className='text-sm'>Title</p>
                                            <select className='p-2 text-sm w-full border rounded-md'>
                                                <option>Mr.</option>
                                                <option>Mrs.</option>
                                                <option>Miss.</option>
                                            </select>
                                        </div>
                                        <div className='w-[30%]'>
                                            <p>First Name</p>
                                            <input className='p-1 w-full border rounded'></input>
                                        </div>
                                        <div className='w-[30%]'>
                                            <p>Last Name</p>
                                            <input className='p-1 border w-full rounded'></input>
                                        </div>
                                        <div className='border w-16 flex justify-center items-center text-xs h-16 bg-gray-50 rounded-full -left-8 absolute'>Room {index + 1}</div>
                                        {room.children == 1 && <div className='flex justify-between items-center w-full my-3'>
                                            <div className='w-[10%] font-bold'>Child 1</div>
                                            <div className='w-[10%]'>
                                                <p className='text-sm'>Title</p>
                                                <select className='p-2 text-sm w-full border rounded-md'>
                                                    <option>Master</option>
                                                    <option>Miss.</option>
                                                </select>
                                            </div>
                                            <div className='w-[30%]'>
                                                <p>First Name</p>
                                                <input className='p-1 w-full border rounded'></input>
                                            </div>
                                            <div className='w-[30%]'>
                                                <p>Last Name</p>
                                                <input className='p-1 border w-full rounded'></input>
                                            </div>

                                        </div>}
                                        {room.children == 2 && <div className='w-full'>
                                            <div className='flex justify-between items-center w-full my-3'>
                                                <div className='w-[10%] font-bold'>Child 1</div>
                                                <div className='w-[10%]'>
                                                    <p className='text-sm'>Title</p>
                                                    <select className='p-2 text-sm w-full border rounded-md'>
                                                        <option>Master</option>
                                                        <option>Miss.</option>
                                                    </select>
                                                </div>
                                                <div className='w-[30%]'>
                                                    <p>First Name</p>
                                                    <input className='p-1 w-full border rounded'></input>
                                                </div>
                                                <div className='w-[30%]'>
                                                    <p>Last Name</p>
                                                    <input className='p-1 border w-full rounded'></input>
                                                </div>

                                            </div>

                                            <div className='flex justify-between items-center w-full my-3'>
                                                <div className='w-[10%] font-bold'>Child 2</div>
                                                <div className='w-[10%]'>
                                                    <p className='text-sm'>Title</p>
                                                    <select className='p-2 text-sm w-full border rounded-md'>
                                                        <option>Mr.</option>
                                                        <option>Mrs.</option>
                                                        <option>Miss.</option>
                                                    </select>
                                                </div>
                                                <div className='w-[30%]'>
                                                    <p>First Name</p>
                                                    <input className='p-1 w-full border rounded'></input>
                                                </div>
                                                <div className='w-[30%]'>
                                                    <p>Last Name</p>
                                                    <input className='p-1 border w-full rounded'></input>
                                                </div>

                                            </div>
                                        </div>}
                                    </div>
                                })
                                }
                                <div>
                                    <div className='ml-10 w-[70%] border-b pb-4'>
                                        <p className='font-bold text-sm'>Contact Details</p>
                                        <div className='flex justify-between'>
                                            <div className='w-[49%]'>
                                                <p className='text-sm mt-2 mb-1'>Email ID</p>
                                                <input
                                                    type='email'
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={`border w-full p-1 rounded ${!isEmailValid ? 'border-red-500' : ''}`}
                                                    placeholder='Enter your email address'
                                                />
                                                {!isEmailValid && <p className='text-red-500 text-xs'>Invalid email address</p>}
                                            </div>
                                            <div className='w-[49%]'>
                                                <p className='text-sm mt-2 mb-1'>Mobile No</p>
                                                <div className='border rounded flex'>
                                                    <select
                                                        value={countryCode}
                                                        onChange={(e) => setCountryCode(e.target.value)}
                                                        className='w-14 py-1 border-r'
                                                    >
                                                        <option value='+91'>+91</option>
                                                        <option value='+44'>+44</option>
                                                        <option value='+66'>+66</option>
                                                        <option value='+1'>+1</option>
                                                        <option value='+971'>+971</option>
                                                    </select>
                                                    <input
                                                        type='text'
                                                        value={mobile}
                                                        onChange={(e) => setMobile(e.target.value)}
                                                        className={`w-full p-1 rounded ${!isMobileValid ? 'border-red-500' : ''}`}
                                                        placeholder='Enter Mobile No'
                                                    />
                                                </div>
                                                {!isMobileValid && <p className='text-red-500 text-xs'>Invalid mobile number</p>}
                                            </div>
                                        </div>
                                        <p className='text-xs text-400 my-1'>
                                            Your booking details will be sent to this email address and mobile number.
                                        </p>
                                    </div>
                                    <div className='ml-10 mt-2 flex'>
                                        <input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                                        <p className='text-sm ml-2 text-gray-500'>
                                            I understand and agree to the rules of this fare, the{' '}
                                            <span className='text-blue-400'>Terms & Conditions</span> and{' '}
                                            <span className='text-blue-400'>Privacy Policy of EaseMyTrip.</span>
                                        </p>
                                    </div>

                                </div>
                                <div onClick={handleHotelBooking} className='w-full my-6 flex justify-center'>
                                    <button className='bg-orange-500 font-bold text-white px-28 py-3 rounded-full text-sm'>Continue to Payment</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-[26%] sticky top-4 bg-white border h-56 shadow-lg rounded'>
                        <div className='bg-blue-100 text-sm flex font-bold items-end gap-2 p-2'>
                            <HiOutlineCurrencyRupee className='text-xl' /> Room Price Details
                        </div>
                        <div className=' mx-3 pb-1 pt-3 flex justify-between'>
                            <p className='text-sm font-semibold'>{guestDetails.roomCount} Rooms x {totalNights} Night(s)</p>
                            <p className='text-sm font-semibold'>{(hotelBookingData.roomDetails.costPerNight * totalNights * guestDetails.roomCount)}</p>
                        </div>
                        <div className='mx-3 py-1 flex border-b pb-2 justify-between'>
                            <p className='text-sm font-semibold text-blue-400'>Total Discount <MdInfoOutline className='inline' /></p>
                            <p className='text-sm font-semibold text-blue-400'>{(hotelBookingData.roomDetails.costDetails.discount)}</p>
                        </div>
                        <div className=' mx-3 py-2 flex border-b pb-2 justify-between'>
                            <p className='text-sm font-semibold'>Price after Discount</p>
                            <p className='text-sm font-semibold'>{(hotelBookingData.roomDetails.costPerNight * totalNights * guestDetails.roomCount - (hotelBookingData.roomDetails.costDetails.discount))}</p>
                        </div>
                        <div className=' mx-3 py-2 flex border-b pb-2 justify-between'>
                            <p className='text-sm font-semibold'>Taxes & Service Fees</p>
                            <p className='text-sm font-semibold'>{(hotelBookingData.roomDetails.costDetails.taxesAndFees * totalNights * guestDetails.roomCount)}</p>
                        </div>
                        <div className=' mx-3 py-2 flex font-bold text-orange-700 justify-between'>
                            <p>Grand Total</p>
                            <p>{(hotelBookingData.roomDetails.costDetails.taxesAndFees * totalNights * guestDetails.roomCount) + (hotelBookingData.roomDetails.costPerNight * totalNights * guestDetails.roomCount - (hotelBookingData.roomDetails.costDetails.discount))}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Bookhotel;
