import React from "react";
import { Grid, Paper, Tabs, Tab, Box, Typography} from "@mui/material";

import {StudentLogin, TeacherLogin} from "../components/login_forms"

import Logo from '../assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons'


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

const paperStyle = {
        height: '80vh',
        minHeight: 610,
        width: 500,
        margin: "10vh auto"

}
const imgStyle = {
    width: "70%",
    margin: "20px auto"
}

const SignInOutContainer = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    return (
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <img src={Logo} style={imgStyle}/>
                </Grid>
                
                <Tabs 
                value={value} 
                onChange={handleChange}
                aria-label="disabled tabs example"
                centered
             >
                    <Tab icon={<FontAwesomeIcon icon={faGraduationCap} />} iconPosition="start" label="Etudiants" />
                    <Tab icon={<FontAwesomeIcon icon={faPersonChalkboard} />} iconPosition="start"label="Professeur" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <StudentLogin />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TeacherLogin />
                </TabPanel>
            </Paper>
    )
}

export default SignInOutContainer;