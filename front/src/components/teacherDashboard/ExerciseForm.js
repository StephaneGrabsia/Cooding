import React from 'react';
import Editor from '@monaco-editor/react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AuthContext from '../../context/AuthContext';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {Stack} from '@mui/system';

const codeEditorSize = {
  height: '400px',
  marginTop: '20px',
  padding: '10px',
  border: '2px solid',
};

// eslint-disable-next-line valid-jsdoc
/**
 * Component coding the teacher register form.
 * Render the form
 * @return {Component} A component
 */
class ExerciseForm extends React.Component {
  static contextType = AuthContext;

  /**
   * To execute before the component mounting
   * Fetch to get available classrooms
   */
  componentDidMount() {
    this.fetchClassroom();
  }
  /**
   * Constructor of the component
   * Setting up the state, and utils functions
   * @param {props} props props
   */
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        statment: this.props.exercise ? this.props.exercise.statement : '',
        solution: this.props.exercise ? this.props.exercise.solution : '',
        test_input: this.props.exercise ? this.props.exercise.test_input : '',
        correct_output: this.props.exercise ?
          this.props.exercise.correct_output :
          '',
        classroom: this.props.exercise ? this.props.exercise.classroom : '',
      },
      rooms: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  fetchClassroom = async () => {
    const {authTokens} = this.context;
    const response = await fetch('http://localhost:8000/allrooms/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
    });
    if (response.status === 200) {
      const content = await response.json();
      const state = this.state;
      state['rooms'] = content;
      this.setState(state);
      console.log(content);
    } else {
      alert('Cannot get rooms');
    }
  };

  /**
   * handleChange function
   * set correct values to what user put in fields in state
   * @argument {Event} e : event called onChange
   */
  handleChange(e) {
    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({fields});
  }

  /**
   * handleChange for code editor
   * @argument {value} value : value to set
   */
  handleEditorChange = (value) => {
    const fields = this.state.fields;
    fields['solution'] = value;
  };

  /**
   * submitForm function
   * called at the submition of the form
   * check if the form is valid and return the error message if there is one
   * @argument {Event} e : event called onSubmit
   */
  submitForm = async (e) => {
    const {authTokens} = this.context;
    e.preventDefault();
    const myBody = {
      statement: this.state.fields['statment'],
      solution: this.state.fields['solution'],
      test_input: this.state.fields['test_input'],
      correct_output: this.state.fields['correct_output'],
      classroom: this.state.fields['classroom'],
    };
    if (this.props.exercise) {
      myBody['exo_id'] = this.props.exercise.id;
      const response = await fetch('http://localhost:8000/exercise/update/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
        body: JSON.stringify(myBody),
      });
      if (response.status === 200) {
        window.location.reload(false);
      } else {
        alert('A problem occure');
      }
    } else {
      const response = await fetch('http://localhost:8000/exercise/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
        body: JSON.stringify(myBody),
      });
      if (response.status === 200) {
        window.location.reload(false);
      } else {
        alert('A problem occure, check your classroom');
      }
    }
  };

  deleteExercise = async (e) => {
    const {authTokens} = this.context;
    e.preventDefault();
    const response = await fetch('http://localhost:8000/exercise/delete/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
      body: JSON.stringify({
        exo_id: this.props.exercise.id,
      }),
    });
    if (response.status === 200) {
      window.location.reload(false);
    } else {
      alert('A problem occure');
    }
  };

  /**
   * submitForm function
   * called at the submition of the form
   * check if the form is valid and return the error message if there is one
   * @return {Component} the toogle list of classroom
   */
  classroomList() {
    this.fetchClassroom();
    return <div>hello</div>;
  }

  /**
   * render function
   * Render the final form
   * @return {Component}
   */
  render() {
    const paperStyle = {
      padding: 20,
      margin: '0',
    };
    return (
      <Grid>
        <Paper elevation={0} style={paperStyle}>
          <Grid>
            <form onSubmit={this.submitForm}>
              <TextField
                id="standard-basic"
                variant="filled"
                margin="dense"
                label="Sujet de l'exercice (en MarkDown)"
                name="statment"
                defaultValue={this.state.fields['statment']}
                onChange={this.handleChange}
                fullWidth
                multiline
                maxRows={10}
              />
              <br />
              <br />
              <Typography>Solution de l'exercice :</Typography>
              <Grid2 style={codeEditorSize}>
                <Editor
                  defaultLanguage="python"
                  value={this.state.fields['solution']}
                  onChange={this.handleEditorChange}
                  options={{
                    minimap: {
                      enabled: false,
                    },
                    fontSize: 14,
                    cursorStyle: 'block',
                    wordWrap: 'on',
                  }}
                />
              </Grid2>
              <TextField
                id="standard-basic"
                variant="filled"
                margin="dense"
                label="Input à tester (bien respecter le format)"
                name="test_input"
                defaultValue={this.state.fields['test_input']}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="standard-basic"
                variant="filled"
                margin="dense"
                label="Sortie attendue (Sortie exacte du shell)"
                name="correct_output"
                defaultValue={this.state.fields['correct_output']}
                onChange={this.handleChange}
                fullWidth
              />
              <br />
              <br />
              <FormControl fullWidth>
                <InputLabel id="standard-basic">Salle de classe</InputLabel>
                <Select
                  id="standard-basic"
                  variant="filled"
                  value={this.state.fields['classroom']}
                  onChange={this.handleChange}
                  name="classroom"
                >
                  {this.state.rooms.map((room) => (
                    <MenuItem key={room.room_id} value={room.room_id}>
                      Classe numéro {room.room_id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack direction="row" spacing={2} mt={2}>
                <Button type="submit" color="primary" variant="contained">
                  {this.props.exercise ?
                    'Modifier l\'exercice' :
                    'Créer l\'exercice'}
                </Button>
                {this.props.exercise ? (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={this.deleteExercise}
                  >
                    Supprimer l'exercice
                  </Button>
                ) : (
                  ''
                )}
              </Stack>
            </form>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default ExerciseForm;
