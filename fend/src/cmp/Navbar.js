import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();

  return (
    <AppBar position="sticky" color="primary" elevation={4}>
      <Toolbar  style={{ minHeight: '100px' }}> {/* Increase height here */}
        <Container className='row'           maxWidth="lg"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor:'ActiveBorder'
          }}
        >
          {/* Image Logo */}
          <Box
            component={Link}
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              backgroundColor:'ButtonFace'
            }}
          >
            <img
              src="/" // Replace with your logo image path
              alt="Law Firm Logo"
              style={{
                height: '40px', // Adjust the height to your preference
                marginRight: '0.5rem',
              }}
            />
          </Box>

          {/* Contact Information */}
          <Box
           style={{  backgroundColor:"GrayText",
           display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Typography variant="body2" color="inherit">
              📞 +1 (234) 567-8901 {/* Replace with your phone number */}
            </Typography>
            <Typography variant="body2" color="inherit">
              ✉️ info@lawfirm.com {/* Replace with your email */}
            </Typography>
          </Box>

          {/* Navbar Links */}
          <Box style={{  backgroundColor:'ButtonHighlight',display: 'flex', gap: '1rem' }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 500,
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
              color="inherit"
              component={Link}
              to="/about"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 500,
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
              color="inherit"
              component={Link}
              to="/services"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 500,
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
              color="inherit"
              component={Link}
              to="/book-slot"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 500,
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
          <Box style={{  backgroundColor:'AppWorkspace',display: 'flex', gap: '1rem' }}>
            <Button
              color="inherit"
              component={Link}
              to="/disclaimer"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 500,
                '&:hover': {
                  color: theme.palette.accent.main,
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Disclaimer
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/login-signup"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 500,
                '&:hover': {
                  color: theme.palette.accent.main,
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Login / Signup
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
