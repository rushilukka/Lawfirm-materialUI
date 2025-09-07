import React from 'react';
import { useTheme } from '@mui/material/styles';
import Carousel from './HomeCmp/Carousel';
import Testimonials from './HomeCmp/Testimonial';
import AboutContent from './About-content';
import { Box, Container } from '@mui/material';

const HomePage = () => {
  const theme = useTheme();
  
  return (
    <Box component="main">
      <Box
        sx={{
          backgroundColor: theme.palette.custom.black.main,
          opacity: 0.8,
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Carousel />
      </Box>

      <Container 
        maxWidth="xl" 
        sx={{
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <AboutContent />
      </Container>

      <Box
        sx={{
          backgroundColor: theme.palette.grey[50],
          py: { xs: 4, sm: 6, md: 8 }
        }}
      >
        <Container maxWidth="xl">
          <Testimonials />
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
