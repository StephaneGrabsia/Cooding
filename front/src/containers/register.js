import React from 'react';
import {Paper} from '@mui/material';

import SignUp from '../components/register_form';
import Background from '../assets/background.svg';

const paperStyle = {
  height: '88vh',
  minHeight: 620,
  width: 490,
  margin: '10vh auto',
};

const RegisterContainer = () => {
  return (
    <div style={{
      overflow: 'auto',
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Paper elevation={10} style={paperStyle}>
        <SignUp />
      </Paper>
    </div>
  );
};

export default RegisterContainer;
