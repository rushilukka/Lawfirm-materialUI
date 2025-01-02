import { createTheme } from '@mui/material/styles';
import '@fontsource/roboto'; // Import a Google Font (Roboto as an example)
import '@fontsource/merriweather'; // Import another font for headings

// Define your color palette and typography
const theme = createTheme({
  palette: {
    primary: {
      main: '#4C332E', // Dark Wood
    },
    secondary: {
      main: '#000000', // Black
    },
    accent: {
      main: '#FFD700', // Gold
    },
    custom: {
      primary2: {
        main: '#b2ad7f', // Almost white
      },
      my_bg: {
        main: '#e6e2d3', // Sand
      },
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // Base font for the app
    h1: {
      fontFamily: "'Merriweather', serif", // Custom font for headings
      fontWeight: 700, // Bold
      fontSize: '2.5rem',
    },
    h2: {
      fontFamily: "'Merriweather', serif",
      fontWeight: 700,
      fontSize: '2rem',
    },
    body1: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'capitalize', // Makes button text non-uppercase
      fontWeight: 500,
    },
  },
});

export default theme;
