const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");

// import routes
const authRoute = require("./routes/userRouter");

// middlewear
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// use routes

app.use(authRoute);

module.exports = {
  server: app,
  start: () => {
    mongoose
      .connect(process.env.DBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        app.listen(process.env.PORT, () => {
          console.log(`Starting server on port ${process.env.PORT}`);
        });
      });
  },
};
