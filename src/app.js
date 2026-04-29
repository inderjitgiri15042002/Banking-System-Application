const express = require("express");
const cookieParser = require("cookie-parser");

const accountRouter = require("./routes/account.routes");
const authRouter = require("./routes/auth.routes");
const sendEmail = require("./services/email.service");

const app = express();

app.use(express.json());
app.use(cookieParser());

// sendEmail();

app.use("/api/auth", authRouter);
app.use("/api/account", accountRouter);

module.exports = app;
