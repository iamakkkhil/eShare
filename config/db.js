const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  // Database connection
  const CONNECTION_URL = process.env.MONGO_CONNECTION_URL;
  mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const connection = mongoose.connection;

  connection
    .once("open", () => {
      console.log("Database connected.");
    })
    .on("error", function (err) {
      console.log("DB connection failed.");
    });
}

module.exports = connectDB;
