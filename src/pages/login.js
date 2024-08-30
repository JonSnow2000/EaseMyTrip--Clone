import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../providers/userProvider';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from './amzdeal.png';
import img2 from './emtcash.png';
import img3 from './freebooking.png';
import css from '../styles/Login.css';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

function Login() {
    const { onTokenHandler, onNameHandler } = useUser();
    const [passwordShow, setPasswordShow] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        appType: 'bookingportals' // Updated to match the API requirements
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)
  

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
                'https://academics.newtonschool.co/api/v1/bookingportals/login',
                formData,
                {
                    headers: {
                        projectID: '3fqlxt7o7trf'
                    }
                }
            );
            console.log(response);
            const { token, data } = response.data;
            onTokenHandler(token);
            onNameHandler(data.user.name);
            // Redirect to the page the user came from or the home page
            const redirectPath = location.state?.from?.pathname ;
            console.log(redirectPath);
            navigate(redirectPath);
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const registerHandler = () => {
        navigate('/register');
    };

    return (
        <div className="container pt-3 mt-10 flex justify-center items-center">
            <div className="mainDiv w-2/3 mb-20 items-end flex border rounded-3xl shadow-lg p-8">
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
                <div className='login-section pt-8 w-1/2 px-8 '>
                    <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>
                    {error && <div className="bg-red-500 px-4 py-2 mb-4 rounded">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-group">
                            <label htmlFor="email" className="block ">Enter your Email ID</label>
                            <input
                                type="email"
                                className="form-input bg-transparent border p-1 mt-1 block w-full rounded-md border-gray-300"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete='username'
                                name="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group relative">
                            <label htmlFor="password" className="block ">Enter your Password</label>
                            <input
                                type={passwordShow ? "text" : "password"}
                                className="form-input bg-transparent border p-1 mt-1 block w-full rounded border-gray-300"
                                value={formData.password}
                                autoComplete='current-password'
                                onChange={handleChange}
                                name="password"
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
                        
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl w-full"
                        >
                            Continue
                        </button>
                    </form>
                    <p onClick={registerHandler} className="text-lg mt-3 text-blue-500 underline cursor-pointer">
                        Create an account.
                    </p>
                </div>
                
            </div>
        </div>
    );
}

export default Login;
