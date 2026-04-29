const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MONGODB connected Successfully");
  } catch (err) {
    console.log("DB Connection Error Details:", err.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
