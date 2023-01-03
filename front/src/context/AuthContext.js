import React from 'react';
import {createContext, useState} from 'react';
import {useHistory} from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(
      () => localStorage.getItem('userProfile') ?
      JSON.parse(localStorage.getItem('userProfile')) :
      null,
  );
  const history = useHistory();

  const registerUserTeacher = async (e) => {
    e.preventDefault();
    const response = await fetch(
        'http://localhost:8000/teacher/register/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            'user': {
              'username': e.target.userName.value,
              'password': e.target.password.value,
            },
            'first_name': e.target.firstName.value,
            'last_name': e.target.lastName.value,
            'gender': e.target.gender.value,
          }),
        },
    );
    if (response.status === 200) {
      history.push('/');
      return '';
    }
    if (response.status === 400) {
      return 'Ce nom d\'utilisateur existe déjà !';
    }
  };


  const loginUserStudent = async (e) => {
    e.preventDefault();

    const response = await fetch(
        'http://localhost:8000/student/register/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            'user': {
              'username': e.target.username.value,
              'password': e.target.classroom.value,
            },
            'classroom': e.target.classroom.value,
          }),
        },
    );
    // If the registration went well, we only log the user
    if (response.status === 200) {
      const response = await fetch(
          'http://localhost:8000/student/login/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              'username': e.target.username.value,
              'password': e.target.classroom.value,
            }),
          },
      );
      if (response.status === 200) {
        const response = await fetch(
            'http://localhost:8000/student/',
            {
              method: 'GET',
              headers: {'Content-Type': 'application/json'},
              credentials: 'include',
            });
        if (response.status === 200) {
          const content = await response.json();
          setUser(content);
          localStorage.setItem('userProfile', JSON.stringify(content));
        }
        history.push('/student');
      } else {
        alert('EROOR TODO');
      }
    }
    // Else if the username is already registered in the room
    if (response.status === 400) {
      alert('Cet utilisateur est déjà présent dans la classroom');
    }
  };

  const loginUserTeacher = async (e) => {
    e.preventDefault();
    const response = await fetch(
        'http://localhost:8000/teacher/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            'username': e.target.username.value,
            'password': e.target.password.value,
          }),
        },
    );
    if (response.status === 200) {
      const response = await fetch(
          'http://localhost:8000/teacher/',
          {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
          });
      if (response.status === 200) {
        const content = await response.json();
        setUser(content);
        localStorage.setItem('userProfile', JSON.stringify(content));
      }
      history.push('/teacher');
    } else {
      alert('EROOR TODO');
    }
  };

  const logoutUser = async (e) => {
    e.preventDefault();
    const response = await fetch(
        'http://localhost:8000/logout/', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });
    if (response.status === 200) {
      setUser(null);
      localStorage.removeItem('userProfile');
      history.push('/');
    } else {
      alert('EROOR TODO');
    }
  };

  const contextData = {
    user: user,
    loginUserTeacher: loginUserTeacher,
    loginUserStudent: loginUserStudent,
    logoutUser: logoutUser,
    registerUserTeacher: registerUserTeacher,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider >
  );
};
