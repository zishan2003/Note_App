import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Notecontent.css";
import axios from "axios";

const Notecontent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getDataApi = async () => {
      let apiData = await axios.get(
        "https://note-app-smtk.onrender.com/api/note/getall",
        {
          withCredentials: true,
        },
      );
      setData(apiData.data);
    };
    getDataApi();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(
        `https://note-app-smtk.onrender.com/api/note/delete/${id}`,
        {
          withCredentials: true,
        },
      );
      setData((prev) => {
        return prev.filter((note) => note._id !== id);
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Delete failed");
    }
  };

  return (
    <>
      <h3 style={{ position: "relative", bottom: "7rem" }}>{error}</h3>
      <div className="container">
        {data.map((elem) => (
          <div className="card" key={elem._id}>
            <h1>{elem.title}</h1>
            <p>{elem.content}</p>
            <button
              onClick={() => {
                deleteHandler(elem._id);
              }}
            >
              Delete
            </button>
            <Link to={`/${elem._id}/edit`}>Edit Note</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notecontent;
