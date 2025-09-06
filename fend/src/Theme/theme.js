import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import '@fontsource/roboto';
import '@fontsource/merriweather';

// Define your color palette and typography
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#4C332E', // Dark Wood
      light: '#6A4E49',
      dark: '#2E1F1C',
    },
    secondary: {
      main: '#000000', // Black
    },
    accent: {
      main: '#FFD700', // Gold
      light: '#FFE14D',
      dark: '#CCB100',
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
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Merriweather', serif",
      fontWeight: 700,
      fontSize: {
        xs: '2rem',    // mobile
        sm: '2.25rem', // tablet
        md: '2.5rem',  // desktop
      },
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "'Merriweather', serif",
      fontWeight: 700,
      fontSize: {
        xs: '1.75rem',
        sm: '1.875rem',
        md: '2rem',
      },
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: "'Merriweather', serif",
      fontWeight: 600,
      fontSize: {
        xs: '1.5rem',
        sm: '1.625rem',
        md: '1.75rem',
      },
    },
    body1: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: {
        xs: '0.875rem',
        sm: '0.9375rem',
        md: '1rem',
      },
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: {
        xs: '0.8125rem',
        sm: '0.875rem',
        md: '0.9375rem',
      },
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'capitalize',
      fontWeight: 500,
      fontSize: {
        xs: '0.875rem',
        sm: '0.9375rem',
        md: '1rem',
      },
    },
  },
  spacing: (factor) => `${0.25 * factor}rem`, // Base spacing unit of 4px (0.25rem)
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: {
            xs: '1rem',
            sm: '1.5rem',
            md: '2rem',
          },
          paddingRight: {
            xs: '1rem',
            sm: '1.5rem',
            md: '2rem',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '0.5rem 1rem',
          '@media (max-width:600px)': {
            padding: '0.4rem 0.8rem',
          },
        },
      },
    },
  },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  factor: 0.5,
});

export default theme;
