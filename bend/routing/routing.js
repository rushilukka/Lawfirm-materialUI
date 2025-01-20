const e = require('express');
const r = e.Router();
const userBookingSchema = require('../db-schema/userBookingSchema'); 
const nodemailer = require('nodemailer');

r.get('/', (req, res) => {
  res.send('Hello, World!');
});


r.post('/getAvailableSlot-Me-2', async (req, res) => {
  try {
    const { date } = req.body;
    console.log(date);

    const parserDate = new Date(date); // Parse the incoming date
    const startOfDay = new Date(parserDate.setHours(0, 0, 0, 0)); // Start of the day
    const endOfDay = new Date(parserDate.setHours(23, 59, 59, 999)); // End of the day

    console.log(startOfDay, endOfDay);

    // Query for all slots within the specified date range and fetch only 'slot' values
    const slots = await userBookingSchema.collection
      .find({ date: { $gte: startOfDay, $lte: endOfDay } }, { projection: { slot: 1, _id: 0 } }) // Project only 'slot'
      .toArray();

    const slotValues = slots.map((s) => s.slot[0]); // Extract slot values from the result
    console.log(slotValues);

    res.json(slotValues); // Return only slot values
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching slots." });
  }
});



// r.post('/getAvailableSlot-Me',async (req, res) =>{
//    try{

//     const {date} = req.body;
//     console.log(date);
//     const parserDate = new Date(date);
//     console.log(parserDate);
//     // await userBookingSchema.collection.find(newBooking);
//     const slots = await userBookingSchema.collection.find({ date: parserDate }).toArray();
//     console.log(slots);
//     res.json(slots);
//     // how in this i can connect to different db other than default test db
//    }
//    catch{

//    }
// });

r.post('/deleteEnteries', async (req, res) => {
 await userBookingSchema.deleteMany({});
})

// r.post('/getAvailableSlot-getsAllObj', async (req, res) => {
//   try {
//       const { date } = req.body;
//       console.log("Received date:", date);

//       const parserDate = new Date(date); // Parse the input date
//       if (isNaN(parserDate)) {
//           return res.status(400).json({ error: 'Invalid date format' });
//       }
//       console.log("Parsed date:", parserDate);

//       // Define the start and end of the day
//       const startOfDay = new Date(parserDate);
//       startOfDay.setUTCHours(0, 0, 0, 0);

//       const endOfDay = new Date(parserDate);
//       endOfDay.setUTCHours(23, 59, 59, 999);

//       // Query the database to find slots within the specified day
//       const slots = await userBookingSchema.collection
//           .find({ date: { $gte: startOfDay, $lt: endOfDay } })
//           .toArray();

//       console.log("booked slots:", slots);
//       res.json(slots);
//   } catch (error) {
//       console.error("Error fetching available slots:", error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

r.post('/deleteEnteries1', async (req, res) => {
  await userBookingSchema.deleteMany({});
 })
 
// r.post('/getAvailableSlot', async (req, res) => {
//   try {
//       const { date } = req.body;
//       console.log("Received date:", date);

//       const parserDate = new Date(date); // Parse the input date
//       if (isNaN(parserDate)) {
//           return res.status(400).json({ error: 'Invalid date format' });
//       }
//       console.log("Parsed date:", parserDate);

//       // Define the start and end of the day
//       const startOfDay = new Date(parserDate);
//       startOfDay.setUTCHours(0, 0, 0, 0);

//       const endOfDay = new Date(parserDate);
//       endOfDay.setUTCHours(23, 59, 59, 999);

//       // Query the database to find slots within the specified day
//       const bookings = await userBookingSchema.collection
//           .find({ date: { $gte: startOfDay, $lt: endOfDay } }, { projection: { slot: 1, _id: 0 } })
//           .toArray();

//       // Extract the slot values into an array
//       const slots = bookings.map(booking => booking.slot);

//       console.log("Booked slots:", slots);
//       res.json(slots);
//   } catch (error) {
//       console.error("Error fetching available slots:", error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// Route to handle booking creation


// Fetch booking records


r.post('/fetch-records', async (req, res) => {
  const { query, filter } = req.body;

  // Validate request
  if (!query || !filter) {
    return res.status(400).json({ message: 'Query and filter are required.' });
  }

  // Build filter condition
  let filterCondition = {};

  switch (filter.toLowerCase()) {
    case 'name':
      filterCondition = { name: { $regex: query, $options: 'i' } }; // Case-insensitive match
      break;
    case 'email':
      filterCondition = { email: query };
      break;
    case 'phone':
      filterCondition = { phone: query };
      break;
    case 'servicetype':
      filterCondition = { serviceType: query.toLowerCase() };
      break;
    case 'date':
      try {
        filterCondition = { date: new Date(query) };
      } catch {
        return res.status(400).json({ message: 'Invalid date format.' });
      }
      break;
    case 'pincode':
      filterCondition = { pincode: query };
      break;
    default:
      return res.status(400).json({ message: 'Invalid filter provided.' });
  }

  // Slot time mapping
  const slotMapping = {
    6: '6:00 to 6:45',
    7: '7:00 to 7:45',
    8: '8:00 to 8:45',
    9: '9:00 to 9:45',
  };

  try {
    // Fetch records from the database and sort by date in descending order
    const bookings = await userBookingSchema.find(filterCondition).sort({ date: -1 }); // -1 for descending order

    // Map the bookings and update the slot value with the corresponding time range
    const updatedBookings = bookings.map((booking) => {
      return {
        ...booking.toObject(), // Convert mongoose document to plain object
        slot: slotMapping[booking.slot] || booking.slot, // Map slot to time range
      };
    });

    // Respond to the client
    if (updatedBookings.length > 0) {
      res.status(200).json(updatedBookings);
    } else {
      res.status(404).json({ message: 'No bookings found for the given filter and query.' });
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings.' });
  }
});













r.post('/booking', async (req, res) => {
  const bookingData = req.body;

  // Create an instance of the model
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

  try {
    // Insert booking into the database
    await userBookingSchema.collection.insertOne(newBooking);

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Or use another email service
      auth: {
        user: 'Rushi.lukka.315', // Replace with your email
        pass: 'gofmpfbvzldxhosc', // Replace with your email password or app password
      },
    });

    // Email content
    const mailOptions = {
      from: 'rushi.lukka.315@gmail.com', // Sender address
      to: bookingData.email, // Receiver email
      subject: 'Booking Confirmation - Vidhigna Law Firm',
      html: `
        <p>Dear ${bookingData.name},</p>
        
        <p>Thank you for choosing <strong>Vidhigna Law Firm</strong> for your legal services.</p>
        
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
          <li>Phone: <a href="tel:+9428669848">9428669848</a></li>
          <li>Email: <a href="mailto:rushi.lukka.315@gmail.com">rushi.lukka.315@gmail.com</a></li>
        </ul>
        
        <p>We look forward to assisting you with your legal needs.</p>
        
        <p>Best regards,<br>
        <strong>Vidhigna Law Firm</strong></p>
      `,
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(201).json({ message: 'Booking created successfully and confirmation email sent!' });
  } catch (error) {
    console.error('Error while creating booking or sending email:', error);
    res.status(500).json({ message: 'Failed to create booking or send confirmation email.' });
  }
});

module.exports = r;