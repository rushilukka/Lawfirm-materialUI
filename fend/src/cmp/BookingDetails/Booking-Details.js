import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { TextField, Card, CardContent, Button, Container, Typography, Grid, RadioGroup, FormControlLabel, Radio, FormLabel, Box, Alert } from '@mui/material';
import { API_BASE_URL, BOOKING_SERVICE } from '../../constants/constants';

const BookingDetails = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Regular expressions for phone and email validation
  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleSearch = async () => {
    // Validate query based on selected filter
    if (filter === 'phone' && !phoneRegex.test(query)) {
      setError('Please enter a valid phone number (exactly 10 digits).');
      return;
    }
    if (filter === 'email' && !emailRegex.test(query)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(''); // Clear error if validation passes

    try {
      const response = await fetch(API_BASE_URL + BOOKING_SERVICE.SEARCH_BOOKINGS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, filter }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch records');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching records:', error);
      setResult(null);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Fetch Booking Records
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormLabel component="legend" sx={{ mb: 1 }}>Search By</FormLabel>
          <RadioGroup
            row
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <FormControlLabel value="phone" control={<Radio />} label="Phone" />
            <FormControlLabel value="name" control={<Radio />} label="Name" />
            <FormControlLabel value="email" control={<Radio />} label="Email" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={`Enter ${filter ? filter.charAt(0).toUpperCase() + filter.slice(1) : ''}`}
            variant="outlined"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={!filter} // Disable text field until a filter is selected
            error={!!error}
            helperText={error} // Display error message
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSearch}
            disabled={!query || !filter} // Disable button until both filter and query are provided
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {result ? (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h6" gutterBottom>
            Results:
          </Typography>
          {result?.bookings?.length > 0 ? (
            result.bookings.map((item, index) => {
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
