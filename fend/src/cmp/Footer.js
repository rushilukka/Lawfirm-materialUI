import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton, 
  Button,
  useTheme
} from '@mui/material';
import { isMobile, isTablet } from 'react-device-detect';
import { 
  Email, 
  LocationOn, 
  Phone, 
  Twitter, 
  Facebook, 
  LinkedIn, 
  Instagram 
} from '@mui/icons-material';

const email = 'rushi.lukka.14@gmail.com';
const phoneNumber = '9428669848';

const handleOpenGmail = () => {
  window.location.href = `mailto:${email}`;
};

const makePhoneCall = () => {
  window.location.href = `tel:${phoneNumber}`;
};

export default function Footer() {
  const theme = useTheme();
  
  const contactBoxSx = {
    p: { xs: 1, sm: 3 },
    backgroundColor: theme.palette.custom.lightWhite.main,
    borderRadius: 1,
    height: '100%',
    transition: 'transform 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '&:hover': {
      transform: isMobile ? 'none' : 'translateY(-5px)',
      backgroundColor: theme.palette.custom.lighterWhite.main,
    }
  };

  const iconSx = {
    fontSize: { xs: 24, sm: 35, md: 40 },
    color: 'primary.main',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: isMobile ? 'none' : 'scale(1.1)',
    }
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: 'secondary.main', 
        color: 'white', 
        mt: { xs: 5, sm: 8, md: 10 }, 
        pt: { xs: 3, sm: 4, md: 5 }, 
        pb: { xs: 3, sm: 4, md: 5 } 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 1, sm: 3, md: 5 }}>
          {/* Office Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={contactBoxSx}
            >
              <LocationOn sx={iconSx} />
              <Box 
                ml={1.5}
                sx={{ textAlign: 'left', width: '100%' }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontSize: { xs: '0.9rem', sm: '1.2rem', md: '1.25rem' },
                    mb: { xs: 0.5, sm: 1 }
                  }}
                >
                  Our Office
                </Typography>
                <Typography variant="body2">
                  SG Highway, Ahmedabad, Gujarat
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Email Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={contactBoxSx}
            >
              <IconButton 
                onClick={handleOpenGmail}
                sx={{ p: { xs: 0.5, sm: 1.5 } }}
              >
                <Email sx={iconSx} />
              </IconButton>
              <Box 
                ml={1.5}
                sx={{ textAlign: 'left', width: '100%' }}
              >
                <Typography 
                  variant="h6"
                  sx={{ 
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.25rem' },
                    mb: 1 
                  }}
                >
                  Email Us
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { color: theme.palette.accent.main }
                  }} 
                  onClick={handleOpenGmail}
                >
                  {email}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Phone Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={contactBoxSx}
            >
              <IconButton 
                onClick={makePhoneCall}
                sx={{ p: { xs: 0.5, sm: 1.5 } }}
              >
                <Phone sx={iconSx} />
              </IconButton>
              <Box 
                ml={1.5}
                sx={{ textAlign: 'left', width: '100%' }}
              >
                <Typography 
                  variant="h6"
                  sx={{ 
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.25rem' },
                    mb: 1 
                  }}
                >
                  Call Us
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { color: theme.palette.accent.main }
                  }}
                  onClick={makePhoneCall}
                >
                  {phoneNumber}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Social Media Links */}
        <Box
          sx={{
            mt: { xs: 3, sm: 4, md: 5 },
            pt: { xs: 3, sm: 4 },
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 2, sm: 0 }
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: { xs: 'center', sm: 'left' },
              opacity: 0.8
            }}
          >
            © {new Date().getFullYear()} Vidhigna Law Firm. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {[
              { icon: <Twitter />, label: 'Twitter', url: '#' },
              { icon: <Facebook />, label: 'Facebook', url: '#' },
              { icon: <LinkedIn />, label: 'LinkedIn', url: '#' },
              { icon: <Instagram />, label: 'Instagram', url: '#' }
            ].map((social) => (
              <IconButton
                key={social.label}
                component={Link}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: theme.palette.accent.main,
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

