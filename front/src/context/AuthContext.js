import React from "react";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);
  const history = useHistory();

  const registerUserTeacher = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/teacher/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: e.target.userName.value,
        password: e.target.password.value,
        teacher_profile: {
          first_name: e.target.firstName.value,
          last_name: e.target.lastName.value,
          gender: e.target.gender.value,
        },
      }),
    });
    if (response.status === 200) {
      history.push("/");
      return "";
    }
    if (response.status === 400) {
      return "Ce nom d'utilisateur existe déjà !";
    }
  };

  const loginUserStudent = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/student/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.classroom_id.value,
        student_profile: { classroom: e.target.classroom_id.value },
      }),
    });
    // If the registration went well, we only log the user
    if (response.status === 200) {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.classroom_id.value,
        }),
      });
      if (response.status === 200) {
        const response = await fetch("http://localhost:8000/student/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.status === 200) {
          const content = await response.json();
          setUser(content);
          localStorage.setItem("userProfile", JSON.stringify(content));
        }
        history.push("/student");
      } else {
        alert("EROOR TODO");
      }
    }
    // Else if the username is already registered in the room
    if (response.status === 400) {
      alert("Cet utilisateur est déjà présent dans la classroom");
    }
  };

  const loginUserTeacher = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200 && jwt_decode(data.access).role == "TEACHER") {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/teacher");
    } else {
      alert("EROOR TODO");
    }
  };

  const logoutUser = async () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    history.push("/");
  };

  const updateToken = async () => {
    const response = await fetch("http://localhost:8000/login/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUserTeacher: loginUserTeacher,
    loginUserStudent: loginUserStudent,
    logoutUser: logoutUser,
    registerUserTeacher: registerUserTeacher,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
