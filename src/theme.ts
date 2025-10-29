import { createTheme } from '@mui/material/styles';

// FIX: Module augmentation was failing. This can happen when importing types from the module being augmented.
// Using indexed access types (`Palette['primary']`) is safer and resolves the issue.
declare module '@mui/material/styles' {
  interface Palette {
    greenTrade: Palette['primary'];
    redTrade: Palette['primary'];
  }
  interface PaletteOptions {
    greenTrade?: PaletteOptions['primary'];
    redTrade?: PaletteOptions['primary'];
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
