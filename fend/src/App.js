// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import HomePage from './cmp/Home';
import AboutUs from './cmp/About';
import Services from './cmp/Service';
import BookSlot from './cmp/Booking';
import Navbar from './cmp/Navbar';
import theme from './Theme/theme';
import Footer from './cmp/Footer';
import BookingDetails from './cmp/BookingDetails/Booking-Details';
import Login from './cmp/Login';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './cmp/PrivateRoute';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
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
          </Routes>
          <Footer/>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
