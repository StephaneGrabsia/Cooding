import React from 'react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
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
                Indiquer le numéro de la classroom (entier entre 1 et 1000) :
              </Typography>
              <TextField
                id="outlined-number"
                label="Number"
                type="number"
                name="room_id"
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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
