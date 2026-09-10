import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditNote.css";

const EditNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  let { id } = useParams();

  //Get data by id
  useEffect(() => {
    const getNoteById = async () => {
      let response = await axios.get(
        `http://localhost:3000/api/note/getnote/${id}`,
        { withCredentials: true },
      );
      setTitle(response.data.title);
      setContent(response.data.content);
    };

    getNoteById();
  }, [id]);

  //Updata data
  const formHandler = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.put(
        `http://localhost:3000/api/note/update/${id}`,
        { title, content },
        { withCredentials: true },
      );
      setTitle(response.data.title);
      setContent(response.data.content);
      navigate("/");
    } catch (error) {
      setError(error ? error.response.data.msg : "Something went wrong");
    }
  };

  return (
    <div className="noteFormContainer">
      <h1 className="add_noteHead">Edit Your Note</h1>

      <div className="noteFormContent">
        <div className="noteFormImage">
          <img src="/formnoteimg.webp" alt="Edit Note" />
        </div>

        <div className="noteFormCard">
          <form onSubmit={formHandler}>
            {error && <h3>{error}</h3>}

            <label htmlFor="title">Title</label>

            <input
              id="title"
              type="text"
              placeholder="Enter title"
              className="inp"
              name="title"
              value={title}
              onChange={titleHandler}
            />

            <label htmlFor="content">Content</label>

            <textarea
              id="content"
              placeholder="Enter content"
              className="text"
              name="content"
              value={content}
              onChange={contentHandler}
            ></textarea>

            <button type="submit" className="addNote">
              Update Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
