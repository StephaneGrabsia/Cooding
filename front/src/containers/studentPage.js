import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import ResponsiveAppBar from '../components/appBar';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
const toolBarStyle = {
  height: '80px',
};

/**
 * Component coding the main page of the student.
 * Render the appBar
 * @return {Component} A component
 */
function StudentPage() {
  const userInfos = {
    name: 'GOAT',
    score: 5893,
    rank: 2,
  };
  const sessionInfo = {
    pages: ['Exo 1', 'Exo 2', 'Exo 3'],
  };

  return (
    <div>
      <ResponsiveAppBar user={userInfos} session={sessionInfo}/>
      <Toolbar disableGutters style={toolBarStyle}></Toolbar>
      <Grid2 container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}>
        <Grid2 xs={6}>
          <Paper elevation={3} />
          <Box sx={{
            width: 300,
            height: 300,
            backgroundColor: 'secondary.dark'}}>

          </Box>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default StudentPage;
