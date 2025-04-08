import { createTheme, ThemeOptions } from '@mui/material/styles';

const baseThemeSettings: ThemeOptions = {
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};

export const lightTheme = createTheme({
  ...baseThemeSettings,
  palette: {
    mode: 'light',
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
    primary: {
      main: '#1ED760',
    },
    secondary: {
      main: '#191414',
    },
    text: {
      primary: '#191414',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", sans-serif',
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...baseThemeSettings,
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#1ED760',
    },
    secondary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", sans-serif',
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});
