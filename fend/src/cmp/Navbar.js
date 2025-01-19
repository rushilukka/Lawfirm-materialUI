import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { brown } from '@mui/material/colors';
import logo from './img/logo-adv1.png'
// import logo from './img/logo.png'
import Disclaimer from './Popup-Disclaimer';
// import * as React from 'react';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import BalanceIcon from '@mui/icons-material/Balance';

const Navbar = () => {
  const theme = useTheme();
  const GetAvailableSlot = async (newDate) => {
    try{ 
    
     const response = await fetch('http://localhost:5000/getAvailableSlot-Me-2',{
       method:'POST',
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
        date: new Date()
      }),
     });
     if (!response.ok) {
       throw new Error("Network response was not ok");
     }
 
     
     
    
    } 
   catch (error) {
     console.error("There has been a problem with your fetch operation:", error);
    }
   }
   
  return (
    <>
    <AppBar position="sticky" color="primary" elevation={4}>
      <Toolbar  style={{ height: '170px' }}> {/* Increase height here */}
           
          {/* Image Logo */}
          <Box
            className='col-md-3'
            component={Link}
            to="/"
            style={{
              height:'100%',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
             
            }}
          >
            <img
              src={logo} // Replace with your logo image path
              alt="Law Firm Logo"
              style={{
                height: '100%',
                width:'50%' ,// Adjust the height to your preference
                marginRight: '0.5rem',
              }}
            />
           
            <h1 style={{color:'white'}}>Vidhigna Law Firm</h1>
           </Box>
        
           <Box className='col-md-9' style={{ borderLeft: '1px solid white', 
             }}>
               
          {/* Contact Information */}
          <Box 
           style={{  
            borderBottom:'1px solid white',

            marginTop:'10px',
            marginLeft:'10px',
            marginBottom:'20px',
            display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Typography variant="body1" color="inherit">
              <CallIcon/> +91 9428669847 {/* Replace with your phone number */}
            </Typography>
            <Typography variant="body1  " color="inherit">
              <EmailIcon/> info@lawfirm.com {/* Replace with your email */}
            </Typography>
          </Box>

          {/* Navbar Links */}
          <Box style={{  margin:'5px',display: 'flex',  justifyContent: 'flex-end', gap: '1rem' }}>
           
            <Button
              color="inherit"
              variant="outlined"
               component={Link}
              to="/"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 1000,
                
                '&:hover': {
                  color: theme.palette.accent.main, // Gold for hover
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Home
            </Button>
            <Button
            variant="outlined"
              color="inherit"
              component={Link}
              to="/about"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 1000,
                '&:hover': {
                  color: theme.palette.accent.main,
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              About Us
            </Button>
            <Button
            variant="outlined"
              color="inherit"
              component={Link}
              to="/services"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 1000,
                '&:hover': {
                  color: theme.palette.accent.main,
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Services
            </Button>
            <Button
  variant="outlined"
  color="inherit"
  component={Link}
  to="/book-slot"
  onClick={GetAvailableSlot} // Attach the event handler here
  sx={{
    textTransform: 'capitalize',
    fontWeight: 1000,
    '&:hover': {
      color: theme.palette.accent.main,
      transform: 'scale(1.1)',
    },
    transition: 'all 0.3s ease-in-out',
  }}
>
  Book a Slot
</Button>

          </Box>

          {/* Disclaimer and Login/Signup Buttons */}
          <Box style={{  height:'40%',display: 'flex',justifyContent: 'flex-end' }}>
 

             <Button
              color="black"
              variant="contained"
              component={Disclaimer}
              
              style={{
                marginRight:'3px',
                marginTop:'10px',
                // marginBottom:'10px',
                border:'2px black',
                color:'black',
                backgroundColor:'gold',
                height:'100%',
              }}
              sx={{
                textTransform: 'capitalize',
                fontWeight: 1000,
                color:'black',  
                '&:hover': {
                  color: 'black',
                  transform: 'scale(1.1)',
                },  
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Disclaimer
            </Button>
            
           </Box>

          </Box>

        {/* </Container> */}
      </Toolbar>

    </AppBar>
     
</>
);
};

export default Navbar;
