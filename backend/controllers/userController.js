const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register user Route
exports.registerController = async (req, res) => {
  let { name, email, password } = req.body;
  try {
    //Check if already user registerd or not
    let existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "User already registered" });
    }

    //if user not registered then we registered user
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(404).json({ msg: "Something went wrong" });
      }
      let registeredUser = await userModel.insertOne({
        name,
        email,
        password: hash,
      });

      let Token = jwt.sign(
        { userId: registeredUser._id, email },
        process.env.SECRET_KEY,
      );
      res.cookie("token", Token);
      res.status(200).json({ msg: "User registered successfully" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Login user Route
exports.loginController = async (req, res) => {
  let { email, password } = req.body;
  try {
    //Check user exist or not
    let userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ msg: "Invalid email" });
    }
    //if user Exist
    bcrypt.compare(password, userExist.password, (err, result) => {
      if (err) {
        return res.status(404).json({ msg: "something went wrong" });
      }
      if (!result) {
        return res.status(401).json({ msg: "Invalid password" });
      }
      let Token = jwt.sign(
        { userId: userExist._id, email },
        process.env.SECRET_KEY,
      );
      res.cookie("token", Token);
      res.status(200).json({ msg: "You can login" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Logout user Route
exports.logoutController = (req, res) => {
  res.cookie("token", "");
  res.status(200).json({ msg: "User logged out" });
};
