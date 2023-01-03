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
  minHeight: 350,
  width: 450,
  margin: '0',
};

const buttonStyle = {
  margin: '8px 0',
};

export const StudentLogin = () => {
  const {loginUserStudent} = useContext(AuthContext);
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h5">Rejoindre une session</Typography>
        </Grid>
        <Grid>
          <form onSubmit={loginUserStudent}>
            <TextField
              id="standard-basic"
              label="Room id"
              placeholder="Entrer l'id de la room"
              variant="standard"
              fullWidth
              name="classroom"
              style={buttonStyle}
            />
            <TextField
              id="standard-basic"
              label="Pseudo"
              placeholder="Entrer un Pseudo"
              variant="standard"
              fullWidth
              name="username"
              style={buttonStyle}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth style={buttonStyle}
            >
              Rejoindre
            </Button>
          </form>
          <Typography style={buttonStyle}> Vous avez&ensp;
            <Link href="#">
              un problème ?
            </Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

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
              name='username'
              style={buttonStyle}
            />
            <TextField
              id="standard-basic"
              label="Mot de passe"
              placeholder="Entrer votre mot de passe"
              variant="standard"
              type="password"
              fullWidth
              name='password'
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
          <Link href="#">
            Mot de passe oublié ?
          </Link>
          <Typography style={buttonStyle}>Pas de compte ?&ensp;
            <Link href="/register">
              Créer mon compte
            </Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};
