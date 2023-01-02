import React from 'react';
import {Button, Box, Toolbar, Avatar} from '@mui/material';
import ShibaRunning from '../assets/shiba_running.svg';
import ShibaNeedHelp from '../assets/needHelp.svg';

/**
 * Defines the component that is on the bottom of the Student
 * main page contains the exercice and session information
 * @return {Component}
 */

const buttonStyle = {
  paddingTop: '2px',
  paddingBottom: '2px',
};

const avatarStyle = {
  width: '40px',
  height: '40px',
};

/**
 * Defines the component that is on the top of the output section
 * @return {Component}
 */
function OutputSectionBar() {
  return (
    <div>
      <Toolbar disableGutters>
        <Box sx={{marginLeft: '20px'}}>
          <Button
            variant="contained"
            startIcon={
              <Avatar
                src={ShibaNeedHelp}
                variant='square'
                style={avatarStyle}/>
            }
            style={buttonStyle} >
            Need Help?
          </Button>
        </Box>
        <Box sx={{flexGrow: 1}}></Box>
        <Box sx={{marginRight: '20px'}}>
          <Button
            variant="contained"
            startIcon={
              <Avatar
                src={ShibaRunning}
                variant='square'
                style={avatarStyle}/>
            }
            style={buttonStyle}>
              Run
          </Button>
        </Box>
        <Box sx={{marginRight: '20px'}}>
          <Button
            variant="contained"
            sx = {{height: '44px'}}>
              Submit
          </Button>
        </Box>
      </Toolbar>
    </div>
  );
}

export default OutputSectionBar;
