const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MONGODB connected Successfully");
  } catch (err) {
    console.log("Something Went Wrong in DB ", err);
    process.exit(1);
  }
};

module.exports = connectToDB;
