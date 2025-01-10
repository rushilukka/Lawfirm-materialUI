import React from 'react';
import {useTheme} from '@mui/material/styles';
// import Carousel from './HomeCmp/CarouselsMobile';
import Carousel from './HomeCmp/Carousel';
import Testimonials from './HomeCmp/Testimonial';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
 import AboutContent from './About-content';
const HomePage = () => {
  const theme = useTheme();
  return (
  <>

    <div style={{opacity: "0.8",backgroundColor:'black'}}>
     <Carousel/>
    </div>
    <div>
      <AboutContent/>
    </div>
    <div>
<Testimonials/>
  
    </div>

  </>
  );
};

export default HomePage;
