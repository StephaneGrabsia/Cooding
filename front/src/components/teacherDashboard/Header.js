import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import {Box} from '@mui/system';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AuthContext from '../../context/AuthContext';
import ProfileAvatar from '../avatar';

const settings = ['Mon Profil', 'Logout'];

/**
 * Component coding the header of the main teacher page.
 * Render the header
 * @param {props} props properties
 * @return {Component} A component
 */
function Header(props) {
  const {onDrawerToggle} = props;
  const {user, logoutUser} = React.useContext(AuthContext);
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{display: {sm: 'none', xs: 'block'}}} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Box sx={{flexGrow: 0, mr: '15px', mt: '5px'}}>
                <Typography variant="h6" noWrap component="p" href="/">
                  {user.user_info.first_name} {user.user_info.last_name}
                </Typography>
              </Box>
            </Grid>
            <Box sx={{flexGrow: 0, mr: '15px', mt: '15px'}}>
              <ProfileAvatar
                user={user}
                settings={settings}
                logoutFunction={logoutUser}
              />
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{zIndex: 0}}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Authentication
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
