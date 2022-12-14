import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/style.css'
import './styles/style.scss';
import StudentPage from './containers/studentPage';

import {createTheme, ThemeProvider} from '@mui/material/styles';


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
    <div className="app">
      <ThemeProvider theme={theme}>
        <StudentPage exercice={exercice}/>
      </ThemeProvider>
    </div>);
};

ReactDOM.render(<App />, document.getElementById('root'));
