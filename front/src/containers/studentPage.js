/* eslint-disable react/no-children-prop */
import React, {useContext, useState, useEffect} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import ResponsiveAppBar from '../components/appBar';
import ReactMarkdown from 'react-markdown';
import {Paper, Typography} from '@mui/material';
import {Container} from '@mui/system';
import OutputSectionBar from '../components/outputSectionBar';
import AuthContext from '../context/AuthContext';
import CodeEditorWindow from '../components/CodeEditorWindow';
// import style from '../styles/style.css';

const statementSize = {
  height: '92vh',
  width: '41.6vw',
  overflow: 'scroll',
};

const outputSize = {
  height: '3vh',
  width: '55vw',
  overflow: 'scroll',
};

const tracebackSize = {
  height: '13vh',
  width: '55vw',
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
function StudentPage() {
  const userInfos = {
    score: 5893,
    rank: 2,
  };

  const {user, logoutUser, authTokens} = useContext(AuthContext);

  const [code, setCode] = useState(
      '# Enter your code here! \n# Your'+
      ' function have to be named f \n \n# def f():',
  );
  const [listExercises, setListExercises] = useState([{statement: ''}]);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [activeExerciseStatement, setActiveExerciseStatement]= useState('');
  const [results, setResults] = useState([[], [], []]);

  const fetchExercises = async () => {
    const response = await fetch(
        'http://localhost:8000/exercise/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
          body: JSON.stringify({
            'classroom': user.user_info.classroom,
          }),
        },
    );
    if (response.status === 200) {
      const content = await response.json();
      setListExercises(content);
    } else {
      alert('Didn\'t work');
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    setActiveExerciseStatement(listExercises[activeExerciseIndex].statement);
  }, [activeExerciseIndex, listExercises]);

  useEffect(() => {
    const interval = setInterval(fetchExercises, 10000);
    return () => clearInterval(interval);
  }, [listExercises]);

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
    console.log(user.user_info);
    const response = await fetch(
        'http://localhost:8000/solution/create/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access),
          },
          body: JSON.stringify({
            'student': user.user_id,
            'exercise': activeExerciseIndex + 1,
            'source': code,
          }),
        },
    );
    if (response.status === 200) {
      const content = await response.json();
      setResults(content);
    } else {
      alert('Didn\'t work');
    }
  };

  return (
    <div>
      <ResponsiveAppBar
        user={user}
        fixedUserInfos={userInfos}
        listExercises={listExercises}
        logoutUserStudent={logoutUser}
        activeExercise={activeExerciseIndex}
        setActiveExercise={setActiveExerciseIndex}
      />
      <Grid2 container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}>
        <Grid2 xs={5}>
          <Paper elevation={3} style={statementSize}
            sx={{backgroundColor: 'secondary.main'}}>
            <ReactMarkdown
              children={activeExerciseStatement}
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
                height: '68%',
                padding: '0px',
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
                  sx={{backgroundColor: results[2]==true ? 'green' : 'red'}}
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
                    {results[2]==true ? 'Congratulations !! ': 'Bad output :' }
                    {results[0]}
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
                <Paper
                  elevation={3}
                  style={tracebackSize}
                  sx={{backgroundColor: 'primary.main'}}
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
                    {results[1]}
                  </Typography>
                </Paper>
              </Container>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};
export default StudentPage;
