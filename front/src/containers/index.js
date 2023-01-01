import React from 'react';
import {Grid, Paper, Tabs, Tab, Box} from '@mui/material';

import {StudentLogin, TeacherLogin} from '../components/login_forms';

import Logo from '../assets/logo.svg';
import Background from '../assets/background.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faPersonChalkboard,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Component coding the index tabs
 * @param {Dict} props contains the value and index of the tab.
 * @return {Component} A component
 */
function TabPanel(props) {
  const {children, value, index, ...other} = props;

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
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const paperStyle = {
  height: '80vh',
  minHeight: 550,
  width: 500,
  margin: '10vh auto',

};
const imgStyle = {
  width: '70%',
  margin: '20px auto',
};

/**
 * Component coding the main index
 * login of student and teacher
 * @return {Component} A component
 */
const SignInOutContainer = ({message}) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div style={{
      overflow: 'auto',
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <img src={Logo} style={imgStyle} />
        </Grid>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab
            icon={<FontAwesomeIcon
              icon={faGraduationCap}
            />}
            iconPosition="start"
            label="Etudiants"
          />
          <Tab
            icon={<FontAwesomeIcon
              icon={faPersonChalkboard}
            />}
            iconPosition="start"
            label="Professeur"
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <StudentLogin />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TeacherLogin />
        </TabPanel>
      </Paper>
    </div>
  );
};

export default SignInOutContainer;
