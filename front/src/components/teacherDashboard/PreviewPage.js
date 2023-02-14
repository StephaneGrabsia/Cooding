/* eslint-disable react/no-children-prop */
import React, {useState} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import ReactMarkdown from 'react-markdown';
import {Paper, Typography} from '@mui/material';
import {Container} from '@mui/system';
import OutputSectionBar from '../outputSectionBar';
import CodeEditorWindow from '../CodeEditorWindow';
// import style from '../styles/style.css';

const statementSize = {
  height: '92vh',
  width: '41.6vw',
  overflow: 'scroll',
};

const outputSize = {
  height: '3vh',
  width: '100%',
  overflow: 'scroll',
};

const tracebackSize = {
  width: '100%',
  overflow: 'scroll',
};

const rightPartSize = {
  width: '50vw',
  height: '92vh',
};

const codeEditorSize = {
  width: '58.3vw',
  height: '53.6vh',
  paddingTop: '10px',
};

const terminalSize = {
  width: '58.3vw',
  height: '38.3vh',
};


/**
 * Component coding the main page of the student.
 * Render the appBar
 * @return {Component} A component
 */
function PreviewPage({
  exercise,
}) {
  const [code, setCode] = useState(exercise.solution);


  const onChange = (action, data) => {
    switch (action) {
      case 'code': {
        setCode(data);
        break;
      }
      default: {
        console.warn('case not handled!', action, data);
      }
    }
  };

  const onClickSubmit = async (event) => {
    alert('Error T0DO');
  };

  return (
    <div>
      <Grid2 container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}>
        <Grid2 xs={5}>
          <Paper elevation={3} style={statementSize}
            sx={{backgroundColor: 'secondary.main'}}>
            <Container sx={{padding: '20px'}}>
              <ReactMarkdown
                children={exercise.statement}
                className='reactMarkdown'>
              </ReactMarkdown>
            </Container>
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
              <CodeEditorWindow
                code={code}
                onChange={onChange}
              />
            </Grid2>
            <Grid2 xs={4}
              style={terminalSize}
              sx={{backgroundColor: 'tertianary.main'}}
            >
              <OutputSectionBar onClickSubmit={onClickSubmit}/>
              <Container sx={{
                height: '78%',
                padding: '0px',
                marginBottom: '2px',
              }}>
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
                    textAlign: 'Left',
                    marginLeft: '3px',
                    marginBottom: '3px',
                  }}
                >
                    Output:
                </Typography>
                <Paper
                  elevation={3}
                  style={outputSize}
                >
                  <Typography
                    variant="p"
                    component="p"
                    href="/"
                    color="black"
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: 200,
                      letterSpacing: '.3rem',
                      textDecoration: 'none',
                      textAlign: 'Left',
                      marginLeft: '3px',
                    }}
                  >
                  </Typography>
                </Paper>
                <Typography
                  variant="p"
                  component="p"
                  href="/"
                  color="black"
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 200,
                    letterSpacing: '.3rem',
                    textDecoration: 'none',
                    textAlign: 'Left',
                    marginLeft: '3px',
                    marginTop: '10px',
                    marginBottom: '3px',
                  }}
                >
                    Traceback:
                </Typography>
                <Container disableGutters sx={{
                  height: '60%',
                  paddingRight: '0px',
                  paddingLeft: '0px',
                  marginBottom: '2px',
                }}>
                  <Paper
                    elevation={3}
                    style={tracebackSize}
                    sx={{backgroundColor: 'primary.main', height: '80%'}}
                  >
                    <Typography
                      variant="p"
                      component="p"
                      href="/"
                      color="black"
                      sx={{
                        fontFamily: 'Roboto',
                        fontWeight: 200,
                        letterSpacing: '.3rem',
                        textDecoration: 'none',
                        textAlign: 'Left',
                        marginLeft: '3px',
                      }}
                    >

                    </Typography>
                  </Paper>
                </Container>
              </Container>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};
export default PreviewPage;
