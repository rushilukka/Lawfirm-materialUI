const userBookingSchema = require('../db-schema/userBookingSchema');

const slotMapping = {
  6: '6:00 to 6:45',
  7: '7:00 to 7:45',
  8: '8:00 to 8:45',
  9: '9:00 to 9:45',
};

const nodemailer = require('nodemailer');

class BookingService {
  async createBooking(bookingData) {
    const newBooking = {
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      serviceType: bookingData.serviceType.toLowerCase(),
      date: new Date(bookingData.date),
      slot: bookingData.slot.charAt(0),
      address: bookingData.address,
      pincode: bookingData.pincode,
      caseBrief: bookingData.caseBrief,
    };

    // Insert booking into the database
    await userBookingSchema.collection.insertOne(newBooking);

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: bookingData.email,
      subject: `Booking Confirmation - ${process.env.APP_NAME}`,
      html: `
        <p>Dear ${bookingData.name},</p>

        <p>Thank you for choosing <strong>${process.env.APP_NAME}</strong> for your legal services.</p>

        <p>We are pleased to confirm your booking. Below are the details of your appointment:</p>
        <ul>
          <li><strong>Service Type:</strong> ${newBooking.serviceType}</li>
          <li><strong>Date:</strong> ${newBooking.date.toDateString()}</li>
          <li><strong>Slot:</strong> ${newBooking.slot}</li>
          <li><strong>Address:</strong> ${newBooking.address}</li>
          <li><strong>Pincode:</strong> ${newBooking.pincode}</li>
        </ul>
        
        <p>If you have any further questions or need assistance, feel free to contact us:</p>
        <ul>
          <li>Phone: <a href="tel:+${process.env.PHONE_NUMBER}">${process.env.PHONE_NUMBER}</a></li>
          <li>Email: <a href="mailto:${process.env.EMAIL_ID}">${process.env.EMAIL_ID}</a></li>
        </ul>
        
        <p>We look forward to assisting you with your legal needs.</p>
        
        <p>Best regards,<br>
        <strong>${process.env.APP_NAME}</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  }

  async getAvailableSlots(date) {
    const parsedDate = new Date(date);
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    const slots = await userBookingSchema.collection
      .find(
        { date: { $gte: startOfDay, $lte: endOfDay } },
        { projection: { slot: 1, _id: 0 } }
      )
      .toArray();

    return slots.map((s) => s.slot[0]);
  }

  async deleteAllBookings() {
    return await userBookingSchema.deleteMany({});
  }

  async searchBookings(query, filter) {
    const filterCondition = this._buildFilterCondition(query, filter);
    if (!filterCondition) return null;

    const bookings = await userBookingSchema.find(filterCondition).sort({ date: -1 });
    
    return bookings.map((booking) => ({
      ...booking.toObject(),
      slot: slotMapping[booking.slot] || booking.slot,
    }));
  }

  _buildFilterCondition(query, filter) {
    switch (filter.toLowerCase()) {
      case 'name':
        return { name: { $regex: query, $options: 'i' } };
      case 'email':
        return { email: query };
      case 'phone':
        return { phone: query };
      case 'servicetype':
        return { serviceType: query.toLowerCase() };
      case 'date':
        try {
          return { date: new Date(query) };
        } catch {
          return null;
        }
      case 'pincode':
        return { pincode: query };
      default:
        return null;
    }
  }
}

module.exports = new BookingService();
