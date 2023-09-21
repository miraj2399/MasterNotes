const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use ('/users', require('./routes/UserRoutes'));

const connection = mongoose.connect(process.env.DATABASE_URL);

if (connection) {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} else {
  console.log("Error connecting to MongoDB");
}
