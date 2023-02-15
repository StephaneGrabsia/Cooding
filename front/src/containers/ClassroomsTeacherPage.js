import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TeacherNavigator from '../components/teacherDashboard/TeacherNavigator';
// eslint-disable-next-line max-len
import ClassroomsContent from '../components/teacherDashboard/ClassroomsContent';
import Header from '../components/teacherDashboard/Header';

import AuthContext from '../context/AuthContext';

let theme = createTheme({
  palette: {
    primary: {
      light: '#5AB8FF',
      main: '#1698f9',
      dark: '#137FCF',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          'boxShadow': 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          'color': 'inherit',
          'minWidth': 'auto',
          'marginRight': theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

const drawerWidth = 256;

/**
 * Component coding the main page of the student.
 * Render the appBar
 * @return {Component} A component
 */
export default function ClassroomsTeacherPage() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const {user, logoutUser} = React.useContext(AuthContext);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display: 'flex', minHeight: '100vh'}}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
        >
          {isSmUp ? null : (
            <TeacherNavigator
              PaperProps={{style: {width: drawerWidth}}}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              father={1}
              id={0}
            />
          )}

          <TeacherNavigator
            PaperProps={{style: {width: drawerWidth}}}
            sx={{display: {sm: 'block', xs: 'none'}}}
            father={1}
            id={0}
          />
        </Box>
        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <Header
            title="Salles de classe"
            user={user}
            logoutUser={logoutUser}
            onDrawerToggle={handleDrawerToggle}
          />
          <Box
            component="main"
            sx={{flex: 1, py: 6, px: 4, bgcolor: '#eaeff1'}}
          >
            <ClassroomsContent />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
