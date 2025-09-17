const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');


const authMiddleware = require('../middleware/authMiddleware');

// Available slots (public)
router.post('/available-slots', bookingController.getAvailableSlots);

// Delete all bookings (protected)
router.post('/delete-enteries', authMiddleware, bookingController.deleteAllBookings);

// Search bookings (protected)
router.post('/fetch-records', authMiddleware, bookingController.searchBookings);

// Create new booking (protected)
router.post('/create-booking', authMiddleware, bookingController.createBooking);

module.exports = router;
