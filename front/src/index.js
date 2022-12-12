import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/style.css'
import './styles/style.scss';
import StudentPage from './containers/studentPage';

import {createTheme, ThemeProvider} from '@mui/material/styles';


const theme = createTheme({
  palette: {
    tertianary: {
      light: '#1698F9',
      main: '#1698F9',
      dark: '#1698F9',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FAB208',
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
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <StudentPage/>
      </ThemeProvider>
    </div>);
};

ReactDOM.render(<App />, document.getElementById('root'));
