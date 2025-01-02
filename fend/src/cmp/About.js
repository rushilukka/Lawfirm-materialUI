// src/components/AboutUs.js
import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const AboutUs = () => {
  return (
    <Container sx={{ padding: '40px' }}>
      <Typography variant="h3" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        We are a dedicated law firm with a mission to serve our clients with excellence
        and integrity. Our experienced team is here to guide you through every legal challenge.
      </Typography>
    </Container>
  );
};

export default AboutUs;
