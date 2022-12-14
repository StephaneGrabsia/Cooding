import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Icon from '../assets/icon.svg';
import PropTypes from 'prop-types';

const settings = ['Change Username', 'Leaderboard', 'Logout'];

const imgStyle = {
  width: '6vh',
  height: '6vh',
  margin: '20px auto',
};


const toolBarStyle = {
  height: '8vh',
  minHeight: '8vh',
};


/**
 * Defines the component that is on the top of the Student main page
 * @param {Dict} props : contains the user informations (name, rank and
 * classement) and the session informations (number of exercices)
 * @return {Component}
 */
function ResponsiveAppBar({user, session}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [activeExercice, setActiveExercice] = React.useState(0);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSelection = (event, newExercice) => {
    setActiveExercice(newExercice);
  };

  return (
    <div>
      <AppBar position="fixed" style={toolBarStyle}>
        <Container maxWidth="xl" style={toolBarStyle}>
          <Toolbar disableGutters style={toolBarStyle}>
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: 'block', md: 'none'},
                }}
              >
                {session.pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <img src={Icon} style={imgStyle}/>
            <Box sx={{ml: 7, flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              <Tabs value={activeExercice}
                onChange={handleSelection}
                indicatorColor='secondary'
                textColor='secondary'
                TabIndicatorProps={{
                  sx: {
                    top: '60px',
                  },
                }}>
                {session.pages.map((page) => (
                  <Tab
                    key={page}
                    label={page}
                    sx={{my: 2, color: 'black', display: 'block'}}
                  />
                ))}
              </Tabs>
            </Box>
            <Box sx={{flexGrow: 1}}>
            </Box>
            <Box sx={{flexGrow: 0, mr: '15px'}}>
              <Typography
                variant="p"
                noWrap
                component="p"
                href="/"
                color= "black"
                sx={{
                  display: {xs: 'none', md: 'flex'},
                  fontFamily: 'Roboto',
                  fontWeight: 200,
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                  textAlign: 'Right',
                }}
              >
              Classement: {user.rank}/12
              </Typography>
            </Box>
            <Box sx={{flexGrow: 0, mr: '15px'}}>
              <Typography
                variant="p"
                noWrap
                component="p"
                href="/"
                color= "black"
                sx={{
                  display: {xs: 'none', md: 'flex'},
                  fontFamily: 'Roboto',
                  fontWeight: 200,
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                  textAlign: 'Right',
                }}
              >
              Score : {user.score}
              </Typography>
            </Box>

            <Box sx={{flexGrow: 0, mr: '15px'}}>
              <Typography
                variant="h5"
                noWrap
                component="p"
                href="/"
                sx={{
                  display: {xs: 'none', md: 'flex'},
                  fontFamily: 'Roboto',
                  fontWeight: 350,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  textAlign: 'Right',
                }}
              >
                {user.name}
              </Typography>
            </Box>
            <Box sx={{flexGrow: 0}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                  <Avatar alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                    sx={{width: '6vh', height: '6vh'}}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar disableGutters style={toolBarStyle}></Toolbar>
    </div>
  );
}

ResponsiveAppBar.propTypes = {
  user: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
};

export default ResponsiveAppBar;
