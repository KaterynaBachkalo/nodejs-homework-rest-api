const app = require("./app");

const { serverConfig } = require("./configs");
const mongoose = require("mongoose");

mongoose
  .connect(serverConfig.mongoUrl)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((er) => {
    console.log(er.message);
    process.exit(1);
  });
