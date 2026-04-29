const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, token is missing",
    });
  }

  try {
    const isVerified = jwt.verify(token, process.env.SECRET);

    if (!isVerified) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    req.user = isVerified;

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
