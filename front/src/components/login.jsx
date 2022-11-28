import React from "react";
import {
    Grid,
    Paper,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Link,
    Typography
} from '@mui/material';


const Login = () => {
    const paperStyle = {
        padding: 20,
        height: '70vh',
        minHeight: 470,
        width: 450,
        margin: "10vh auto"
    }
    const buttonStyle = {
        margin: "8px 0"
    }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <h1>Connexion</h1>
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Se souvenir de moi"
                    />
                    <Button type="submit" color="primary" variant="contained" fullWidth style={buttonStyle}>Rejoindre</Button>
                    <Typography style={buttonStyle}> Vous avez&ensp;
                        <Link href="#">
                            un problème ?
                        </Link>
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Login;