// src/components/ConfirmationPage.js
import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const ConfirmationPage = ({ bookingDetails }) => {
  return (
    <Box sx={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
      <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Booking Confirmed!
        </Typography>
        <Typography variant="body1">
          Thank you, {bookingDetails.clientName}, for booking with us.
        </Typography>
        <Typography variant="body2" sx={{ margin: '10px 0' }}>
          Slot: {bookingDetails.date} at {bookingDetails.time}
        </Typography>
        <Typography variant="body2">
          Payment Status: {bookingDetails.paymentStatus}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ConfirmationPage;
