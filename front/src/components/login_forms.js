import React, {useContext} from 'react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Link,
  Typography,
} from '@mui/material';
import AuthContext from '../context/AuthContext';

const paperStyle = {
  padding: 20,
  height: '45vh',
  margin: '0',
};

const buttonStyle = {
  margin: '8px 0',
};

/**
 * Component coding the student login form
 * Render the component
 * @return {Component} A component
 */
export class StudentLogin extends React.Component {
  static contextType = AuthContext;

  /**
   * Constructor of the component
   * Setting up the state, and utils functions
   */
  constructor() {
    super();
    this.state = {
      fields: {
        classroom_id: '',
        username: '',
      },
      errors: {},
      mainError: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.submituserLoginForm = this.submituserLoginForm.bind(this);
  }
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
   * submituserLoginForm function
   * called at the submition of the form
   * check if the form is valid and return the error message if there is one
   * @argument {Event} e : event called onSubmit
   */
  submituserLoginForm(e) {
    const {loginUserStudent} = this.context;
    e.preventDefault();
    if (this.validateForm()) {
      loginUserStudent(e).then((a) => {
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

    if (!fields['classroom_id']) {
      formIsValid = false;
      errors['classroom_id'] = '*Merci de préciser l\'id de la classroom';
    }

    if (typeof fields['classroom_id'] !== 'undefined') {
      if (!fields['classroom_id'].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors['classroom_id'] =
          '*Merci d\'utiliser uniquement un entier naturel';
      }
    }

    if (!fields['username']) {
      formIsValid = false;
      errors['username'] = '*Merci d\'entrer un pseudo';
    }

    if (typeof fields['username'] !== 'undefined') {
      if (!fields['username'].match(/^[a-zA-Z-]+$/)) {
        formIsValid = false;
        errors['username'] =
          '*Merci d\'utiliser uniquement des caractères alphabétiques';
      }
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
    return (
      <Grid>
        <Paper elevation={0} style={paperStyle}>
          <Grid align="center">
            <Typography variant="h5">Rejoindre une session</Typography>
            <Typography color="red">{this.state.mainError}</Typography>
          </Grid>
          <Grid>
            <form onSubmit={this.submituserLoginForm}>
              <TextField
                id="standard-basic"
                label="Room id"
                placeholder="Entrer l'id de la room"
                variant="standard"
                fullWidth
                name="classroom_id"
                onChange={this.handleChange}
                style={buttonStyle}
                value={this.state.fields.classroom_id}
                error={this.state.errors.classroom_id ? true : false}
                helperText={this.state.errors.classroom_id}
              />
              <TextField
                id="standard-basic"
                label="Pseudo"
                placeholder="Entrer un Pseudo"
                variant="standard"
                fullWidth
                name="username"
                style={buttonStyle}
                onChange={this.handleChange}
                value={this.state.fields.username}
                error={this.state.errors.username ? true : false}
                helperText={this.state.errors.username}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                style={buttonStyle}
              >
                Rejoindre
              </Button>
            </form>
            <Typography style={buttonStyle}>
              {' '}
              Vous avez&ensp;
              <Link href="#">un problème ?</Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export const TeacherLogin = () => {
  const {loginUserTeacher} = useContext(AuthContext);
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h5">Connexion</Typography>
        </Grid>
        <Grid>
          <form onSubmit={loginUserTeacher}>
            <TextField
              id="standard-basic"
              label="Nom d'utilisateur"
              placeholder="Entrer votre nom d'utilisateur"
              variant="standard"
              fullWidth
              name="username"
              style={buttonStyle}
            />
            <TextField
              id="standard-basic"
              label="Mot de passe"
              placeholder="Entrer votre mot de passe"
              variant="standard"
              type="password"
              fullWidth
              name="password"
              style={buttonStyle}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={buttonStyle}
            >
              Rejoindre
            </Button>
          </form>
          <Link href="#">Mot de passe oublié ?</Link>
          <Typography style={buttonStyle}>
            Pas de compte ?&ensp;
            <Link href="/register">Créer mon compte</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};
