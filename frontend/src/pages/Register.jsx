import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const Navigate = useNavigate();

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      let apiData = await axios.post(
        "https://note-app-smtk.onrender.com/api/user/register",
        { name, email, password },
        { withCredentials: true },
      );
      Navigate("/");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err ? err.response.data.msg : "Something went wrong");
    }
  };

  const inputNameHandler = (e) => {
    setName(e.target.value);
  };

  const inputEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const inputPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <div className="box1">
        <img
          src="/signupimg.webp"
          style={{ height: "35rem", width: "30rem" }}
        />
      </div>
      <div className="box2">
        <form onSubmit={formHandler}>
          <h3>{error}</h3>
          <div className="h1">
            <h1>Sign up to your Account</h1>
            <span>
              <p>Create an account or </p>
              <Link to={"/login"}>Log in</Link>
            </span>
          </div>
          <label htmlFor="name">Name</label>
          <br></br>
          <input
            type="text"
            placeholder="enter your name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              inputNameHandler(e);
            }}
          />
          <br></br>
          <br></br>
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
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
