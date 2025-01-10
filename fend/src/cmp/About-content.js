import React from 'react';
import { Box, Container, Grid, Typography, Button, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import aboutImage from './img/about.jpg'; // Replace with the actual path to your image

export default function AboutContent() {
  return (
    <>

 
<Box sx={{ backgroundColor: 'background.paper', py: 5 }}>
  <Container>
    <Grid container spacing={4}>
      {/* Image Section */}
      <Grid item xs={12} md={5}>
        <Box
          component="img"
          src={aboutImage}
          alt="About Us"
          sx={{ width: '100%', borderRadius: 2 }}
        />
      </Grid>

      {/* Text Content Section */}
      <Grid item xs={12} md={7}>
        <Box
          sx={{
            backgroundColor: 'white',
            color: 'primary.main',
            borderRadius: 1,
            textAlign: 'center',
            px: 3,
            py: 2,
            display: { xs: 'none', lg: 'block' },
            position: 'relative',
            left: -50,
            width: 'max-content',
          }}
        >
          <Typography variant="h4">25 Years Experience</Typography>
        </Box>

        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Learn About Us
        </Typography>

        <Typography variant="h2" gutterBottom>
          We Provide Reliable And Effective Legal Services
        </Typography>

        <Typography variant="body1" paragraph>
          Our practice areas cover a wide spectrum of legal needs, from civil and
          criminal matters to family law, corporate law, and more. Whether you're
          facing a legal challenge or seeking proactive legal advice, we're here to
          navigate the intricate web of Indian laws on your behalf.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Learn More
        </Button>
      </Grid>
    </Grid>
  </Container>
</Box>

</>
);
}
