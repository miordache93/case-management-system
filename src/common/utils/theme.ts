import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    action: {
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
      primary: '#2E3B52',
      secondary: '#7D90B2',
    },
    
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
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.header-row': {
            height: 40,
            backgroundColor: '#F4F7FC',
          },

          '&:not(.header-row)': {
            '&:nth-child(odd)': {
              backgroundColor: '#FFFFFF', 
            },
            '&:nth-child(even)': {
              backgroundColor: '#F4F7FC',
            },
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          height: 40,
          // textWrap: 'nowrap',
          // whiteSpace: 'nowrap',
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        }
      }
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: '#606F89',
          fontWeight: 500,

          '&:hover': {
            color: '#0A65FF',
          },
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
