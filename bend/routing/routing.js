const e = require('express');
const r = e.Router();
const userBookingSchema = require('../db-schema/userBookingSchema'); 
 
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



r.post('/getAvailableSlot-Me',async (req, res) =>{
   try{

    const {date} = req.body;
    console.log(date);
    const parserDate = new Date(date);
    console.log(parserDate);
    // await userBookingSchema.collection.find(newBooking);
    const slots = await userBookingSchema.collection.find({ date: parserDate }).toArray();
    console.log(slots);
    res.json(slots);
    // how in this i can connect to different db other than default test db
   }
   catch{

   }
});
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


r.post('/getAvailableSlot', async (req, res) => {
  try {
      const { date } = req.body;
      console.log("Received date:", date);

      const parserDate = new Date(date); // Parse the input date
      if (isNaN(parserDate)) {
          return res.status(400).json({ error: 'Invalid date format' });
      }
      console.log("Parsed date:", parserDate);

      // Define the start and end of the day
      const startOfDay = new Date(parserDate);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(parserDate);
      endOfDay.setUTCHours(23, 59, 59, 999);

      // Query the database to find slots within the specified day
      const bookings = await userBookingSchema.collection
          .find({ date: { $gte: startOfDay, $lt: endOfDay } }, { projection: { slot: 1, _id: 0 } })
          .toArray();

      // Extract the slot values into an array
      const slots = bookings.map(booking => booking.slot);

      console.log("Booked slots:", slots);
      res.json(slots);
  } catch (error) {
      console.error("Error fetching available slots:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

r.post('/booking', async (req, res) => {
   const bookingData = req.body;

  // Create an instance of the model
  const newBooking =
  {
    name: bookingData.name,
    email: bookingData.email,
    phone: bookingData.phone,
     serviceType : bookingData.serviceType.toLowerCase(),
    date: new Date(bookingData.date),
    slot: bookingData.slot.charAt(0),
    address: bookingData.address,
    pincode: bookingData.pincode,
    caseBrief: bookingData.caseBrief,
   
}

await userBookingSchema.collection.insertOne(newBooking);
  
  res.status(201).json({ message: "Booking created successfully!" });
  

});   
module.exports = r;