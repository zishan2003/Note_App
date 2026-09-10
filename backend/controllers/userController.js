const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

exports.registerController = async (req, res) => {
  let { name, email, password } = req.body;

  try {
    let existUser = await userModel.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        msg: "User already registered",
      });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          msg: "Something went wrong",
        });
      }

      let registeredUser = await userModel.insertOne({
        name,
        email,
        password: hash,
      });

      let Token = jwt.sign(
        {
          userId: registeredUser._id,
          email,
        },
        process.env.SECRET_KEY,
      );

      res.cookie("token", Token, cookieOptions);

      res.status(200).json({
        msg: "User registered successfully",
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

exports.loginController = async (req, res) => {
  let { email, password } = req.body;

  try {
    let userExist = await userModel.findOne({ email });

    if (!userExist) {
      return res.status(404).json({
        msg: "Invalid email",
      });
    }

    bcrypt.compare(password, userExist.password, (err, result) => {
      if (err) {
        return res.status(500).json({
          msg: "Something went wrong",
        });
      }

      if (!result) {
        return res.status(401).json({
          msg: "Invalid password",
        });
      }

      let Token = jwt.sign(
        {
          userId: userExist._id,
          email,
        },
        process.env.SECRET_KEY,
      );

      res.cookie("token", Token, cookieOptions);

      res.status(200).json({
        msg: "You can login",
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

exports.logoutController = (req, res) => {
  res.clearCookie("token", cookieOptions);

  res.status(200).json({
    msg: "User logged out",
  });
};
