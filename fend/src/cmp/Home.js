import React from 'react';
import {useTheme} from '@mui/material/styles';
// import Carousel from './HomeCmp/CarouselsMobile';
import Carousel from './HomeCmp/Carousel';

 
const HomePage = () => {
  const theme = useTheme();
  return (
  <>

    <div style={{opacity: "0.8",backgroundColor:'black'}}>
     <Carousel/>
    </div>

  </>
  );
};

export default HomePage;
