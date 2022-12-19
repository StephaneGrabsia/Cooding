import React from 'react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Link,
  Typography,
} from '@mui/material';

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
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h5">Rejoindre une session</Typography>
        </Grid>
        <Grid>
          <TextField
            id="standard-basic"
            label="Room id"
            placeholder="Entrer l'id de la room"
            variant="standard"
            fullWidth
            style={buttonStyle}
          />
          <TextField
            id="standard-basic"
            label="Pseudo"
            placeholder="Entrer un Pseudo"
            variant="standard"
            fullWidth
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
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h5">Connexion</Typography>
        </Grid>
        <Grid>
          <TextField
            id="standard-basic"
            label="Email"
            placeholder="Entrer votre email"
            variant="standard"
            fullWidth
            style={buttonStyle}
          />
          <TextField
            id="standard-basic"
            label="Mot de passe"
            placeholder="Entrer votre mot de passe"
            variant="standard"
            type="password"
            fullWidth
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
          <Link href="#">
            Mot de passe oublié ?
          </Link>
          <Typography style={buttonStyle}>Pas de compte ?&ensp;
            <Link href="#">
              Créer mon compte
            </Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};
