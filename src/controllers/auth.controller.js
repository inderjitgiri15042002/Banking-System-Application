const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../services/email.service.js");

const userModel = require("../models/user.model");

/**
 *  user register TaskController
 *  POST /api/auth/register
 */

async function userRegisterController(req, res) {
  try {
    const { name, email, password } = req.body;

    console.log(name, email, password);

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }
    const isEmailExists = await userModel.findOne({ email });

    if (isEmailExists) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const newUser = await userModel.create({
      name,
      email,
      password,
    });

    const token = await jwt.sign(
      {
        id: newUser._id,
        email: newUser.name,
      },
      process.env.SECRET,
    );

    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "User Register Successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });

    sendEmail(email, name);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.stack,
    });
  }
}

/**
 *  user Login TaskController
 *  POST /api/auth/login
 */

async function userLoginController(req, res) {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Bad Required all Fields are required",
      });
    }

    const user = await userModel.findOne({ email }).select("+password");

    console.log(user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("test");
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await jwt.sign(
      {
        id: user._id,
        email: user.name,
      },
      process.env.SECRET,
    );

    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "User Register Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.stack,
    });
  }
}

module.exports = { userRegisterController, userLoginController };
