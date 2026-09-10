import React from "react";
import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Navbar = () => {
  const [logout, setLogout] = useState("");
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const logoutApi = await axios.post(
        "http://localhost:3000/api/user/logout",
        {},
        {
          withCredentials: true,
        },
      );

      setLogout(logoutApi.data.msg);
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <img src="/notePic.webp" />

      <div className="navPages">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign up</Link>

        <button className="logout-btn" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
