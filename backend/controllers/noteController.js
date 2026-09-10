const noteModel = require("../models/noteModel");
const userModel = require("../models/userModel");

//Read all Note
exports.getAllNote = async (req, res) => {
  try {
    let { email } = req.user;

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ msg: "User not found" });
    }
    let allNote = await noteModel.find({ userId: user._id });
    res.status(200).json(allNote);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//Get Note by id
exports.getNoteById = async (req, res) => {
  let { id } = req.params;
  let { email } = req.user;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    let data = await noteModel.findOne({ _id: id, userId: user._id });
    if (!data) {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//create Note
exports.createNote = async (req, res) => {
  try {
    let { title, content } = req.body;
    let { email } = req.user;
    let data = await userModel.findOne({ email });
    if (!data) {
      return res.status(404).json({ msg: "User not found" });
    }
    let createdData = await noteModel.create({
      title,
      content,
      userId: data._id,
    });
    data.noteId.push(createdData._id);
    await data.save();
    const dataFetch = await userModel.findById(data._id).populate("noteId");
    res.status(200).json(dataFetch);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//Update Note
exports.updateNote = async (req, res) => {
  let { id } = req.params;
  let { email } = req.user;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    let { title, content } = req.body;
    let updatedNote = await noteModel.findOneAndUpdate(
      { _id: id, userId: user._id },
      { title, content },
      { returnDocument: "after" },
    );
    if (!updatedNote) {
      return res.status(404).json({ msg: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

  //Delete Note
  exports.deleteNote = async (req, res) => {
    let { id } = req.params;
    let { email } = req.user;
    try {
      let user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      //Check note current user ka hai ki nhi
      let note = await noteModel.findOne({ _id: id, userId: user._id });
      if(!note){
        return res.status(404).json({msg : "Note not Found"})
      }
      await noteModel.findByIdAndDelete(id);
      await userModel.findByIdAndUpdate(user._id, { $pull: { noteId: id } });
      res.status(200).json({ msg: "Note deleted" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
