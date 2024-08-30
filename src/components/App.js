import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = lazy(() => import("./Home"));
const Register = lazy(() => import('../pages/register'));
const Login = lazy(() => import('../pages/login'));
const Flights = lazy(() => import("./Flights"));
const Train = lazy(() => import("./Train"));
const Trainlistinfo = lazy(() => import("./Trainlistinfo"));
const Offers = lazy(() => import("./Offers"));
const Hotels = lazy(() => import("./Hotels"));
const Hoteldetails = lazy(() => import("./Hoteldetails"));
const Bookhotel = lazy(() => import("./Bookhotel"));
const Bookflight = lazy(() => import("./Bookflight"));
const Booktrain = lazy(() => import("./Booktrain"));
const Bus = lazy(() => import("./Bus"));
const Buseslist = lazy(() => import("./Buseslist"));
const PaymentComponent = lazy(() => import("./Payment"));
const TicketConfirmation = lazy(() => import("./TicketConfirmation"));

function App() {
  const [flightData, setFlightData] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [hotelBookingData, setHotelBookingData] = useState();
  const [guestDetails, setGuestDetails] = useState({});
  const [flightDetails, setFlightDetails] = useState({});
  const [passengerDetails, setPassengerDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const [trainData, setTrainData] = useState([]);
  const [busList, setBusList] = useState([]);
  const [train, setTrain] = useState({});
  const [coach, setCoach] = useState({});

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div className="h-screen w-screen flex justify-center items-center">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
  </div>}>
        <Routes>
          <Route path="/" element={<Home setPassengerDetails={setPassengerDetails} setSource={setSource} setDestination={setDestination} setFlightData={setFlightData}
          />} />
          <Route path="/flights" element={<Flights setFlightDetails={setFlightDetails} source={source} flightData={flightData} destination={destination}
          />} />
          <Route path="/bookflight" element={<Bookflight flightDetails={flightDetails} passengerDetails={passengerDetails} setPaymentDetails={setPaymentDetails} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ticketconfirm" element={<TicketConfirmation />} />
          <Route path="/register" element={<Register />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/bus" element={<Bus setBusList={setBusList} />} />
          <Route path="/buseslist" element={<Buseslist busList={busList} setPaymentDetails={setPaymentDetails} />} />
          <Route path="/payment" element={<PaymentComponent paymentDetails={paymentDetails} />} />
          <Route path="/railways" element={<Train setTrainData={setTrainData} />} />
          <Route path="/trainlistinfo" element={<Trainlistinfo trainData={trainData} setTrain={setTrain} setCoach={setCoach} />} />
          <Route path="/booktrain" element={<Booktrain train={train} coach={coach} setPaymentDetails={setPaymentDetails} />} />
          <Route path="/hotels" element={<Hotels setHotelList={setHotelList} setGuestDetails={setGuestDetails} />} />
          <Route path="/hoteldetails" element={<Hoteldetails hotelList={hotelList} setHotelBookingData={setHotelBookingData} />} />
          <Route path="/bookhotel" element={<Bookhotel hotelBookingData={hotelBookingData} guestDetails={guestDetails} setPaymentDetails={setPaymentDetails} />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
