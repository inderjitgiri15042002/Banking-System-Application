const express = require("express");
const accountModel = require("../models/account.model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = req.user;

    console.log(user);

    const account = await accountModel.create({
      user: user._id,
      currency: user.currency || "INR",
    });

    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      newaccount: account,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.stack,
    });
  }
});

module.exports = router;
