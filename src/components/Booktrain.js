import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import liveStation from "../Assets/livestation.svg";
import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaTrainSubway } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import css from '../styles/Booktrain.css'

function Booktrain({ train, coach, setPaymentDetails }) {

    const [userId, setUserId] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');
    // console.log(train, coach);
    // console.log(coach);

    const navigate = useNavigate()

    const [adults, setAdults] = useState([]);
    const [children, setChildren] = useState([]);
    const [fare, setFare] = useState(0);

    const baseFare = 377;
    const tax = 0.0;
    const reservationCharge = 20;
    const superFastCharge = 30;

    useEffect(() => {
        calculateFare();
    }, [adults, children]);

    const handleAddAdult = () => {
        setAdults([...adults, { id: Date.now(), age: 0 }]);
    };

    const handleAddChild = () => {
        setChildren([...children, { id: Date.now(), age: 0 }]);
    };

    const handleRemoveAdult = (id) => {
        setAdults(adults.filter(adult => adult.id !== id));
    };

    const handleRemoveChild = (id) => {
        setChildren(children.filter(child => child.id !== id));
    };

    const handleAdultChange = (id, field, value) => {
        setAdults(adults.map(adult => adult.id === id ? { ...adult, [field]: value } : adult));
    };

    const handleChildChange = (id, field, value) => {
        setChildren(children.map(child => child.id === id ? { ...child, [field]: value } : child));
    };

    const calculateFare = () => {
        let totalFare = 0;

        totalFare += adults.length * coach.finalFare;
        children.forEach(child => {
            if (child.age >= 5) {
                totalFare += coach.finalFare;
            }
        });

        totalFare += tax + reservationCharge + superFastCharge;
        setFare(totalFare);
    };

    // const handleContinue = () => {
    //     if (adults.length === 0) {
    //         alert("Please add at least one adult");
    //         return;
    //     }
    //     setPaymentDetails({ fare: fare + reservationCharge + superFastCharge })
    //     navigate("/payment")
    // }

    const handleChange = (e) => {
        const value = e.target.value;
        setUserId(value);

        // Simple validation: User ID should not be empty and should match a specific pattern
        const pattern = /^[a-zA-Z0-9]+$/; // alphanumeric pattern as an example
        if (value === '') {
            setError('User ID cannot be empty');
            toast.error(error)
        } else if (!pattern.test(value)) {
            setError('User ID must be alphanumeric');
            toast.error(error)
        } else {
            setError('');
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (error === '' && userId !== '') {
            // Handle form submission
            toast.success("User ID saved successfully!")

            //   console.log('User ID:', userId);
        } else {
            setError('Please enter a valid User ID');
            toast.error(error)
        }
    };
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');

    const validateEmail = (value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    };

    const validateMobile = (value) => {
        const mobilePattern = /^[0-9]{10}$/;
        return mobilePattern.test(value);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        
    };

    const handleMobileChange = (e) => {
        const value = e.target.value;
        setMobile(value);
        
    };

    const handleContinue = (e) => {
        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address');
            return
        } else {
            setEmailError('');
        }
        if (!validateMobile(mobile)) {
            toast.error('Please enter a valid 10-digit mobile number');
            return
        } else {
            setMobileError('');
        }
        if (adults.length === 0) {
            toast.info("Please add at least one adult!");
            return;
        }
        if (!isChecked) {
            toast.info('You must agree to the terms and conditions');
            return;
          }
        setPaymentDetails({ fare: fare + reservationCharge + superFastCharge })
        if (emailError === '' && mobileError === '' && email !== '' && mobile !== '') {
            // Handle form submission
            console.log('Email:', email);
            console.log('Mobile:', mobile);
            navigate("/payment")

        } else {
            if (email === '') toast.error('Email is required');
            if (mobile === '') toast.error('Mobile number is required');
        }
    };
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        if (e.target.checked) {
            setError('');
        }
    };


    return (
        <div className="bg-sky-50">
            <div className="train-booking-main w-9/12 mx-auto flex justify-between p-4">
                <div className='w-[73%]'>
                    <nav className="text-sm text-blue-600 mb-4">
                        <a href="#" className="hover:underline">1. Review & Travellers</a> &gt;
                        <a href="#" className="hover:underline">2. Payment</a>
                    </nav>

                    <div className="bg-white rounded-lg shadow-md pb-1 mb-4">
                        <div className="flex items-center mb-4 bg-sky-200 p-2 text-sm">
                            <img src="https://placehold.co/40x40" alt="IRCTC Logo" className="mr-2" />
                            <h2 className="text-xl">IRCTC User Verification</h2>
                        </div>
                        <div className='irctc-id flex justify-between items-center mr-5'>
                            <div className="p-4 items-center mb-4">
                                <p className='text-sm font-bold '>IRCTC User Id</p>
                                <div className='flex w-72'>
                                    <input
                                        type="text"
                                        placeholder="User id is case sensitive"
                                        className="border-gray-500 border p-1 flex-grow text-sm outline-none"
                                        value={userId}
                                        onChange={handleChange}
                                    />
                                    <button onClick={handleSave} className="bg-blue-500 text-white px-3 text-sm">Save</button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className='text-sm font-semibold mb-1'>Haven't registered with IRCTC?</div>
                                <div className='flex'>
                                    <button className="border cursor-not-allowed border-blue-400 font-semibold text-sm text-blue-500 px-2 py-1 rounded-full mr-2">Create IRCTC Account</button>
                                    <button className="border cursor-not-allowed border-blue-400 font-semibold text-sm text-blue-500 px-2 py-1 rounded-full">Forgot IRCTC UserID</button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-100 p-2 px-4 text-xs mx-3 mb-3 rounded-full">
                            <span className="font-semibold">Important:</span> Kindly keep your IRCTC password handy. You will be asked to enter it after completing the booking process & payment.
                        </div>
                    </div>

                    <div className=" bg-white rounded-lg shadow-md">
                        <div className='flex justify-between bg-blue-200 items-center p-2'>
                            <div className="flex items-center">
                                <FaTrainSubway alt="Train Logo" className="mr-2 text-xl border-2 p-1 w-8 h-8 border-black rounded-full" />
                                <h2 className="text-xl">Train Details</h2>
                            </div>
                            <div className="text-right text-xs">
                                <p className="text-green-600">Availability Status: {train.availableSeats}</p>
                                <a href="#" className="text-blue-600 hover:underline">Refresh Availability</a>
                            </div>
                        </div>
                        <div className="train-details p-4 mb-4">
                            <h3 className="text-lg">{train.source} - {train.destination} | {train.daysOfOperation.join(", ")}</h3>
                            <div className='flex justify-between items-center mt-3'>
                                <div className='flex-col flex gap-1'>
                                    <a href="#" className="text-blue-600 text-sm my-1 hover:underline">{train.trainName}</a>
                                    <p className="font-semibold text-nowrap mb-1 text-sm">Train No: <span>{train.trainNumber}</span></p>
                                    <p className="font-semibold mb-1 text-sm">Class: <span>{coach.coachType}</span></p>
                                    <p className='text-sm'>Quota: <span className="text-green-600">General</span></p>
                                </div>
                                <div className="train-time relative justify-between items-center">
                                    <div className="flex justify-between pt-3 px-5">
                                        <p className="text-2xl font-bold">{train.arrivalTime}</p>
                                        <p className="text-2xl font-bold">{train.departureTime}</p>
                                    </div>
                                    <p className="text-sm justify-center text-gray-400 flex items-center">
                                        <GoDotFill /><p className=" hide">
                                        --------------------------------------------------------------------</p><span className="text-nowrap">----------------------------------------------------------</span>
                                        <GoDotFill />
                                        <FaTrainSubway className="text-center absolute border bg-white rounded-full h-7 border-gray-400 p-1 inline w-7" />
                                    </p>
                                    <div className="flex justify-between text-gray-500">
                                        <div className="text-center">
                                            <p className="text-sm">{train.source}</p>
                                            <p className="text-sm">{train.daysOfOperation[0]}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm">{train.destination}</p>
                                            <p className="text-sm">{train.daysOfOperation[train.daysOfOperation.length - 1]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-4 flex items-center justify-between rounded-md mb-4 text-xs font-bold">
                            <div className='w-full flex gap-1'>
                                <p htmlFor="boarding-station" className="block mb-2">Boarding Station - </p>
                                <p className="text-xs font-semibold">{train.source}</p>
                            </div>
                            <div className="flex justify-center relative items-center">
                                <div className='border-blue-400 -left-6 absolute border-2 rounded-full w-12 h-12 flex justify-center items-center bg-white '>
                                    <img className='w-7' src={liveStation} />
                                </div>
                                <button className="bg-blue-500 text-white px-7 py-2 text-nowrap rounded-full">Route & Schedule</button>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="rounded-lg shadow-md bg-white">
                            <div className="flex bg-blue-200 items-center space-x-2 p-2 mb-2">
                                <FaPhoneAlt aria-hidden="true" alt="phone" className="text-xl border-2 p-1 w-8 h-8 border-black rounded-full" />
                                <h2 className="font-semibold">Contact Information</h2>
                                <span className="text-sm text-gray-500">Your ticket will be sent to this email address</span>
                            </div>
                            <div className="grid p-4 grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Enter Your Email id <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            className="w-full border rounded-lg p-2 text-sm"
                                            placeholder="Email"
                                            value={email}
                                            onChange={handleEmailChange}
                                        />
                                        <TfiEmail aria-hidden="true" alt="email" className="absolute text-gray-300 text-2xl right-2 top-2" />
                                    </div>
                                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                                    <p className="text-xs text-gray-500 mt-1">Your email id will be used only for sending Train related communication.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Enter Your Mobile Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            className="w-full border rounded-lg p-2 text-sm"
                                            placeholder="Mobile Number"
                                            value={mobile}
                                            onChange={handleMobileChange}
                                        />
                                        <FiPhone aria-hidden="true" alt="phone" className="absolute text-gray-300 text-2xl right-2 top-2" />
                                    </div>
                                    {mobileError && <p className="text-red-500 text-xs mt-1">{mobileError}</p>}
                                    <p className="text-xs text-gray-500 mt-1">Your Mobile No. will be used to send Booking & Travel related communication.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-blue-200 mt-4 items-center space-x-2 p-2">
                            <MdOutlinePeopleAlt aria-hidden="true" alt="people" className="text-xl border-2 p-1 w-8 h-8 border-black rounded-full" />
                            <h2 className="font-semibold">Passenger(s) Details</h2>
                        </div>
                        <div className="p-4 bg-white shadow-lg">
                            {adults.map((adult, index) => (
                                <div key={adult.id} className="relative mb-4 bg-gray-100 p-4 rounded-lg">
                                    <button onClick={() => handleRemoveAdult(adult.id)} className="absolute top-0 right-0 p-2 text-red-600">
                                        <RiDeleteBin6Line className="text-2xl" />
                                    </button>
                                    <h3 className="text-md font-bold mb-2">Adult {index + 1}</h3>
                                    <div className="flex flex-wrap gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Name</label>
                                            <input type="text" className="w-full border rounded-lg p-2 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Age</label>
                                            <input type="number" className="w-full border rounded-lg p-2 text-sm" onChange={(e) => handleAdultChange(adult.id, 'age', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Gender</label>
                                            <select className="w-full border rounded-lg p-2 text-sm">
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {children.map((child, index) => (
                                <div key={child.id} className="relative mb-4 bg-gray-100 p-4 rounded-lg">
                                    <button onClick={() => handleRemoveChild(child.id)} className="absolute top-0 right-0 p-2 text-red-600">
                                        <RiDeleteBin6Line className="text-2xl" />
                                    </button>
                                    <h3 className="text-md font-bold mb-2">Child {index + 1}</h3>
                                    <div className="flex flex-wrap gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Name</label>
                                            <input type="text" className="w-full border rounded-lg p-2 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Age</label>
                                            <input type="number" className="w-full border rounded-lg p-2 text-sm" onChange={(e) => handleChildChange(child.id, 'age', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Gender</label>
                                            <select className="w-full border rounded-lg p-2 text-sm">
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button onClick={handleAddAdult} className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2">Add Adult</button>
                            <button onClick={handleAddChild} className="bg-blue-500 text-white px-4 py-2 rounded-full">Add Child</button>
                        </div>
                        <div class="space-y-4">
                            <div class="flex items-start space-x-2 p-4 bg-white rounded-lg shadow-lg">
                                <input type="checkbox" class="mt-1" />
                                <div>
                                    <p class="font-semibold">Use GST for this booking <span class="text-xs font-normal">(OPTIONAL)</span></p>
                                    <p class="text-xs">To claim credit of GST charged by Train/EaseMyTrip, please enter your company's GST number</p>
                                </div>
                            </div>

                            <div class="flex items-start space-x-2 p-4 bg-white rounded-lg shadow-lg">
                                <input type="checkbox" class="mt-1" />
                                <div>
                                    <p class="font-semibold">Additional Preferences <span class="text-xs font-normal">(Optional)</span></p>
                                </div>
                            </div>

                            <div class="p-4 bg-yellow-100 rounded-lg flex justify-between items-center">
                                <div>
                                    <p class="font-semibold text-sm">Travel Advisory for All Passengers</p>
                                    <p class="text-xs">Please check Travel Advisory by relevant authorities.</p>
                                </div>
                                <button class="text-xs cursor-not-allowed text-blue-600 bg-blue-100 px-3 py-1 rounded-full">View Guidelines</button>
                            </div>

                            <div class="flex items-start space-x-2 p-4 rounded-lg">
                                <input type="checkbox" class="mt-1" checked={isChecked}
                                    onChange={handleCheckboxChange} />
                                <div>
                                    <p class="text-xs">I understand and agree to the rules of this fare, and the <a href="#" class="text-blue-600  cursor-not-allowed">Terms & Conditions</a>, <a href="#" class=" cursor-not-allowed text-blue-600">Privacy Policy</a> and, <a href="#" class="text-blue-600  cursor-not-allowed">Cancellation and Refund Policy</a></p>
                                </div>
                            </div>
                            <div class="flex justify-center">
                                <button onClick={handleContinue} class="bg-orange-500 text-white px-20 py-2 text-lg rounded-full">Continue Booking</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white  rounded w-[26%] mt-9 h-60 shadow-md overflow-hidden">
                    <div className="bg-blue-200  p-3 flex items-center">
                        <img src="https://placehold.co/20x20" alt="currency symbol" className="mr-2" />
                        <h2 className="text-lg text-gray-700 ">Price Summary</h2>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between text-sm text-gray-600  mb-2">
                            <span>Single Passenger Fare</span>
                            <span>₹ {fare}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600  mb-2">
                            <span>Tax</span>
                            <span>₹ {tax}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600  mb-2">
                            <span>Reservation Charge</span>
                            <span>₹ {reservationCharge}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600  mb-2">
                            <span>SuperFast Charge</span>
                            <span>₹ {superFastCharge}</span>
                        </div>
                        <div className="flex justify-between font-semibold mt-4 border-t pt-2">
                            <span className="text-red-600 ">Grand Total</span>
                            <span className="text-red-600 ">₹{fare + reservationCharge + superFastCharge}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booktrain;
