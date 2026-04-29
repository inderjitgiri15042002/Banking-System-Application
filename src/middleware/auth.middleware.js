const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, token is missing",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const user = await userModel.findById(decoded.id);

    console.log("User => ", user);

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token is expired or invalid",
      error: err.message,
    });
  }
}

module.exports = authMiddleware;
