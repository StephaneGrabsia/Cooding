import React from 'react';
import Editor from '@monaco-editor/react';
import {Grid, Paper, TextField, Button, Typography} from '@mui/material';
import AuthContext from '../../context/AuthContext';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {Stack} from '@mui/system';

const codeEditorSize = {
  height: '400px',
  marginTop: '20px',
  padding: '10px',
  border: '2px solid',
};

/**
 * Component coding the teacher register form.
 * Render the form
 * @return {Component} A component
 */
class ExerciseForm extends React.Component {
  static contextType = AuthContext;
  /**
   * Constructor of the component
   * Setting up the state, and utils functions
   */
  constructor() {
    super();
    this.state = {
      fields: {
        firstName: '',
        lastName: '',
        gender: '',
        userName: '',
        password: '',
        passwordConfirmation: '',
        checkbox: false,
      },
      errors: {},
      mainError: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm =
      this.submituserRegistrationForm.bind(this);
  }
  /**
   * handleChange function
   * set correct values to what user put in fields in state
   * @argument {Event} e : event called onChange
   */
  handleChange(e) {
    const fields = this.state.fields;
    if (e.target.name === 'checkbox') {
      fields[e.target.name] = e.target.checked;
    } else {
      fields[e.target.name] = e.target.value;
    }
    this.setState({fields});
  }

  /**
   * setErrorMessage function
   * set a main message error when needed
   * @argument {string} text : text to display
   */
  setErrorMessage(text) {
    const mainError = text;
    this.setState({
      mainError: mainError,
    });
  }

  /**
   * submituserRegistrationForm function
   * called at the submition of the form
   * check if the form is valid and return the error message if there is one
   * @argument {Event} e : event called onSubmit
   */
  submituserRegistrationForm(e) {
    const {registerUserTeacher} = this.context;
    e.preventDefault();
    if (this.validateForm()) {
      registerUserTeacher(e).then((a) => {
        this.setErrorMessage(a);
      });
    }
  }

  /**
   * validateForm function
   * Called when onSubmit and check if the form is valid
   * @return {boolean} true if its valid, false else
   */
  validateForm() {
    const fields = this.state.fields;
    const errors = {};
    let formIsValid = true;

    if (!fields['firstName']) {
      formIsValid = false;
      errors['firstName'] = '*Merci d\'entrer un prénom';
    }

    if (typeof fields['firstName'] !== 'undefined') {
      if (!fields['firstName'].match(/^[a-zA-Z-]+$/)) {
        formIsValid = false;
        errors['firstName'] =
          '*Merci d\'utiliser uniquement des caractères alphabétiques';
      }
    }

    if (!fields['lastName']) {
      formIsValid = false;
      errors['lastName'] = '*Merci d\'entrer un nom';
    }

    if (typeof fields['lastName'] !== 'undefined') {
      if (!fields['lastName'].match(/^[a-zA-Z-]+$/)) {
        formIsValid = false;
        errors['lastName'] =
          '*Merci d\'utiliser uniquement des caractères alphabétiques';
      }
    }

    if (!fields['gender']) {
      formIsValid = false;
      errors['gender'] = '*Merci de préciser votre genre';
    }

    if (!fields['userName']) {
      formIsValid = false;
      errors['userName'] = '*Merci d\'entrer un nom d\'utilisateur';
    }

    if (typeof fields['username'] !== 'undefined') {
      if (!fields['username'].match(/^[a-zA-Z-]+$/)) {
        formIsValid = false;
        errors['username'] =
          '*Merci d\'utiliser uniquement des caractères alphabétiques';
      }
    }

    if (!fields['password']) {
      formIsValid = false;
      errors['password'] = '*Merci d\'entrer votre mot de passe';
    }

    if (typeof fields['password'] !== 'undefined') {
      if (!fields['password'].match(/^(?=.*[A-Z])(?=.{5,}).*$/)) {
        formIsValid = false;
        errors['password'] =
          '*Merci d\'entrer un mot de passe avec au moins' +
          '5 caractères et une majuscule';
      }
    }

    if (!fields['passwordConfirmation']) {
      formIsValid = false;
      errors['passwordConfirmation'] = '*Merci de confirmer votre mot de passe';
    }

    if (typeof fields['passwordConfirmation'] !== 'undefined') {
      if (fields['passwordConfirmation'] !== fields['password']) {
        formIsValid = false;
        errors['passwordConfirmation'] =
          '*Les mots de passe ne correspondent pas';
      }
    }

    if (!fields['checkbox']) {
      formIsValid = false;
      errors['checkbox'] = '*Merci d\'accepter les conditions';
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
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
            <form onSubmit={this.submituserRegistrationForm}>
              <TextField
                id="standard-basic"
                variant="filled"
                margin="dense"
                label="Sujet de l'exercice (en MarkDown)"
                name="statement"
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
                  defaultValue="#Insert here your code ;)!"
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
                fullWidth
              />
              <TextField
                id="standard-basic"
                variant="filled"
                margin="dense"
                label="Sortie attendue (Sortie exacte du shell)"
                name="correct_output"
                fullWidth
              />
              <Stack direction="row" spacing={2} mt={2}>
                <Button type="submit" color="primary" variant="contained">
                  Créer l'exercice
                </Button>
                <Button variant="outlined" color="error">
                  Supprimer l'exercice
                </Button>
              </Stack>
            </form>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default ExerciseForm;
