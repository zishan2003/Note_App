const express = require("express");
const router = express.Router();
const {
  getAllNote,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} = require("../controllers/noteController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const { createValidation } = require("../middlewares/ServerValidation");

router.get("/getall", isLoggedIn, getAllNote);
router.get("/getnote/:id", isLoggedIn, getNoteById);
router.get("/getnote/search/:key")
router.post("/create", isLoggedIn, createValidation, createNote);
router.put("/update/:id", isLoggedIn, createValidation, updateNote);
router.delete("/delete/:id", isLoggedIn, deleteNote);

module.exports = router;
