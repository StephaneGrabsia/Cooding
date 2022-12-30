import React, { useContext } from 'react';
import {
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  Checkbox,
  Link,
  Typography,
} from '@mui/material';
import AuthContext from '../context/AuthContext';



class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        firstName: "",
        lastName: "",
        gender: "",
        userName: "",
        password: "",
        passwordConfirmation: ""
      },
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  };

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["firstName"] = "";
      fields["lastName"] = "";
      fields["gender"] = "";
      fields["userName"] = "";
      fields["password"] = "";
      fields["passwordConfirmation"] = "";
      this.setState({ fields: fields });
      alert("Form submitted");
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["firstName"]) {
      formIsValid = false;
      errors["firstName"] = "*Merci d'entrer un prénom";
    }

    if (typeof fields["firstName"] !== "undefined") {
      if (!fields["firstName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstName"] = "*Merci d'utiliser uniquement que des caractères alphabétiques";
      }
    }

    if (!fields["lastName"]) {
      formIsValid = false;
      errors["lastName"] = "*Merci d'entrer un nom";
    }

    if (typeof fields["lastName"] !== "undefined") {
      if (!fields["lastName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastName"] = "*Merci d'utiliser uniquement que des caractères alphabétiques";
      }
    }

    if (!fields["gender"]) {
      formIsValid = false;
      errors["gender"] = "*Merci de préciser votre genre";
    }

    if (!fields["userName"]) {
      formIsValid = false;
      errors["userName"] = "*Merci d'entrer un nom d'utilisateur";
    }

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username"] = "*Merci d'utiliser uniquement que des caractères alphabétiques";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Merci d'entrer votre mot de passe";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^(?=.*[A-Z])(?=.{5,}).*$/)) {
        formIsValid = false;
        errors["password"] = "*Merci d'entrer un mot de passe avec au moins 5 caractères et une majuscule";
      }
    }

    if (!fields["passwordConfirmation"]) {
      formIsValid = false;
      errors["passwordConfirmation"] = "*Merci de confirmer votre mot de passe";
    }

    if (typeof fields["passwordConfirmation"] !== "undefined") {
      if (fields["passwordConfirmation"] !== fields["password"]) {
        formIsValid = false;
        errors["passwordConfirmation"] = "*Les mots de passe ne correspondent pas";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    const paperStyle = {
      padding: 20,
      height: '80vh',
      minHeight: 550,
      width: 450,
      margin: '0',
    };
    return (
      <Grid>
        <Paper elevation={0} style={paperStyle}>
          <Grid align='center'>
            <Typography variant="h5">Créer un compte</Typography>
            <Typography variant='caption'>
              Remplir ce formulaire pour créer votre compte professeur !
            </Typography>
            <br />
            <br />
            <Link href='/'>Retour à l'acueil</Link>
          </Grid>
          <Grid>
            <form onSubmit={this.submituserRegistrationForm}>
              <TextField
                id="standard-basic"
                variant="standard"
                margin="dense"
                label="Nom"
                name='firstName'
                value={this.state.fields.firstName}
                onChange={this.handleChange}
                fullWidth
                error={this.state.errors.firstName ? true : false}
                helperText={this.state.errors.firstName}
              />
              <TextField
                id="standard-basic"
                variant="standard"
                margin="dense"
                label="Prénom"
                name='lastName'
                value={this.state.fields.lastName}
                onChange={this.handleChange}
                fullWidth
                error={this.state.errors.lastName ? true : false}
                helperText={this.state.errors.lastName}
              />
              <FormControl margin="normal">
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                >
                  Genre
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  value={this.state.fields.gender}
                  onChange={this.handleChange}
                  error="true"
                >
                  <FormControlLabel
                    value="Homme"
                    control={<Radio />}
                    label="Homme"
                  />
                  <FormControlLabel
                    value="Femme"
                    control={<Radio />}
                    label="Femme"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                id="standard-basic"
                variant="standard"
                label="Nom d'utilisateur"
                name='userName'
                value={this.state.fields.userName}
                onChange={this.handleChange}
                fullWidth
                error={this.state.errors.userName ? true : false}
                helperText={this.state.errors.userName}
              />
              <TextField
                id="standard-basic"
                variant="standard"
                margin="dense"
                label="Mot de passe"
                name='password'
                fullWidth
                value={this.state.fields.password}
                onChange={this.handleChange}
                error={this.state.errors.password ? true : false}
                helperText={this.state.errors.password}
              />
              <TextField
                id="standard-basic"
                variant="standard"
                margin="dense"
                label="Confirmation mot de passe"
                name='passwordConfirmation'
                value={this.state.fields.passwordConfirmation}
                onChange={this.handleChange}
                fullWidth
                error={this.state.errors.passwordConfirmation ? true : false}
                helperText={this.state.errors.passwordConfirmation}
              />
              <FormControlLabel
                control={<Checkbox
                  name="CheckedA" />}
                label={<Typography
                >
                  J'accèpte les
                  <Link href="#">
                    conditions générales
                  </Link>
                </Typography>}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
              >
                Créer mon compte
              </Button>
            </form>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}


const SignUp = () => {
  const paperStyle = {
    padding: 20,
    height: '80vh',
    minHeight: 550,
    width: 450,
    margin: '0',
  };
  const textBoxStyle = {
    margin: '8px 0',
  };
  const { registerUser } = useContext(AuthContext);
};

export default RegisterForm;
