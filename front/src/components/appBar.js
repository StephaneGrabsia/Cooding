import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Icon from '../assets/icon.svg';
import Coin from '../assets/coin.png';
import Surf from '../assets/surf.png';
import PropTypes from 'prop-types';
import ProfileAvatar from './avatar';

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
  display: 'inline-flex',
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
  session,
  logoutUserStudent,
}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [activeExercice, setActiveExercice] = React.useState(0);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSelection = (event, newExercice) => {
    setActiveExercice(newExercice);
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
                {session.pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <img src={Icon} style={imgStyle} />
            <Box
              sx={{ml: 7, flexGrow: 1, display: {xs: 'none', md: 'flex'}}}
            >
              <Tabs
                value={activeExercice}
                onChange={handleSelection}
                indicatorColor="secondary"
                textColor="secondary"
                TabIndicatorProps={{
                  sx: {
                    top: '60px',
                  },
                }}
              >
                {session.pages.map((page) => (
                  <Tab
                    key={page}
                    label={page}
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
                display: 'inline-flex',
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
                  display: {xs: 'none', md: 'flex'},
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
                display: 'inline-flex',
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
                  display: {xs: 'none', md: 'flex'},
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
            <ProfileAvatar
              user={user}
              settings={settings}
              logoutFunction={logoutUserStudent}
            />
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
