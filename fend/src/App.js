// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import HomePage from './cmp/Home';
import AboutUs from './cmp/About';
import Services from './cmp/Service';
import NotFound from './cmp/NotFound';
import BookSlot from './cmp/Booking';
import Navbar from './cmp/Navbar';
import theme from './Theme/theme';
import Footer from './cmp/Footer';
import BookingDetails from './cmp/BookingDetails/Booking-Details';
import VerifyEmail from './cmp/VerifyEmail';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './cmp/PrivateRoute';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route
              path="/book-slot"
              element={
                <PrivateRoute>
                  <BookSlot />
                </PrivateRoute>
              }
            />
            <Route
              path="/booking-details"
              element={
                <PrivateRoute>
                  <BookingDetails />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer/>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
