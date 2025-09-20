import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
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
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { isMobile } from 'react-device-detect';
import { useAuth } from '../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

import logo from '../img/logo_circle.png';
import DisclaimerPortal from './Popup-Disclaimer';
import { PHONE_NUMBER, EMAIL_ID } from '../constants/constants';

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const disclaimerRef = React.useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  
  const handleLogoutClick = () => {
    handleProfileMenuClose();
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    logout();
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
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
          py: { xs: 1, sm: 0.5 }, // Increased padding for mobile
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 2, md: 3 } }}>
          <Toolbar
            disableGutters
            variant="dense"
            sx={{
              minHeight: { xs: 56, sm: 56, md: 60 }, // Increased height for mobile
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 1.5 },
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
                mr: { xs: 0.5, sm: 1 },
                flexShrink: 0
              }}
            >
              <img
                src={logo}
                alt="Davda Associates"
                style={{ height: isMobile ? 40 : 44, width: 'auto' }}
              />
              <Typography
                variant="h6"
                sx={{
                  ml: { xs: 1, sm: 1 },
                  fontWeight: 500,
                  display: 'block', // Show on all devices
                  fontSize: {
                    xs: '1rem',
                    sm: '1.1rem',
                    md: '1.25rem',
                  },
                }}
              >
                Davda Associates
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Nav */}
            {!isMobile && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 0.25, sm: 0.5 },
                '& .MuiButton-root': {
                  px: { xs: 0.5, sm: 1 },
                  minWidth: { xs: 'auto', sm: '64px' }
                }
              }}>
                {navLinks.map((link) => (
                  <Button
                    key={link.text}
                    component={Link}
                    to={link.path}
                    color="inherit"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                      bgcolor: location.pathname === link.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      '&:hover': {
                        color: (theme.palette.accent && theme.palette.accent.main) || 'gold',
                        transform: 'translateY(-1px)',
                        bgcolor: location.pathname === link.path ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      },
                      transition: 'all .15s ease',
                      borderRadius: '4px',
                    }}
                  >
                    {link.text}
                  </Button>
                ))}

                {isAuthenticated ? (
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{ 
                      color: 'inherit',
                      '&:hover': {
                        color: (theme.palette.accent && theme.palette.accent.main) || 'gold',
                      },
                    }}
                  >
                    <Avatar sx={{ 
                      width: { xs: 28, sm: 32 }, 
                      height: { xs: 28, sm: 32 }, 
                      bgcolor: 'secondary.main' 
                    }}>
                      <AccountCircleIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                    </Avatar>
                  </IconButton>
                ) : (
                  <IconButton
                    component={Link}
                    to="/verifyEmail"
                    color="inherit"
                    sx={{
                      '&:hover': {
                        color: (theme.palette.accent && theme.palette.accent.main) || 'gold',
                      },
                    }}
                  >
                    <LoginIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </IconButton>
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
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: (theme.palette.accent && theme.palette.accent.main) || 'gold',
                    },
                  }}
                >
                  Disclaimer
                </Button>


                <IconButton
                  color="inherit"
                  href="tel:+911234567890"
                  aria-label="Call"
                  sx={{ ml: 0.5 }}
                >
                  <CallIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
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
            {isMobile && (
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
          display: isMobile ? 'block' : 'none',
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
              <Typography 
                variant="subtitle1" 
                style={{
                  fontWeight: 500
                }}
                sx={{
                  fontSize: {
                    xs: '1rem',
                    sm: '1.1rem',
                    md: '1.25rem',
                  }
                }}
              >
                Davda Associates
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
                  selected={location.pathname === link.path}
                  sx={{
                    '&:hover': {
                      bgcolor: (theme.palette.accent && theme.palette.accent.main) || 'rgba(0,0,0,0.08)',
                      color: 'black',
                    },
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
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
                <>
                  <ListItem>
                    <Box sx={{ width: '100%', py: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                          <AccountCircleIcon />
                        </Avatar>
                        <Typography variant="subtitle1"         style={{
                          fontWeight: 500
                        }}>
                          Profile
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Signed in as
                      </Typography>
                      <Typography variant="body1" color="primary.main" sx={{ 
                        wordBreak: 'break-all',
                        fontWeight: 500
                      }}>
                        {user?.email || 'User'}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton 
                      onClick={() => {
                        handleLogoutClick();
                        handleDrawerToggle();
                      }}
                      sx={{ color: 'error.main' }}
                    >
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </ListItem>
                </>
              ) : (
                <ListItemButton
                  component={Link}
                  to="/verifyEmail"
                  onClick={handleDrawerToggle}
                >
                  <LoginIcon sx={{ mr: 2 }} />
                  <ListItemText primary="Verify Email" />
                </ListItemButton>
              )}
            </ListItem>
          </List>

          <Box sx={{ display: 'flex', gap: 1.5, mt: 2, px: 1 }}>
            <Button startIcon={<CallIcon />} href={`tel:+91${PHONE_NUMBER}`}>
              Call
            </Button>
            <Button startIcon={<EmailIcon />} href={`mailto:${EMAIL_ID}`}>
              Email
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1, minWidth: 250 }}>
          <Typography variant="subtitle1"                 style={{
            fontWeight: 500
          }}
          >
            Profile
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ 
            wordBreak: 'break-all',
            mt: 0.5
          }}>
            Signed in as
          </Typography>
          <Typography variant="body1" sx={{ 
            wordBreak: 'break-all',
            color: 'primary.main',
            fontWeight: 500
          }}>
            {user?.email || 'User'}
          </Typography>
        </Box>
        <MenuItem onClick={handleLogoutClick} sx={{ color: 'error.main' }}>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
      >
        <DialogTitle id="logout-dialog-title">
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to log out?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} color="primary" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🔹 Mount Disclaimer Portal once at the end of Navbar */}
      <DisclaimerPortal ref={disclaimerRef} />
    </>
  );
};

export default Navbar;
