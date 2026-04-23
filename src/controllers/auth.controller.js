const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

async function userRegisterController(req, res) {
  try {
    const { name, email, password } = req.body;

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
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.stack,
    });
  }
}

module.exports = { userRegisterController };
