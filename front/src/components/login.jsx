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

import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import { Tabs, TabList, Tab } from '@mui/joy';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

import Logo from '../assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardTeacher, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
    const paperStyle = {
        padding: 20,
        height: '80vh',
        minHeight: 550,
        width: 450,
        margin: "10vh auto"
    }
    const buttonStyle = {
        margin: "8px 0"
    }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <img src={Logo} alt="Logo Cooding" />
                <HomeTabs />
                <Grid align="center">
                    <h2>Connexion</h2>
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

const HomeTabs = () => {
    const iconSize = "lg"
    return (
        <StyledEngineProvider injectFirst>
            <CssVarsProvider>
                <Tabs aria-label="Icon tabs" defaultValue={0} sx={{ borderRadius: 'lg' }}>
                    <TabList>
                        <Tab orientation="vertical">
                            <ListItemDecorator>
                                <FontAwesomeIcon icon={faGraduationCap} size={iconSize} />
                            </ListItemDecorator>
                            Elève
                        </Tab>
                        <Tab orientation="vertical">
                            <ListItemDecorator>
                                <FontAwesomeIcon icon={faChalkboardTeacher} size={iconSize} />
                            </ListItemDecorator>
                            Professeur
                        </Tab>
                    </TabList>
                </Tabs >
            </CssVarsProvider>
        </StyledEngineProvider>
    )
}

export default Login;