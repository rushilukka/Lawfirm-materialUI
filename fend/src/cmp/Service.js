// src/components/Services.js
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { FaGavel, FaBuilding, FaShieldAlt, FaHome } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

const services = [
  { icon: <FaGavel />, title: 'Family Law', description: 'Expert advice on family matters.' },
  { 
    icon: <FaBuilding />, 
    title: 'Corporate Law', 
    description: 'Guidance for businesses and corporations.' 
  },
  { icon: <FaShieldAlt />, title: 'Criminal Defense', description: 'Strong representation in criminal cases.' ,
     
  },
  { 
    icon: <FaHome />, 
    title: 'Property Disputes', 
    description: 'Solutions for property-related issues.',
   },
];

const Services = () => {
  const theme = useTheme(); // Access the theme object
  return (
    <Box sx={{ padding: '40px' }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
              <Box sx={{ fontSize: '2rem', color:  theme.palette.custom.primary2  }}>{service.icon}</Box>
              <Typography variant="h6" gutterBottom>
                {service.title}
              </Typography>
              <Typography variant="body2">{service.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
