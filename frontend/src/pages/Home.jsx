import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Notecontent from "../components/Notecontent";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Link to={"/createnote"}>
        <i className="fa-solid fa-plus"></i>
      </Link>
      <Notecontent />
    </>
  );
};

export default Home;
