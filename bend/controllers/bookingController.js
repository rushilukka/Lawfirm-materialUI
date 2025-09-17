const bookingService = require('../services/bookingService');

class BookingController {
  async createBooking(req, res) {
    try {
      await bookingService.createBooking(req.body);
      res.status(201).json({ message: 'Booking created successfully and confirmation email sent!' });
    } catch (error) {
      console.error('Error while creating booking or sending email:', error);
      res.status(500).json({ message: 'Failed to create booking or send confirmation email.' });
    }
  }

  async getAvailableSlots(req, res) {
    try {
      const { date } = req.body;
      if (!date) {
        return res.status(400).json({ error: "Date is required." });
      }

      const slots = await bookingService.getAvailableSlots(date);
      res.json(slots);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while fetching slots." });
    }
  }

  async deleteAllBookings(req, res) {
    try {
      await bookingService.deleteAllBookings();
      res.json({ message: "All bookings deleted successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while deleting bookings." });
    }
  }

  async searchBookings(req, res) {
    try {
      const useremail = req.user?.email;

      if (!useremail) {
        return res.status(401).json({ message: 'Authentication required.' });
      }

      // Always search by the authenticated user's phone/email
      const filter = useremail.includes('@') ? 'email' : 'phone';

      const bookings = await bookingService.searchBookings(useremail, filter);
      
      if (!bookings) {
        return res.status(400).json({ message: 'Invalid filter provided.' });
      }

      res.json(bookings);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while searching bookings." });
    }
  }
}

module.exports = new BookingController();
