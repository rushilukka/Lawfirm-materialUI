import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();

  return (
    <AppBar position="sticky" color="primary" elevation={4}>
      <Toolbar>
        <Container
          maxWidth="lg"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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
            {/* <Box
              component="span"
              style={{
                color: theme.palette.secondary.main, // Muted Blue
                fontWeight: 'bold',
                fontSize: '1.5rem',
                letterSpacing: '1px',
              }}
            >
              Law Firm
            </Box> */}
            
          </Box>

          {/* Navbar Links */}
          <Box style={{ display: 'flex', gap: '1rem' }}>
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
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
