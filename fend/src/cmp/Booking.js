// src/cmp/Booking.js
import React, { useState,useEffect } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Booking.css'
import BookingSlot from './Booking-Slot'
import PopupDispMsg from './Popup-DispMsg'
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Container,
  Box,
} from '@mui/material';

const Booking = () => {
  
  const [loader,setLoader] = useState(false);
  //useState----------------------------------------------------
  const[dispMsg,setDispMsg] = useState("");
  const[bookedSlot,setBookedSlot] = useState([]);
  const [slotDetails,setslotDetails] = useState([
    { value: "6:00-6:45", disabled: false },
    { value: "7:00-7:45", disabled: false },
    { value: "8:00-8:45", disabled: false },
    { value: "9:00-9:45", disabled: false },
  ])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null,
    slot: '',
    address: '',
    pincode: '',
    serviceType: '',
    caseBrief: '',
  });

  
  //useEffect----------------------------------------------------
  useEffect(() => {
    // Update the slotDetails state based on bookedSlot
    const updatedSlots = slotDetails.map((slot) => {
      // const firstCharacter = parseInt(slot.value[0], 10); // Get the first character as a number
      const firstCharacter = slot.value[0]; // Get the first character as a number
      return {
        ...slot,
        disabled: bookedSlot.includes(firstCharacter),
      };
    });
    setslotDetails(updatedSlots);
    }, [bookedSlot]); // Run when bookedSlot changes
  
  
   
  //functions----------------------------------------------------
  const calculateMaxDate = () => {
    const today = new Date();
    let remainingDays = 5; // 4 working days limit
    let tempDate = new Date(today);
  
    while (remainingDays > 0) {
      tempDate.setDate(tempDate.getDate() + 1);
      const day = tempDate.getDay();
      // Check if it is a working day (Mon-Fri)
      if (day !== 0 && day !== 6) {
        remainingDays -= 1;
      }
    }
    return tempDate;
  };

  const handleChange = (event) => {

       const { name, value } = event.target;
    
      // Validate phone number
      if (name === 'phone') {
        if (!/^\d{0,10}$/.test(value)) {
          return; // Prevent invalid input (more than 10 digits or non-numeric characters)
        }
    
    
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = async (newDate) => {
    setFormData((prevData) => ({
      ...prevData,
      date: newDate, // Update the date field in the form data
    }));
    console.log(newDate);
    // Call GetAvailableSlot after updating the date
      setLoader(true); 
      // Show loader while fetching data
      await GetAvailableSlot(newDate);
      setLoader(false); 
      // Hide loader after fetching data
   };

  const filterDate = (date) =>{
    // let date = formData.date;
    // Parse the date string into a Date object (if it is a string)
     if (typeof date === "string") {
       date = new Date(date);
     }
     // Check if date is a valid Date object
     if (isNaN(date)) {
       console.error("Invalid date format");
       return;
     }
     // Get the date components in "dd-mm-yyyy" format
     const day = String(date.getDate()).padStart(2, "0");
     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
     const year = date.getFullYear();
    //  const formattedDate = `${day}-${month}-${year}`;
     const formattedDate = new Date(`${year}-${month}-${day}`);
    
    //  const selectedDate = new Date(datePickerValue); // From DatePicker
const formattedDate1 = formattedDate.toISOString().split("T")[0]; // Get 'YYYY-MM-DD'
// Save formattedDate to the database

    //  formData.date = formattedDate;

    return formattedDate1;
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if the phone number is valid
    if (!/^\d{10}$/.test(formData.phone)) {
      setDispMsg("Phone number must be exactly 10 digits.");
      return;
    }
  
    if (formData.slot === "") {
      setDispMsg("Please select a slot.");
      return;
    }
  
    // Proceed with the rest of the submission logic
    formData.date = filterDate(formData.date);
    try {
      const response = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        // Reset form data after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: null,
          slot: '',
          address: '',
          pincode: '',
          serviceType: '',
          caseBrief: '',
        });
        setDispMsg("");
      }
  
      const res = await response.json();
      if (response.ok) setDispMsg("Booking Done!");
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  };
  
//--------------Slot check avaialble------------------------
  const handleSlotChange = (newSlot) => {
    setFormData((prevData) => ({
    ...prevData,
    slot: newSlot, // Update the date field in the form data
  }));
  console.log("Selected Slot:", slot); // For debugging
  };
 
  const GetAvailableSlot = async (newDate) => {
    try{ 
    
    //  const response = await fetch('http://localhost:5000/deleteEnteries',{
     const response = await fetch('http://localhost:5000/getAvailableSlot-Me-2',{
       method:'POST',
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
        date: newDate
      }),
     });
     if (!response.ok) {
       throw new Error("Network response was not ok");
     }
 
     const data = await response.json();
     
     
     const day = String(formData.date.getDate()).padStart(2, "0");
     const month = String(formData.date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
     const year = formData.date.getFullYear();
       if(data.length >3 ) setDispMsg(`No slot available on ${day}/${month}/${year}`) 
     setBookedSlot(data);
    } 
   catch (error) {
     console.error("There has been a problem with your fetch operation:", error);
    }
   }
   const { name, address, email, phone, serviceType, date, slot, caseBrief,pincode } = formData;




   return (
    <>
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Get an Appointment
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          />
        <TextField
          label="Email *"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          fullWidth
          />
        <TextField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          required
          fullWidth
          />
  <div
   style={{
     display: 'flex',
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     zIndex: '11',
     width: '534px', // Adjust width for a better UI
     padding: '1rem',
     margin: '1rem auto',
     backgroundColor: '#ffffff', // Light background
     borderRadius: '2px', // Rounded corners
    }}
>
   
      <FormControl  required  style={{
            width:'60%',
            paddingRight:'10%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }} >
        <label style={{ marginTop: '0rem',color: '#333'}}>
            
          Select Appointment Date
        </label>

        <DatePicker
          placeholderText="Select Date"
          className="custom-datepicker-container"
          inputClassName="custom-datepicker-input"
          minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
          maxDate={calculateMaxDate()}
          dateFormat="dd/MM/yyyy"
          selected={formData.date}
          onChange={handleDateChange}
          required
          filterDate={(date) => {
            const day = date.getDay();
            return day !== 0 && day !== 6; // Allow only weekdays
            
          }}
        />
        <Button   onClick={GetAvailableSlot} variant="contained" color="primary">
          Check available slot
        </Button>
      </FormControl>
        {/* <div>{formData.date.toLocaleDateString()}</div> */}
       
{/* ----------------------------------------------------*/}
        {/* {formData.date && <div>{formData.date.toLocaleDateString()}</div>}  */}
{/* ----------------------------------------------------*/}
      <FormControl
      required
      style={{
        width: "40%",
        paddingLeft: "10%",
      }}
    >
      <BookingSlot onSlotChange={handleSlotChange} slotDetails={slotDetails} required/>
      {/* <p>Selected Slot in Parent: {formData.slot}</p> */}
    </FormControl>
</div>
        
{/* ----------------------------------------------------*/}
       
       
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          fullWidth
        />

        <FormControl fullWidth required>
          <InputLabel id="service-type-label">Type of Service</InputLabel>
          <Select
            labelId="service-type-label"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
          >
            <MenuItem value="Civil">Civil</MenuItem>
            <MenuItem value="Criminal">Criminal</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Brief About Case (Optional)"
          name="caseBrief"
          value={formData.caseBrief}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />
       
      
           
     
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Get an Appointment
        </Button>
           
          <PopupDispMsg msg={dispMsg}/>
       </Box>
    </Container>
    </>
  );
};

export default Booking;
