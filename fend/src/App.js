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

function App() {
  return (
    <ThemeProvider theme={theme}> {/* Apply the theme globally */}
      <Router>
        <Navbar /> {/* Add Navbar for navigation */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book-slot" element={<BookSlot />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
