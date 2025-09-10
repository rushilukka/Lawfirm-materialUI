import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { TextField, Card, CardContent, Button, Container, Typography, Grid, RadioGroup, FormControlLabel, Radio, FormLabel, Box, Alert } from '@mui/material';
import { API_BASE_URL, BOOKING_SERVICE } from '../../constants/constants';
import { useAuth } from '../../context/AuthContext';
import AuthService from '../../services/AuthService';

const BookingDetails = () => {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Regular expressions for phone and email validation
  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Effect to fetch user's bookings when authenticated
  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!isAuthenticated) return;

      const token = AuthService.getToken();
      if (!token) return;

      try {
        setLoading(true);
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        setUserInfo(tokenData);

        const response = await fetch(API_BASE_URL + BOOKING_SERVICE.SEARCH_BOOKINGS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({})  // No need to send query/filter, backend will use JWT data
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError(error.message);
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [isAuthenticated]);

  // No need for handleSearch anymore as we're automatically fetching user's bookings

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Your Booking History
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Typography>Loading your bookings...</Typography>
        </Box>
      )}
      {userInfo && (
        <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
          Logged in as: {userInfo.phoneOrEmail}
        </Alert>
      )}
      {result ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Bookings:
          </Typography>
          {Array.isArray(result) && result.length > 0 ? (
            result.map((item, index) => {
              const bookingDate = new Date(item.date);
              const today = new Date();

              // Check if the booking date is greater than today's date
              const isUpcoming = bookingDate > today;

              return (
                <Card
                  key={index}
                  sx={{
                    mb: 4,
                    backgroundColor: !isUpcoming ? 'success.main' : 'transparent',
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      align="center"
                      color={isUpcoming ? 'primary' : 'custom.white.main'}
                      sx={{ mb: 2 }}
                    >
                      {isUpcoming ? 'Upcoming' : 'Completed'}
                    </Typography>
                    {[
                      { label: 'Name', value: item.name },
                      { label: 'Email', value: item.email },
                      { label: 'Phone', value: item.phone },
                      { label: 'Service Type', value: item.serviceType },
                      { label: 'Date', value: bookingDate.toLocaleDateString() },
                      { label: 'Slot', value: item.slot }
                    ].map((field, fieldIndex) => (
                      <Typography 
                        key={fieldIndex} 
                        variant="subtitle1" 
                        sx={{ mb: 1 }}
                      >
                        <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                          {field.label}:
                        </Box>
                        {field.value}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Typography variant="body1" color="textSecondary">
              No data found.
            </Typography>
          )}
        </Box>
      ) : (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '200px',
            mt: 4
          }}
        >
          <Typography 
            variant="h5" 
            color="text.secondary"
            align="center"
          >
            No bookings found. Try a different search.
          </Typography>
        </Box>
      )
      }
    </Container>
  );
};

export default BookingDetails;
