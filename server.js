require("dotenv").config();
const server = require("./src/app");

const PORT = process.env.PORT || 5000;

server.listen(process.env.PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
