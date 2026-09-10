require("dotenv").config();
const express = require("express");
const app = express();
const DB = require("./config/mongooseConnection");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { isLoggedIn } = require("./middlewares/isLoggedIn");
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://note-app-ten-coral.vercel.app",
    credentials: true,
  }),
);

//Routes
app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("app is running on port 3000");
});
