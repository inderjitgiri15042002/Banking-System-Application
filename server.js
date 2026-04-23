require("dotenv").config();
const server = require("./src/app");
const connectToDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

connectToDB();

server.listen(process.env.PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
