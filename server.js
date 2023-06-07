const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./dbinit");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const PORT = process.env.PORT || 8080;

connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(PORT, () => {
  console.log(`server running on port number ${PORT}`.rainbow);
});
