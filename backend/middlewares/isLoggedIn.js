const jwt = require("jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "You login first" });
    }

    let data = jwt.verify(token, process.env.SECRET_KEY);
    req.user = data;
    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
