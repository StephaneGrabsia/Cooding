import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

/**
 * Defines the component of the avatar
 * @param {Dict} props : contains the user informations and logout function
 * @return {Component}
 */
function ProfileAvatar({user, settings, logoutFunction}) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleChooseMenuItem = () => {
    alert('EROOR TODO');
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <div>
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
                setting === 'Logout' ? logoutFunction : handleChooseMenuItem
              }
            >
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </div>
  );
}

export default ProfileAvatar;
