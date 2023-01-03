/* eslint-disable react/no-children-prop */
import React, {useContext} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import ResponsiveAppBar from '../components/appBar';
import ReactMarkdown from 'react-markdown';
import Editor from '@monaco-editor/react';
import PropTypes from 'prop-types';
import {Paper} from '@mui/material';
import {Container} from '@mui/system';
import OutputSectionBar from '../components/outputSectionBar';
import AuthContext from '../context/AuthContext';
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
  const {user, logoutUser} = useContext(AuthContext);
  return (
    <div>
      <ResponsiveAppBar
        user={user}
        otherInfos={userInfos}
        session={sessionInfo}
        logoutUserStudent={logoutUser}/>
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
              <OutputSectionBar/>
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
