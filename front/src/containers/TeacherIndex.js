import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const TeacherIndex = () => {
    let { user, logoutUser } = useContext(AuthContext)
    return (
        <div>
            <h1>{user ? "Welcome " + user.first_name : "You are not loged-in"}</h1>
            <a href='#' onClick={logoutUser}>Log Out</a>
        </div >
    )
}

export default TeacherIndex;