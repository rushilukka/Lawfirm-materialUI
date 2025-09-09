const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Available slots
router.post('/available-slots', bookingController.getAvailableSlots);

// Delete all bookings
router.post('/delete-enteries', bookingController.deleteAllBookings);

// Search bookings
router.post('/fetch-records', bookingController.searchBookings);

// Create new booking
router.post('/create-booking', bookingController.createBooking);

module.exports = router;
