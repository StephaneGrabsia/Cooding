import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import {AuthProvider} from './context/AuthContext';

import SignInOutContainer from './containers/index';
import RegisterContainer from './containers/register';
import StudentPage from './containers/studentPage';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import './styles/style.scss';
import TeacherIndex from './containers/TeacherIndex';

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
    <div className='App'>
      <Router>
        <AuthProvider>
          <Route component={SignInOutContainer} path="/" exact />
          <Route component={RegisterContainer} path="/register" />
          <PrivateRoute component={TeacherIndex} path="/teacher" />
          <Route path="/student">
            <ThemeProvider theme={theme}>
              <StudentPage exercice={exercice}/>
            </ThemeProvider>
          </Route>
        </AuthProvider>
      </Router>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
