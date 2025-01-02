// src/components/HomePage.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import { FaBalanceScale } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
 

const HomePage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '50px',
         color: theme.palette.custom.primary2 ,
        background: "accent" ,
        minHeight: '100vh',
      }}
    >
      <FaBalanceScale size={50} style={{ marginBottom: '20px' }} />
      <Typography variant="h2" gutterBottom>
        Welcome to Law Firm  
      </Typography>
      <Typography variant="h6">
        We provide expert legal solutions tailored to your needs.
      </Typography>
    </Box>
  );
};

export default HomePage;
