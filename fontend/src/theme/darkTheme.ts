import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00D4AA', // Teal green from the image
      dark: '#00B894',
      light: '#26E0B8',
    },
    secondary: {
      main: '#6C5CE7', // Purple accent
      dark: '#5A4FCF',
      light: '#8B7EE8',
    },
    background: {
      default: '#0B0E11', // Very dark background
      paper: '#161B22', // Card background
    },
    surface: {
      main: '#161B22',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.65)',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
    error: {
      main: '#FF6B6B',
    },
    warning: {
      main: '#FFD93D',
    },
    info: {
      main: '#74B9FF',
    },
    success: {
      main: '#00D4AA',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0B0E11',
          color: '#FFFFFF',
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        '*::-webkit-scrollbar': {
          width: '6px',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: '#0B0E11',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#2D3748',
          borderRadius: '3px',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#4A5568',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#161B22',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#161B22',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          backgroundImage: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            border: '1px solid rgba(0, 212, 170, 0.2)',
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease-in-out',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0B0E11',
          color: '#FFFFFF',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0B0E11',
          color: '#FFFFFF',
          border: 'none',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#161B22',
          '& .MuiTableCell-head': {
            backgroundColor: '#161B22',
            color: 'rgba(255, 255, 255, 0.65)',
            fontWeight: 600,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: '#FFFFFF',
          padding: '16px',
        },
        head: {
          backgroundColor: '#161B22',
          color: 'rgba(255, 255, 255, 0.65)',
          fontWeight: 600,
          fontSize: '0.875rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '8px',
          padding: '10px 20px',
        },
        contained: {
          background: 'linear-gradient(135deg, #00D4AA 0%, #00B894 100%)',
          boxShadow: '0 4px 15px rgba(0, 212, 170, 0.25)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(135deg, #00B894 0%, #009C7D 100%)',
            boxShadow: '0 6px 20px rgba(0, 212, 170, 0.35)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: 'rgba(0, 212, 170, 0.5)',
          color: '#00D4AA',
          '&:hover': {
            borderColor: '#00D4AA',
            backgroundColor: 'rgba(0, 212, 170, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#161B22',
            borderRadius: '8px',
            color: '#FFFFFF',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 212, 170, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00D4AA',
              boxShadow: '0 0 0 2px rgba(0, 212, 170, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.65)',
            '&.Mui-focused': {
              color: '#00D4AA',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#161B22',
          color: '#FFFFFF',
          borderRadius: '8px',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#161B22',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          padding: '12px 16px',
          '&:hover': {
            backgroundColor: 'rgba(0, 212, 170, 0.1)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 212, 170, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(0, 212, 170, 0.2)',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#161B22',
          color: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontWeight: 500,
        },
        filled: {
          '&.MuiChip-colorPrimary': {
            backgroundColor: 'rgba(0, 212, 170, 0.2)',
            color: '#00D4AA',
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: 'rgba(108, 92, 231, 0.2)',
            color: '#6C5CE7',
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: 'rgba(0, 212, 170, 0.2)',
            color: '#00D4AA',
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: 'rgba(255, 217, 61, 0.2)',
            color: '#FFD93D',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
        },
        bar: {
          background: 'linear-gradient(90deg, #00D4AA 0%, #00B894 100%)',
          borderRadius: '4px',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#FFFFFF',
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      color: '#FFFFFF',
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      color: '#FFFFFF',
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      color: '#FFFFFF',
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      color: '#FFFFFF',
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      color: '#FFFFFF',
      fontSize: '1.125rem',
    },
    body1: {
      color: '#FFFFFF',
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      color: 'rgba(255, 255, 255, 0.65)',
      fontSize: '0.8125rem',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontWeight: 500,
      color: 'rgba(255, 255, 255, 0.85)',
    },
    subtitle2: {
      fontWeight: 500,
      color: 'rgba(255, 255, 255, 0.65)',
      fontSize: '0.8125rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

// Extend the theme interface to include custom colors
declare module '@mui/material/styles' {
  interface Palette {
    surface: {
      main: string;
    };
  }

  interface PaletteOptions {
    surface?: {
      main: string;
    };
  }
}
