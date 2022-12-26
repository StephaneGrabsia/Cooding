import React, {useContext} from 'react';
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
  const {registerUser} = useContext(AuthContext);
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
          <form onSubmit={registerUser}>
            <TextField
              id="standard-basic"
              label="Nom"
              placeholder="Dormieux"
              variant="standard"
              fullWidth
              style={textBoxStyle}
              name='lastName'
            />
            <TextField
              id="standard-basic"
              label="Prénom"
              placeholder="Luc"
              variant="standard"
              fullWidth
              style={textBoxStyle}
              name='firstName'
            />
            <FormControl>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                style={textBoxStyle}
              >
                Genre
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
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
              label="Nom d'utilisateur"
              placeholder="Luluc"
              variant="standard"
              fullWidth
              style={textBoxStyle}
              name='username'
            />
            <TextField
              id="standard-basic"
              label="Mot de passe"
              placeholder="MonMotDePasser123!!"
              variant="standard"
              fullWidth
              style={textBoxStyle}
              name='password'
            />
            <TextField
              id="standard-basic"
              label="Confirmation mot de passe"
              variant="standard"
              fullWidth
              style={textBoxStyle}
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
              style={textBoxStyle}
            >
              Créer mon compte
            </Button>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SignUp;
