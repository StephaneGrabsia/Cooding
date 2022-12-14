/* eslint-disable react/no-children-prop */
import React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import ResponsiveAppBar from '../components/appBar';
import ReactMarkdown from 'react-markdown';
import Editor from '@monaco-editor/react';
import PropTypes from 'prop-types';
import {Button, Box, Paper} from '@mui/material';

const statementSize = {
  height: '92vh',
  width: '41.6vw',
};

const rightPartSize = {
  width: '50vw',
  height: '92vh',
};

const codeEditorSize = {
  width: '58.3vw',
  height: '69vh',
};

const terminalSize = {
  width: '58.3vw',
  height: '23vh',
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
            sx={{backgroundColor: 'secondary.light'}}>
            <ReactMarkdown children={exercice.content}></ReactMarkdown>
          </Paper>
        </Grid2>
        <Grid2 xs={7}>
          <Grid2 container
            direction='column'
            justifyContent="center"
            alignItems="stretch"
            style={rightPartSize}
          >
            <Grid2 xs={9} style={codeEditorSize}>
              <Editor
                defaultLanguage='python'
                defaultValue='#Insert here your code ;)!'
              />
            </Grid2>
            <Grid2 xs={3}
              style={terminalSize}
              sx={{backgroundColor: 'tertianary.light'}}
            >
              <Paper elevation={3}>
                <Box>
                  <Button variant="contained">Run</Button>
                </Box>
              </Paper>
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
