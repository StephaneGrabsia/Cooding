import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../context/AuthContext';


const PrivateRoute = ({children, ...rest}) => {
  const {user} = useContext(AuthContext);
  return (
    < Route {...rest}>
      {!user ? <Redirect to="/" /> : children}
    </Route >
  );
};

export default PrivateRoute;