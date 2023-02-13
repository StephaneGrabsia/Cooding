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
import Coin from '../assets/coin.png';
import Surf from '../assets/surf.png';
import PropTypes from 'prop-types';

const settings = ['Change Username', 'Leaderboard', 'Logout'];

const imgStyle = {
  width: '6vh',
  height: '6vh',
  margin: '20px auto',
};

const coinStyle = {
  width: '6vh',
  height: '6vh',
  margin: '20px auto',
  verticalAlign: 'middle',
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
function ResponsiveAppBar({
  user,
  fixedUserInfos,
  listExercises,
  logoutUserStudent,
  activeExercise,
  setActiveExercise,
}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleChooseMenuItem = () => {
    alert('EROOR TODO');
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSelection = (event, newExercise) => {
    setActiveExercise(newExercise);
  };

  return (
    <div>
      <AppBar position="fixed" style={toolBarStyle}>
        <Container maxWidth="xxl" style={toolBarStyle}>
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
                {listExercises.map((page, index) => (
                  // eslint-disable-next-line max-len
                  <MenuItem key={index} onClick={(event) => handleSelection(event, index)}>
                    <Typography textAlign="center">Exo {index + 1}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <img src={Icon} style={imgStyle} />
            <Box
              sx={{ml: 7, flexGrow: 1, display: {xs: 'none', md: 'flex'}}}
            >
              <Tabs
                value={activeExercise}
                onChange={handleSelection}
                indicatorColor="secondary"
                textColor="secondary"
                TabIndicatorProps={{
                  sx: {
                    top: '60px',
                  },
                }}>
                {listExercises.map((page, index) => (
                  <Tab
                    key={index}
                    label={'Exo ' + (index + 1)}
                    sx={{my: 2, color: 'black', display: 'block'}}
                  />
                ))}
              </Tabs>
            </Box>
            <Box sx={{flexGrow: 1}}></Box>
            <Box
              sx={{
                flexGrow: 0,
                mr: '15px',
                display: {xs: 'none', md: 'flex'},
                alignItems: 'center',
              }}
            >
              <Typography
                variant="p"
                noWrap
                component="p"
                href="/"
                color="black"
                sx={{
                  fontFamily: 'Roboto',
                  fontWeight: 200,
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                  textAlign: 'Right',
                }}
              >
                Classement: {fixedUserInfos.rank}/12
              </Typography>
              <img src={Surf} style={coinStyle} />
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                mr: '15px',
                display: {xs: 'none', md: 'flex'},
                alignItems: 'center',
              }}
            >
              <Typography
                variant="p"
                noWrap
                component="p"
                href="/"
                color="black"
                sx={{
                  fontFamily: 'Roboto',
                  fontWeight: 200,
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                  textAlign: 'Right',
                }}
              >
                Score : {fixedUserInfos.score}
              </Typography>
              <img src={Coin} style={coinStyle} />
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
                {user.username}
              </Typography>
            </Box>
            <Box sx={{flexGrow: 0}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                  <Avatar
                    sx={{
                      width: '6vh',
                      height: '6vh',
                      backgroundColor: 'red',
                    }}
                  >
                    {user.username[0]}
                  </Avatar>
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
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === 'Logout' ?
                        logoutUserStudent :
                        handleChooseMenuItem
                    }
                  >
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
};

export default ResponsiveAppBar;
