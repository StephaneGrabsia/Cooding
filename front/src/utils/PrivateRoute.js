import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({children, userType, ...rest}) => {
  const {user} = useContext(AuthContext);
  return (
    <Route {...rest}>
      {user && userType === user.role ? children : <Redirect to="/" />}
    </Route>
  );
};

export default PrivateRoute;
