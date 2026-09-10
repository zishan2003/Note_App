import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = ({setIsLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const Navigate = useNavigate();

  const inputEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const inputPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      let apiData = await axios.post(
        "http://localhost:3000/api/user/login",
        { email, password },
        { withCredentials: true },
      );
      Navigate("/");
    } catch (err) {
      setError(err ? err.response.data.msg : "Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="box1">
        <img src="/noteimg.webp" />
      </div>
      <div className="box2">
        <form onSubmit={formHandler}>
          <h3>{error}</h3>
          <div className="h1">
            <h1>Login to your Account</h1>
            <span>
              <p>Doesn't have an account?</p>
              <Link to={"/register"}>Sign up</Link>
            </span>
          </div>
          <label htmlFor="email">Email</label>
          <br></br>
          <input
            type="email"
            placeholder="enter email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              inputEmailHandler(e);
            }}
          />
          <br></br>
          <br></br>
          <label htmlFor="password">Password</label>
          <br></br>
          <input
            type="password"
            placeholder="enter password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              inputPasswordHandler(e);
            }}
          />
          <br></br>
          <br></br>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
