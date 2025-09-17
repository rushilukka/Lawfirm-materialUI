import React from 'react';
import { Box, Container, Grid, Typography, Button, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import aboutImage from '../img/about.jpg'; // Replace with the actual path to your image
import AboutContent from './About-content';
export default function About() {
  return (
    <>
      {/* Introduction Section */}
      <Box sx={{ backgroundColor: 'primary.main', py: 5, color: 'white' }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h3" gutterBottom>
                Welcome to Davda Associates
              </Typography>
              <Typography variant="body1" paragraph>
                At Davda Associates, we pride ourselves on delivering exceptional legal
                solutions tailored to meet your unique needs. With a commitment to
                excellence and a track record of success spanning over two decades, we
                have established ourselves as trusted legal advisors in India.
              </Typography>
              <Typography variant="body1">
                Our mission is to provide you with strategic and effective legal
                representation, ensuring your rights and interests are safeguarded at
                every step. From complex corporate cases to personal legal matters, our
                experienced team is here to support you.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
              >
                Contact Us Today
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Title Section */}
      <Box className="row" textAlign="center" mt={4} mb={0}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" color="primary">
              About Us
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <AboutContent/>

    </>
  );
}
