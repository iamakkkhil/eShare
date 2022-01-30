const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

connectDB();
// CORS Setup - Middleware
const corsOptions = process.env.ALLOWED_HOSTS.split(",");
app.use(cors(corsOptions));

// Serve static files - Middleware
app.use(express.static("public"));
app.use(express.static("build"));

// Use JSON by default in POST - Middleware
app.use(express.json());

// Templates
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// React app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Routes
app.use("/api/files", require("./routes/files"));
app.use("/api/files/download", require("./routes/download-file"));
app.use("/files", require("./routes/show"));
app.use("/api/delete", require("./routes/script"));

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
