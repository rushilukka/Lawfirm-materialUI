import React, { useState } from 'react';
import { TextField, Card, CardContent, Button, Container, Typography, Grid, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';

const BookingDetails = () => {
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
      const response = await fetch('http://localhost:5000/fetch-records', {
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
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Fetch Booking Records
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormLabel component="legend">Search By</FormLabel>
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
        <div style={{ marginTop: '2rem' }}>
          <Typography variant="h6" gutterBottom>
            Results:
          </Typography>
          {result.length > 0 ? (
            result.map((item, index) => {
              const bookingDate = new Date(item.date);
              const today = new Date();

              // Check if the booking date is greater than today's date
              const isUpcoming = bookingDate > today;

              return (
                <Card
                  key={index}
                  style={{
                    marginBottom: '1rem',
                    backgroundColor: !isUpcoming ? 'green' : 'transparent', // Set green background if the date is passed
                  }}
                >
                  <CardContent>
                    <Typography style={{ display: 'flex', justifyContent: 'center' }} variant="h6" color={isUpcoming ? 'primary' : 'white'}>
                      {isUpcoming ? 'Upcoming' : 'Completed'}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Name:</strong> {item.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Email:</strong> {item.email}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Phone:</strong> {item.phone}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Service Type:</strong> {item.serviceType}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Date:</strong> {bookingDate.toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Slot:</strong> {item.slot}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Typography variant="body1" color="textSecondary">
              No data found.
            </Typography>
          )}
        </div>
      ) : 
      <div style={{display:'flex',justifyContent:'center',margin:'20px'}}>
         <h2>
            
            no data found...
            </h2> 

      </div>
      
      }
    </Container>
  );
};

export default BookingDetails;
