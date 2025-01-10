import React from 'react';
import {useTheme} from '@mui/material/styles';
// import Carousel from './HomeCmp/CarouselsMobile';
import Carousel from './HomeCmp/Carousel';

import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

const HomePage = () => {
  const theme = useTheme();
  return (
  <>

    <div style={{opacity: "0.8",backgroundColor:'black'}}>
     <Carousel/>
    </div>
    <div>

  
    </div>

  </>
  );
};

export default HomePage;
