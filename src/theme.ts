import { createTheme, PaletteColor, PaletteColorOptions } from '@mui/material/styles';

// FIX: The original module augmentation was failing due to type resolution issues.
// Using explicit types `PaletteColor` and `PaletteColorOptions` instead of
// indexed access types (`Palette['primary']`) makes the augmentation more robust and resolves the errors.
declare module '@mui/material/styles' {
  interface Palette {
    greenTrade: PaletteColor;
    redTrade: PaletteColor;
  }
  interface PaletteOptions {
    greenTrade?: PaletteColorOptions;
    redTrade?: PaletteColorOptions;
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5',
    },
    background: {
      default: '#f3f4f6',
      paper: '#ffffff',
    },
    greenTrade: {
      main: '#10b981',
    },
    redTrade: {
      main: '#ef4444',
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#818cf8',
    },
    background: {
      default: '#1a202c',
      paper: '#2d3748',
    },
    greenTrade: {
      main: '#34d399',
    },
    redTrade: {
      main: '#f87171',
    }
  },
});
