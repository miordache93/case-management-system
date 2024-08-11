import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    action: {
      disabled: '#FFFFFF',
      disabledBackground: '#7D90B2',
    },
    primary: {
      main: '#0A65FF',
      dark: '#00359C',
      light: '#E5F1FF',
    },
    secondary: {
      main: '#2E3B52', 
    },
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#00000',
    }
  },
  typography: {
    allVariants: {
      fontFamily: 'Inter',
      textTransform: 'none',
      fontWeight: 500,
    },
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6, 
          fontWeight: 500,
        },
        
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#F4F7FC',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          fontWeight: '500',
          borderRadius: '0 8px 8px 0',
          '&.Mui-selected': {
            backgroundColor: '#0A65FF',
            color: '#FFFFFF',

            '.MuiListItemIcon-root': {
              color: '#FFFFFF',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#F4F7FC',
          color: '#606F89',
          height: 40,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: 10,
          fontFamily: 'Inter',
          padding: 8,
          borderRadius: 80,

          '.MuiChip-label': {
            fontWeight: 500,
          }
        }
      }
    }
  },
});

export default theme;
