import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillCreditCardFill } from "react-icons/bs";
import css from '../styles/Payment.css'
import { toast } from 'react-toastify';

const PaymentComponent = ({paymentDetails}) => {
    // console.log(paymentDetails.fare);
    const [openUPI, setOpenUPI] = useState(false);
    const [upi, setupi] = useState('');
    const [openDebit, setOpendebit] = useState(true);
    const [debitdata, setDebitdata] = useState({
        name: '',
        cardno: '',
        CVV: '',
        Expirymonth: '',
        Expiryyear: ''
    });
    const navigate = useNavigate();

    const handlePaymentfromUpi = () => {
        const token = sessionStorage.getItem('token')
        if(!token){
            navigate('/login')
            return
        }
        if (upi !== '' && upi.includes('@')) {
            console.log("UPI Payment Done");
            navigate('/ticketconfirm');
        } else {
            toast.error('Enter correct UPI');
        }
    };

    const handlePaymentfromDebit = () => {
        const token = sessionStorage.getItem('token')
        if(!token){
            navigate('/login')
            return
        }
        const isValidCardNo = debitdata.cardno.length === 16;
        const isValidCVV = debitdata.CVV.length === 3;
        const isValidMonth = /^\d{1,2}$/.test(debitdata.Expirymonth) && parseInt(debitdata.Expirymonth, 10) <= 12;
        const isValidYear = /^\d{1,2}$/.test(debitdata.Expiryyear) && parseInt(debitdata.Expiryyear, 10) >= new Date().getFullYear() % 100;
    
        if (isValidCardNo && isValidCVV && isValidMonth && isValidYear) {
            toast.success("Card Payment Done");
            navigate('/ticketconfirm');
        } else {
            toast.error('Enter correct card details');
        }
    };

    const handleInputChange = (e, field) => {
        setDebitdata({ ...debitdata, [field]: e.target.value });
    };

    return (
        <div className="payment-main-container px-16 rounded-lg pb-40 shadow-md ">
            <div className=" px-8 pt-3 border mt-10 rounded-lg shadow-md">
                <div className='tab-sec'>
                    <h1 className='font-bold text-black ml-5 mt-8 text-xl'>Payable amount: ₹{paymentDetails.fare}.00</h1>
                    <div className="paymentDetails flex gap-2  mx-auto p-5 rounded-lg">
                        <div className=' border-2 w-5/6 p-5 border-cyan-300 rounded-md'>
                            <p className='font-bold text-black text-2xl mb-3'>Payment</p>
                            <div className=' flex'>
                                <div className='border rounded mr-5 h-54 w-1/3'>
                                    <div className="border">
                                        <p className={`py-2 px-4 flex cursor-pointer ${openUPI ? 'font-bold bg-blue-300' : ' font-bold'}`} onClick={() => { setOpenUPI(!openUPI); setOpendebit(false) }}>
                                            <img src='https://cdn.icon-icons.com/icons2/2699/PNG/512/upi_logo_icon_170312.png' className='icon w-5 mr-2' alt="UPI" />
                                            UPI
                                        </p>
                                    </div>
                                    <div className="border">
                                        <p className={`px-4 py-2 cursor-pointer ${openDebit ? 'font-bold bg-blue-300' : ' font-bold '}`} onClick={() => { setOpendebit(!openDebit); setOpenUPI(false) }}><BsFillCreditCardFill className='icon inline mr-2 text-xl text-orange-600' />
                                            Credit / Debit card
                                        </p>
                                    </div>
                                </div>
                                <div className='w-2/3 '>
                                    {openUPI && (
                                        <div>
                                            <p className='font-bold mb-3 text-black text-xl'>Enter UPI</p>
                                            <input
                                                className="w-full py-2 px-4 bg-transparent text-black border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
                                                type="text"
                                                onChange={(e) => setupi(e.target.value)}
                                                value={upi}
                                                placeholder="Enter UPI"
                                            />
                                        </div>
                                    )}
                                    {openDebit && (
                                        <div className="credit border-blue-200 text-black rounded-md">
                                            <p className='font-bold text-xl text-black mb-3'>Enter Debit / Credit Card Details</p>
                                            <div className="mb-2">
                                                <input
                                                    className="w-full bg-transparent py-2 px-4 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
                                                    type="text"
                                                    maxLength={16}
                                                    value={debitdata.cardno}
                                                    onChange={(e) => handleInputChange(e, 'cardno')}
                                                    placeholder="Card no."
                                                />
                                            </div>
                                            <div className="flex mb-2">
                                                <input
                                                    className="expiry w-1/2 bg-transparent mr-2 py-2 px-4 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
                                                    type="text"
                                                    value={debitdata.Expirymonth}
                                                    onChange={(e) => handleInputChange(e, 'Expirymonth')}
                                                    placeholder="MM"
                                                />
                                                <input
                                                    className="expiry w-1/2 bg-transparent mr-2 py-2 px-4 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
                                                    type="text"
                                                    value={debitdata.Expiryyear}
                                                    onChange={(e) => handleInputChange(e, 'Expiryyear')}
                                                    placeholder="YY"
                                                />
                                                <input
                                                    className="expiry w-1/4 py-2 px-4 border border-blue-300 bg-transparent rounded-md focus:outline-none focus:border-blue-500"
                                                    type="text"
                                                    maxLength={3}
                                                    value={debitdata.CVV}
                                                    onChange={(e) => handleInputChange(e, 'CVV')}
                                                    placeholder="CVV"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    className="w-full py-2 bg-transparent px-4 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
                                                    type="text"
                                                    value={debitdata.name}
                                                    onChange={(e) => handleInputChange(e, 'name')}
                                                    placeholder="Cardholder name"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <div className="flex">
                                            {openUPI && (
                                                <button onClick={handlePaymentfromUpi} className="bg-orange-500 hover:bg-orange-600 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-full mr-2">
                                                    CONFIRM ORDER
                                                </button>
                                            )}
                                            {openDebit && (
                                                <button onClick={handlePaymentfromDebit} className="bg-orange-500 hover:bg-orange-600 hover:cursor-pointer font-bold py-2 px-4 text-white rounded-full">
                                                    CONFIRM ORDER
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentComponent;
