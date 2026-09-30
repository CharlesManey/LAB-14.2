const dns = require('dns');
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Dependencies
require("dotenv").config();
require("./config/db-connection");
const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(express.json());
app.use(morgan("dev"));

// Router
const authRouter = require("./routes/user-routes");
const notesRouter = require("./routes/notes-routes");

// Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

// Port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});