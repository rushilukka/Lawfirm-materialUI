import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Container, 
  Box, 
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  ListItemButton,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from './img/logo-adv1.png';
import Disclaimer from './Popup-Disclaimer';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'About Us', path: '/about' },
    { text: 'Services', path: '/services' },
    { text: 'Bookings', path: '/booking-details' },
    { text: 'Book a Slot', path: '/book-slot' },
  ];

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.text} disablePadding>
            <ListItemButton
              component={Link}
              to={link.path}
              onClick={handleDrawerToggle}
              sx={{
                py: 1.5,
                '&:hover': {
                  bgcolor: theme.palette.accent.main,
                  color: 'black',
                },
              }}
            >
              <ListItemText primary={link.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            component={Disclaimer}
            sx={{
              py: 1.5,
              mt: 2,
              bgcolor: 'gold',
              color: 'black',
              '&:hover': {
                bgcolor: theme.palette.accent.main,
              },
            }}
          >
            <ListItemText primary="Disclaimer" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={4}>
        <Toolbar sx={{ 
          flexDirection: 'column',
          height: { xs: 'auto', md: '170px' },
          py: { xs: 2, md: 0 }
        }}>
          <Container maxWidth="xl" sx={{ width: '100%' }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}>
              {/* Logo Section */}
              <Box
                component={Link}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  flex: { xs: '1', md: '0 0 auto' }
                }}
              >
                <img
                  src={logo}
                  alt="Law Firm Logo"
                  style={{
                    height: isMobile ? '60px' : '120px',
                    width: 'auto',
                    marginRight: '0.5rem',
                  }}
                />
                <Typography 
                  variant={isMobile ? "h6" : "h4"} 
                  component="h1" 
                  color="white"
                  sx={{ 
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  Vidhigna Law Firm
                </Typography>
              </Box>

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  ml: 3,
                  borderLeft: '1px solid white',
                  pl: 3
                }}>
                  {/* Contact Information */}
                  <Box sx={{
                    display: 'flex',
                    gap: 3,
                    mb: 2,
                    borderBottom: '1px solid white',
                    pb: 2
                  }}>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CallIcon /> +91 9428669847
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon /> info@lawfirm.com
                    </Typography>
                  </Box>

                  {/* Navigation Links */}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 2,
                    mb: 2
                  }}>
                    {navLinks.map((link) => (
                      <Button
                        key={link.text}
                        color="inherit"
                        variant="outlined"
                        component={Link}
                        to={link.path}
                        sx={{
                          textTransform: 'capitalize',
                          fontWeight: 700,
                          '&:hover': {
                            color: theme.palette.accent.main,
                            transform: 'scale(1.05)',
                          },
                          transition: 'all 0.2s ease-in-out',
                        }}
                      >
                        {link.text}
                      </Button>
                    ))}
                  </Box>

                  {/* Disclaimer Button */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      component={Disclaimer}
                      sx={{
                        bgcolor: 'gold',
                        color: 'black',
                        textTransform: 'capitalize',
                        fontWeight: 700,
                        '&:hover': {
                          bgcolor: theme.palette.accent.main,
                          transform: 'scale(1.05)',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      Disclaimer
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
