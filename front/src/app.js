import React from 'react';
import {createRoot} from 'react-dom/client';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import SignInOutContainer from './containers';
// import StudentPage from './containers/studentPage';

import './styles/style.scss';

const theme = createTheme({
  palette: {
    tertianary: {
      light: '#ADE6FF',
      main: '#1698F9',
      dark: '#1670F9',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFD290',
      main: '#F9A429',
      dark: '#D78E32',
      contrastText: '#fff',
    },
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#000',
    },
  },
});

const App = () => {
  const exercice = {
    content: '# Exercice 1',
  };
  return (
    <div>
      <SignInOutContainer />
      <ThemeProvider theme={theme}>
        <StudentPage exercice={exercice}/>
      </ThemeProvider>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);
