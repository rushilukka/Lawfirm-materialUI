import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import '@fontsource/roboto';
import '@fontsource/merriweather';

// Define your color palette and typography
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,      // Mobile phones
      sm: 480,    // Large phones/Small tablets
      md: 768,    // Tablets
      lg: 1024,   // Laptops/Desktops
      xl: 1280,   // Large screens
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
      appBg: {
        main: '#282c34', // App background
      },
      reactBlue: {
        main: '#61dafb', // React blue
      },
      white: {
        main: '#ffffff',
      },
      black: {
        main: '#000000',
      },
      lightWhite: {
        main: 'rgba(255,255,255,0.05)',
      },
      lighterWhite: {
        main: 'rgba(255,255,255,0.08)',
      },
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    fontSizeBase: '16px',
    fontSizeCalc: 'calc(10px + 2vmin)',
    h1: {
      fontFamily: "'Merriweather', serif",
      fontWeight: 500,
      fontSize: {
        xs: '1.75rem',  // mobile
        sm: '2rem',     // small tablet
        md: '2.25rem',  // tablet
        lg: '2.5rem',   // desktop
      },
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "'Merriweather', serif",
      fontWeight: 500,
      fontSize: {
        xs: '1.5rem',
        sm: '1.625rem',
        md: '1.75rem',
        lg: '2rem',
      },
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: "'Merriweather', serif",
      fontWeight: 500,
      fontSize: {
        xs: '1.25rem',
        sm: '1.375rem',
        md: '1.5rem',
        lg: '1.75rem',
      },
    },
    body1: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: {
        xs: '0.875rem',
        sm: '0.9375rem',
        md: '1rem',
        lg: '1rem',
      },
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: {
        xs: '0.75rem',
        sm: '0.8125rem',
        md: '0.875rem',
        lg: '0.9375rem',
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
            xs: '0.75rem',  // Smaller padding for mobile
            sm: '1rem',
            md: '1.5rem',
            lg: '2rem',
          },
          paddingRight: {
            xs: '0.75rem',  // Smaller padding for mobile
            sm: '1rem',
            md: '1.5rem',
            lg: '2rem',
          },
          maxWidth: {
            xs: '100%',
            sm: '100%',
            md: '90%',
            lg: '1200px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: {
            xs: '0.35rem 0.7rem',  // Smaller padding for mobile
            sm: '0.4rem 0.8rem',
            md: '0.5rem 1rem',
          },
          fontSize: {
            xs: '0.875rem',
            sm: '0.9375rem',
            md: '1rem',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: {
            xs: '0.5rem',  // Smaller padding for mobile icons
            sm: '0.625rem',
            md: '0.75rem',
          },
          '& .MuiSvgIcon-root': {
            fontSize: {
              xs: '1.25rem',  // Smaller icons for mobile
              sm: '1.5rem',
              md: '1.75rem',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          margin: {
            xs: '0.5rem',
            sm: '0.75rem',
            md: '1rem',
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
