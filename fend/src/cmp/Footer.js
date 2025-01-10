import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Button } from '@mui/material';
import { Email, LocationOn, Phone, Twitter, Facebook, LinkedIn, Instagram } from '@mui/icons-material';

const email = 'rushi.lukka.14@gmail.com';
const phoneNumber = '9428669848';

const handleOpenGmail = () => {
  window.location.href = `mailto:${email}`;
};

const makePhoneCall = () => {
  window.location.href = `tel:${phoneNumber}`;
};

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: 'secondary.main', color: 'white', mt: 10, pt: 5, pb: 5 }}>
      <Container>
        <Grid container spacing={5}>
          {/* Office Section */}
          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}
            >
              <LocationOn sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box ml={3}>
                <Typography variant="h6">Our Office</Typography>
                <Typography>SG Highway, Ahmedabad, Gujarat</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Email Section */}
          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}
            >
              <IconButton onClick={handleOpenGmail}>
                <Email sx={{ fontSize: 40, color: 'primary.main' }} />
              </IconButton>
              <Box ml={3}>
                <Typography variant="h6">Email Us</Typography>
                <Typography sx={{ cursor: 'pointer' }} onClick={handleOpenGmail}>
                  info@example.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Phone Section */}
          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}
            >
              <IconButton onClick={makePhoneCall}>
                <Phone sx={{ fontSize: 40, color: 'primary.main' }} />
              </IconButton>
              <Box ml={3}>
                <Typography variant="h6">Call Us</Typography>
                <Typography sx={{ cursor: 'pointer' }} onClick={makePhoneCall}>
                  +91 94286 69848
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Links */}
        <Grid container spacing={5} sx={{ pt: 5 }}>
          {/* Logo and Description */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" color="primary" gutterBottom>
              Advocate
            </Typography>
            <Typography>
              Justice Through Law, Your Trusted Legal Partners in India
            </Typography>
            <Box mt={4}>
              <IconButton href="#" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit">
                <LinkedIn />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          {/* Popular Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="primary" gutterBottom>
              Popular Links
            </Typography>
            <Box>
              <Link href="#" color="inherit" underline="none" display="block" mb={1}>
                Home
              </Link>
              <Link href="#" color="inherit" underline="none" display="block" mb={1}>
                About
              </Link>
              <Link href="#" color="inherit" underline="none" display="block" mb={1}>
                Services
              </Link>
              <Link href="#" color="inherit" underline="none" display="block" mb={1}>
                Attorney
              </Link>
              <Link href="#" color="inherit" underline="none">
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="primary" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="#" color="inherit" underline="none" display="block" mb={1}>
                FAQs
              </Link>
              <Link href="#" color="inherit" underline="none" display="block" mb={1}>
                Help
              </Link>
              <Link href="#" color="inherit" underline="none" display="block" mb={1}>
                Terms
              </Link>
              <Link href="#" color="inherit" underline="none" display="block" mb={1}>
                Privacy
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box mt={5} pt={3} textAlign="center" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Typography variant="body2">
            &copy; <Link href="/" color="inherit" underline="none">Law Firm</Link>. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
