const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { contactsRouter } = require("./routes/api");
const { authRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({
    message: err.message,
  });
});

module.exports = app;
