// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import HomePage from './cmp/Home';
import AboutUs from './cmp/About';
import Services from './cmp/Service';
import BookSlot from './cmp/Booking';
import Navbar from './cmp/Navbar';
import theme from './Theme/theme'; // Import your custom theme
import Footer from './cmp/Footer';
import BookingDetails from './cmp/BookingDetails/Booking-Details';
function App() {
  return (
    <ThemeProvider theme={theme}> {/* Apply the theme globally */}
      <Router basename={process.env.PUBLIC_URL}>
        <Navbar /> {/* Add Navbar for navigation */}
         <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book-slot" element={<BookSlot />} />
          <Route path="/booking-details" element={<BookingDetails/>} />
        </Routes>
        <Footer/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
