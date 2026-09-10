import React from "react";
import "./NoteForm.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const apiData = await axios.post(
        "http://localhost:3000/api/note/create",
        { title, content },
        { withCredentials: true },
      );
      navigate("/");
    } catch (error) {
      setError(error ? error.response.data.msg : "Something went wrong");
    }
  };
  return (
    <>
      <div className="noteFormContainer">
        <h1 className="add_noteHead">Add Your Note</h1>

        <div className="noteFormContent">
          <div className="noteFormImage">
            <img src="/formnoteimg.webp" alt="Note" />
          </div>

          <div className="noteFormCard">
            <form onSubmit={formHandler}>
              <h3>{error}</h3>

              <label htmlFor="title">Title</label>

              <input
                type="text"
                placeholder="Enter title"
                className="inp"
                name="title"
                value={title}
                onChange={titleHandler}
              />

              <label htmlFor="content">Content</label>

              <textarea
                placeholder="Enter content"
                className="text"
                name="content"
                value={content}
                onChange={contentHandler}
              ></textarea>

              <button className="addNote">Add Note</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteForm;
