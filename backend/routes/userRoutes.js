const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const {registerValidation} = require("../middlewares/ServerValidation");

router.post("/register", registerValidation, registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

module.exports = router;
