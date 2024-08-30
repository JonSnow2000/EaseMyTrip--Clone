import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from './amzdeal.png';
import img2 from './emtcash.png';
import img3 from './freebooking.png';
import { useUser } from '../providers/userProvider';
import css from '../styles/Register.css'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Register() {
    const navigate = useNavigate();
    const { onTokenHandler, onNameHandler } = useUser();
    const [passwordShow, setPasswordShow] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        appType: 'bookingportals'
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    
    const togglePasswordVisibility = () => {
        setPasswordShow(prevState => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post(
                'https://academics.newtonschool.co/api/v1/bookingportals/signup',
                formData,
                {
                    headers: {
                        projectID: '3fqlxt7o7trf'
                    }
                }
            );
            const { token, data } = response.data;
            onTokenHandler(token);
            console.log("okay report");
            onNameHandler(data.user.name);
            navigate('/')
        } catch (error) {
            setError('This email ID is already registered.');
        }
    };

    // Auto-swipe banner settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="container mt-10 w-full pt-5 bg-transparent flex justify-center mb-20 items-center">
            <div className="register shadow-md pl-8 py-4 justify-center border rounded-3xl w-2/3 flex items-end relative">
                <div className="image-slider w-1/2 mb-5 rounded-3xl bg-gradient-to-b from-blue-200 to-white">
                   
                    <Slider className='flex justify-center items-center' {...settings}>
                        <div>
                            <img src={img1} className='mx-auto mt-5' alt="Slide 1" />
                            <p className='text-center font-bold text-xl'>Amazing Discounts</p>
                            <p className='text-center'>Login And Enjoy Amazing Discounts On Travel Bookings.</p>
                        </div>
                        <div>
                            <img src={img2} className='mx-auto mt-5' alt="Slide 2" />
                            <p className='text-center font-bold text-xl'>Sign up & Earn</p>
                            <p className='text-center'>Sign Up And Get an exciting deals.</p>
                        </div>
                        <div>
                            <img src={img3} className='mx-auto mt-5' alt="Slide 3" />
                            <p className='text-center font-bold text-xl'>Hassle-Free Bookings</p>
                            <p className='text-center'>Sign-In And Enjoy Hassle-Free Bookings.</p>
                        </div>
                    </Slider>
                </div>

                <div className='signUp-section w-1/2 '>
                    

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className=" bg-white rounded-3xl px-8 pt-6">
                    <h2 className="text-2xl mb-3 text-center font-bold ">Create an account</h2>
                        {/* Rest of your form code */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block  text-sm mb-2">UserName</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow appearance-none bg-inherit border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="shadow appearance-none bg-inherit border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-sm mb-2">Password</label>
                            <input
                                type={passwordShow ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="shadow appearance-none bg-inherit border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your password"
                            />
                            <span className='absolute right-2 text-gray-600 top-[60%]'>
                                {passwordShow ? (
                                    <FaEyeSlash onClick={togglePasswordVisibility} />
                                ) : (
                                    <FaRegEye onClick={togglePasswordVisibility} />
                                )}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 w-full text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                                Continue
                            </button>
                        </div>
                    </form>
                    <p onClick={handleLogin} className="ml-8 mt-1 text-lg text-blue-500 underline cursor-pointer">
                    Already have an account?
                </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
