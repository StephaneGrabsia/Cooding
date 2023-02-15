import React from 'react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import AuthContext from '../../context/AuthContext';
import {Stack} from '@mui/system';


// eslint-disable-next-line valid-jsdoc
/**
 * Component coding the teacher register form.
 * Render the form
 * @return {Component} A component
 */
class ClassroomForm extends React.Component {
  static contextType = AuthContext;

  /**
   * Constructor of the component
   * Setting up the state, and utils functions
   * @param {props} props props
   */
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        room_id: '',
      },
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
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
   * submitForm function
   * called at the submition of the form
   * check if the form is valid and return the error message if there is one
   * @argument {Event} e : event called onSubmit
   */
  submitForm = async (e) => {
    const {user, authTokens} = this.context;
    e.preventDefault();
    if (this.validateForm()) {
      const myBody = {
        room_id: this.state.fields['room_id'],
        teacher: user.user_id,
      };
      const response = await fetch('http://localhost:8000/room/create/', {
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

  /**
   * validateForm function
   * Called when onSubmit and check if the form is valid
   * @return {boolean} true if its valid, false else
   */
  validateForm() {
    const fields = this.state.fields;
    const errors = {};
    let formIsValid = true;

    if (!fields['room_id']) {
      formIsValid = false;
      errors['room_id'] = '*Merci de préciser l\'id de la classroom';
    }

    if (typeof fields['room_id'] !== 'undefined') {
      if (!fields['room_id'].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors['classroom_id'] =
          '*Merci d\'utiliser uniquement un entier naturel';
      }
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  };

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
              <Typography>
                Indiquer le numéro de la classroom (entier naturel):
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  id="outlined-number"
                  label="Number"
                  type="number"
                  name="room_id"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={this.state.errors.classroom_id ? true : false}
                  helperText={this.state.errors.classroom_id}
                  sx={{marginTop: '30px'}}
                />
              </Box>

              <br />
              <br />
              <Stack direction="row" spacing={2} mt={2}>
                <Button type="submit" color="primary" variant="contained">
                    Créer la classroom
                </Button>
              </Stack>
            </form>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default ClassroomForm;
