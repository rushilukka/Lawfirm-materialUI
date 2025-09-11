import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BookingSlot from './Booking-Slot';
import PopupDispMsg from './Popup-DispMsg';
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
  Paper,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
  Grid,
  CircularProgress
} from '@mui/material';
import { API_BASE_URL, BOOKING_SERVICE } from '../constants/constants';
import AuthService from '../services/AuthService';

const Booking = () => {
  const theme = useTheme();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  //useState----------------------------------------------------
  const [dispMsg, setDispMsg] = useState("No Notification");
  const [bookedSlot, setBookedSlot] = useState([]);
  const [slotDetails, setslotDetails] = useState([
    { value: "6:00-6:45", disabled: true },
    { value: "7:00-7:45", disabled: true },
    { value: "8:00-8:45", disabled: true },
    { value: "9:00-9:45", disabled: true },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: null,
    slot: '',
    address: '',
    pincode: '',
    serviceType: '',
    caseBrief: '',
  });

  // Form validation states
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    pincode: ''
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
    }, [bookedSlot, formData.date]); // Run when bookedSlot changes

  
   
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

  const validateField = (name, value) => {
    switch (name) {
      case 'phone':
        return /^\d{10}$/.test(value) 
          ? '' 
          : 'Phone number must be exactly 10 digits';
      case 'pincode':
        return /^\d{6}$/.test(value) 
          ? '' 
          : 'Pincode must be exactly 6 digits';
      case 'name':
        return value.length >= 2 
          ? '' 
          : 'Name must be at least 2 characters long';
      default:
        return '';
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    // Special handling for phone number input
    if (name === 'phone' && !/^\d{0,10}$/.test(value)) {
      return; // Prevent invalid input
    }

    // Special handling for pincode input
    if (name === 'pincode' && !/^\d{0,6}$/.test(value)) {
      return; // Prevent invalid input
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field if it's one of the required fields
    if (['name', 'email', 'phone', 'pincode'].includes(name)) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleDateChange = async (newDate) => {
    await GetAvailableSlot(newDate);
    setFormData((prevData) => ({  
      ...prevData,
      date: newDate, // Update the date field in the form data
    }));
    console.log("newDate:--------------------", newDate);
    // Call GetAvailableSlot after updating the date
        // Show loader while fetching data
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

    // Validate all fields
    const validationErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      pincode: validateField('pincode', formData.pincode)
    };

    // Check if there are any validation errors
    const hasErrors = Object.values(validationErrors).some(error => error !== '');
    if (hasErrors) {
      setErrors(validationErrors);
      setSnackbarMessage('Please fix the errors in the form');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
      return;
    }

    // Check if date and slot are selected
    if (!formData.date) {
      setSnackbarMessage('Please select an appointment date');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
      return;
    }

    if (!formData.slot) {
      setSnackbarMessage('Please select a time slot');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
      return;
    }

    if (!formData.serviceType) {
      setSnackbarMessage('Please select a service type');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
      return;
    }

    setIsLoading(true);

    try {
      // Get email from JWT token
      const userToken = AuthService.getToken();
      const tokenData = userToken ? JSON.parse(atob(userToken.split('.')[1])) : null;
      
      if (!userToken || !tokenData || !tokenData.email) {
        throw new Error('Please login to book an appointment');
      }

      // Format date for submission and include email from token
      const formattedData = {
        ...formData,
        date: filterDate(formData.date),
        email: tokenData.email.includes('@') ? tokenData.email : ''
      };


      // Attach JWT token to booking API call
      const apiToken = localStorage.getItem('authToken');
      const response = await fetch(API_BASE_URL + BOOKING_SERVICE.CREATE_BOOKING, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiToken ? { 'Authorization': `Bearer ${apiToken}` } : {})
        },
        body: JSON.stringify(formattedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Booking failed");
      }

      // Reset form on success
      setFormData({
        name: '',
        phone: '',
        date: null,
        slot: '',
        address: '',
        pincode: '',
        serviceType: '',
        caseBrief: '',
      });

      setSnackbarMessage('Appointment booked successfully!');
      setSnackbarSeverity('success');
      setShowSnackbar(true);
      setDispMsg("Booking Done!");

    } catch (error) {
      console.error("Booking error:", error);
      setSnackbarMessage(error.message || 'Failed to book appointment. Please try again.');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };
  
//--------------Slot check avaialble------------------------
  const handleSlotChange = (newSlot) => {
    setFormData((prevData) => ({
    ...prevData,
    slot: newSlot, // Update the date field in the form data
  }));

  };
 
const GetAvailableSlot = async (newDate) => {
  try{

    const response = await fetch(API_BASE_URL + BOOKING_SERVICE.GET_AVAILABLE_SLOTS, {
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

    // Use newDate directly
    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();

    if (Array.isArray(data) && data.length > 3) {
      setDispMsg(`No slot available on ${day}/${month}/${year}`);
    }

    // Expecting 'data' to be an array of booked slot values like ["6:00-6:45", ...]
    setBookedSlot(data);
    } 
   catch (error) {
     console.error("There has been a problem with your fetch operation:", error);
  }
   }
   
   const { name, address, email, phone, serviceType, date, slot, caseBrief,pincode } = formData;




  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CircularProgress />
            <Typography>Processing your request...</Typography>
          </Paper>
        </Box>
      )}

      <Container 
        maxWidth="md" 
        sx={{ 
          mt: { xs: 4, sm: 6, md: 8 },
          mb: { xs: 4, sm: 6, md: 8 }
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2
          }}
        >
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
              mb: { xs: 3, sm: 4 }
            }}
          >
            Get an Appointment
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: { xs: 2, sm: 3 } 
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name}
                  sx={{ mb: { xs: 2, sm: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  required
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  fullWidth
                  error={!!errors.pincode}
                  helperText={errors.pincode}
                />
              </Grid>
            </Grid>

            <Paper 
              elevation={1} 
              sx={{ 
                p: { xs: 2, sm: 3 },
                mt: 2,
                backgroundColor: 'background.default'
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      Select Appointment Date
                    </Typography>
                    <DatePicker
                      placeholderText="Select Date"
                      className="custom-datepicker-container"
                      wrapperClassName="datepicker-wrapper"
                      minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                      maxDate={calculateMaxDate()}
                      dateFormat="dd/MM/yyyy"
                      selected={formData.date}
                      onChange={handleDateChange}
                      required
                      filterDate={(date) => {
                        const day = date.getDay();
                        return day !== 0 && day !== 6;
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <BookingSlot
                    onSlotChange={handleSlotChange}
                    slotDetails={slotDetails}
                    isDateSelected={Boolean(formData.date)}
                  />
                </Grid>
              </Grid>
            </Paper>

            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={2}
              fullWidth
              sx={{ mt: 2 }}
            />

            <FormControl fullWidth required sx={{ mt: 2 }}>
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
              sx={{ mt: 2 }}
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
              sx={{ 
                mt: 3,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Book Appointment
            </Button>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <PopupDispMsg msg={dispMsg}/>
    </>
  );
};

export default Booking;
