import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const TeacherIndex = () => {
  const { user, logoutUser, authTokens } = useContext(AuthContext);
  let [userInfo, setUserInfo] = useState();
  useEffect(() => {
    getUserInfo();
  }, []);

  let getUserInfo = async () => {
    let response = await fetch("http://localhost:8000/teacher/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setUserInfo(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  console.log(userInfo?.teacher_profile);

  return (
    <div>
      <h1>
        {user ? "Welcome " + user.user_info.first_name : "You are not loged-in"}
      </h1>
      <p>{JSON.stringify(userInfo)}</p>
      <a href="#" onClick={logoutUser}>
        Log Out
      </a>
    </div>
  );
};

export default TeacherIndex;
