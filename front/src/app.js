import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import {AuthProvider} from './context/AuthContext';

import SignInOutContainer from './containers/index';
import RegisterContainer from './containers/register';
// import StudentPage from './containers/studentPage';

import './styles/style.scss';
import TeacherIndex from './containers/TeacherIndex';


const App = () => {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Route component={SignInOutContainer} path="/" exact />
          <Route component={RegisterContainer} path="/register" />
          <PrivateRoute component={TeacherIndex} path="/teacher" />
        </AuthProvider>
      </Router>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
