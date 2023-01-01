/* eslint-disable react/no-children-prop */
import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import ResponsiveAppBar from '../components/appBar';
import ReactMarkdown from 'react-markdown';
import Editor from '@monaco-editor/react';
import PropTypes from 'prop-types';
import {Button, Box, Paper, Toolbar, Avatar} from '@mui/material';
import ShibaRunning from '../assets/shiba_running.jpg';
import ShibaNeedHelp from '../assets/needHelp.jpg';
import {Container} from '@mui/system';

// import style from '../styles/style.css';

const statementSize = {
  height: '92vh',
  width: '41.6vw',
  overflow: 'scroll',
};

const rightPartSize = {
  width: '50vw',
  height: '92vh',
};

const codeEditorSize = {
  width: '58.3vw',
  height: '61.3vh',
  paddingTop: '10px',
};

const terminalSize = {
  width: '58.3vw',
  height: '30.6vh',
};


const buttonStyle = {
  paddingTop: '2px',
  paddingBottom: '2px',
};

const avatarStyle = {
  width: '40px',
  height: '40px',
};

/**
 * Component coding the main page of the student.
 * Render the appBar
 * @return {Component} A component
 */
function StudentPage({exercice}) {
  const userInfos = {
    name: 'GOAT',
    score: 5893,
    rank: 2,
  };
  const sessionInfo = {
    pages: ['Exo 1', 'Exo 2', 'Exo 3', 'Exo 4'],
  };

  return (
    <div>
      <ResponsiveAppBar user={userInfos} session={sessionInfo}/>
      <Grid2 container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}>
        <Grid2 xs={5}>
          <Paper elevation={3} style={statementSize}
            sx={{backgroundColor: 'secondary.main'}}>
            <ReactMarkdown
              children={exercice.content}
              className='reactMarkdown'>
            </ReactMarkdown>
          </Paper>
        </Grid2>
        <Grid2 xs={7}>
          <Grid2 container
            direction='column'
            justifyContent="center"
            alignItems="stretch"
            style={rightPartSize}
          >
            <Grid2 xs={8} style={codeEditorSize}>
              <Editor
                defaultLanguage='python'
                defaultValue='#Insert here your code ;)!'
                options={{minimap: {enabled: false}}}
              />
            </Grid2>
            <Grid2 xs={4}
              style={terminalSize}
              sx={{backgroundColor: 'tertianary.main'}}
            >
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
              <Container sx={{
                height: '68%',
                padding: '0px',
              }}>
                <Editor
                  defaultLanguage='python'
                  defaultValue='Traceback will be here!'
                  options={{minimap: {enabled: false}}}
                  sx={{height: '78%'}}
                />
              </Container>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};
StudentPage.propTypes = {
  exercice: PropTypes.object.isRequired,
};
export default StudentPage;
