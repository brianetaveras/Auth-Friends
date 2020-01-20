import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Redirect } from "react-router-dom";

const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100%;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.2);
  margin: 25% auto;
  padding: 20px;
`;

const LoginInput = styled.input`
  width: 90%;
  margin: 0 auto;
  height: 50px;
  padding: 5px;
  margin: 10px 0;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`;
const LoginButton = styled.button`
  width: 90%;
  height: 50px;
  padding: 5px;
`;

const Feedback = styled.span`
  color: red;
  display: block;
`;

const LogIn = () => {
  const [userInfo, setUserInfo] = useState({
      isLoading: false
  });

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
    console.log(userInfo);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (userInfo.email && userInfo.password) {
      setUserInfo({
        ...userInfo,
        feedback: "",
        isLoading: true
      });
      axios
        .post("http://localhost:5000/api/login", {
          username: userInfo.email,
          password: userInfo.password
        })
        .then(res => {
          localStorage.setItem("token", res.data.payload);
          setUserInfo({
              ...userInfo,
              isLoading: false
          })
        })
        .catch(err => {
          setUserInfo({
            ...userInfo,
            feedback: err.mesage
          });
        });
    } else {
      setUserInfo({
        ...userInfo,
        feedback: "All fields must be completed"
      });
    }
  };

  const isLogged = localStorage.getItem("token");


  return isLogged ? (
    <Redirect to="/" />
  ) : (
    <div className="login">
      <LoginBox>
        <div className="Login">Login</div>
        <form onSubmit={handleSubmit}>
          <LoginInput
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="Email"
          />
          <LoginInput
            onChange={handleChange}
            name="password"
            type="text"
            placeholder="Password"
          />
          {userInfo.feedback ? <Feedback>{userInfo.feedback}</Feedback> : ""}
          <LoginButton>{userInfo.isLoading ? "Loading..." : "Log In"}</LoginButton>
        </form>
      </LoginBox>
    </div>
  );
};

export default LogIn;
