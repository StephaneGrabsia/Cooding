/* eslint-disable react/no-children-prop */
import React, {useContext, useState, useEffect} from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import ResponsiveAppBar from '../components/appBar';
import ReactMarkdown from 'react-markdown';
import Editor from '@monaco-editor/react';
import PropTypes from 'prop-types';
import {Paper} from '@mui/material';
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
    name: 'GOAT',
    score: 5893,
    rank: 2,
  };
  const sessionInfo = {
    pages: ['Exo 1', 'Exo 2', 'Exo 3', 'Exo 4'],
  };
  const {user, logoutUser, authTokens} = useContext(AuthContext);

  const [code, setCode] = useState('#enter your code here!');
  const [listExercises, setListExercises] = useState([{statement: ''}]);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [activeExerciseStatement, setActiveExerciseStatement]= useState('');

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
      console.log(listExercises[activeExerciseIndex]);
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
        console.log(typeof(code));
        break;
      }
      default: {
        console.warn('case not handled!', action, data);
      }
    }
  };

  const onClickSubmit = async (event) => {
    const response = await fetch(
        'http://localhost:8000/solution/create/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            'student': user.user.id,
            'exercise': 1,
            'output': '',
            'source': code,
          }),
        },
    );
    if (response.status === 200) {
      alert('Submited succesfully');
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
        session={sessionInfo}
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
