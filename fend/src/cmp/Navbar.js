import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ListItemButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

import logo from '../img/logo-adv1.png';
import DisclaimerPortal from './Popup-Disclaimer';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const disclaimerRef = React.useRef();
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'About Us', path: '/about' },
    { text: 'Services', path: '/services' },
    { text: 'Bookings', path: '/booking-details' },
    { text: 'Book a Slot', path: '/book-slot' },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        color="primary"
        elevation={2}
        sx={{
          // small vertical padding to keep it slim
          py: 0.5,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            variant="dense"
            sx={{
              minHeight: { xs: 56, sm: 60 }, // compact height
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            {/* Brand */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                mr: 1,
              }}
            >
              <img
                src={logo}
                alt="Vidhigna Law Firm"
                style={{ height: isMdDown ? 36 : 44, width: 'auto' }}
              />
              <Typography
                variant="h6"
                sx={{
                  ml: 1,
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Vidhigna Law Firm
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Nav */}
            {!isMdDown && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.text}
                    component={Link}
                    to={link.path}
                    color="inherit"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        color: (theme.palette.accent && theme.palette.accent.main) || 'gold',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all .15s ease',
                    }}
                  >
                    {link.text}
                  </Button>
                ))}

                {isAuthenticated ? (
                  <Button
                    color="inherit"
                    size="small"
                    onClick={handleLogout}
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        color: (theme.palette.accent && theme.palette.accent.main) || 'gold',
                      },
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to="/login"
                    color="inherit"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        color: (theme.palette.accent && theme.palette.accent.main) || 'gold',
                      },
                    }}
                  >
                    Login
                  </Button>
                )}

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => disclaimerRef.current.open()}
                  sx={{
                    ml: 0.5,
                    bgcolor: 'gold',
                    color: 'black',
                    textTransform: 'none',
                    fontWeight: 700,
                    '&:hover': {
                      bgcolor: (theme.palette.accent && theme.palette.accent.main) || 'gold',
                    },
                  }}
                >
                  Disclaimer
                </Button>


                <IconButton
                  color="inherit"
                  href="tel:+919428669847"
                  aria-label="Call"
                  sx={{ ml: 0.5 }}
                >
                  <CallIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  href="mailto:info@lawfirm.com"
                  aria-label="Email"
                >
                  <EmailIcon />
                </IconButton>
              </Box>
            )}

            {/* Mobile menu button */}
            {isMdDown && (
              <IconButton
                color="inherit"
                aria-label="open navigation"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src={logo} alt="Logo" style={{ height: 32 }} />
              <Typography variant="subtitle1" fontWeight={700}>
                Vidhigna Law Firm
              </Typography>
            </Box>
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
                    '&:hover': {
                      bgcolor: (theme.palette.accent && theme.palette.accent.main) || 'rgba(0,0,0,0.08)',
                      color: 'black',
                    },
                  }}
                >
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ mt: 1 }}>
              <ListItemButton onClick={() => disclaimerRef.current.open()}>
                <ListItemText primary="Disclaimer" />
              </ListItemButton>
            </ListItem>
            {/* Add login/logout in mobile menu */}
            <ListItem disablePadding>
              {isAuthenticated ? (
                <ListItemButton onClick={() => {
                  handleLogout();
                  handleDrawerToggle();
                }}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              ) : (
                <ListItemButton
                  component={Link}
                  to="/login"
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary="Login" />
                </ListItemButton>
              )}
            </ListItem>
          </List>

          <Box sx={{ display: 'flex', gap: 1.5, mt: 2, px: 1 }}>
            <Button startIcon={<CallIcon />} href="tel:+919428669847">
              Call
            </Button>
            <Button startIcon={<EmailIcon />} href="mailto:info@lawfirm.com">
              Email
            </Button>
          </Box>
        </Box>
      </Drawer>
      {/* 🔹 Mount Disclaimer Portal once at the end of Navbar */}
      <DisclaimerPortal ref={disclaimerRef} />
    </>
  );
};

export default Navbar;
