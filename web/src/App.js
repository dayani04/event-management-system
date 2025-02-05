import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Ensure react-router-dom is installed
import Events from './Pages/Event/Events';
import EventsBooking from './Pages/Event/EventsBooking';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminRegister from './Pages/Admin/AdminRegister';
import AdminEventDetails from './Pages/Admin/AdminEventDetails';
import Footer from './Components/Footer/Footer';
import HomePage from './Pages/HomePage/HomePage';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Events" element={<Events />} />
          {/* Updated route to include eventid */}
          <Route path="/book/:eventid" element={<EventsBooking />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminEventDetails" element={<AdminEventDetails />} />
          <Route path="/AdminRegister" element={<AdminRegister />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
