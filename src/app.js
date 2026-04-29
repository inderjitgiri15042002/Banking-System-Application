const express = require("express");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes");
const sendEmail = require("./services/email.service");

const app = express();

app.use(express.json());
app.use(cookieParser());

// sendEmail();

app.use("/api/auth", authRouter);

module.exports = app;
