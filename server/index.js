const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const auth = require("./middlewares/auth");
const app = express();
app.use(cors());
app.use(express.json());



app.use ('/users',  require('./routes/UserRoutes'));
app.use ('/groups',auth, require('./routes/GroupRoutes'));
app.use ('/spaces',auth, require('./routes/SpaceRoutes'));

const connection = mongoose.connect(process.env.DATABASE_URL);

if (connection) {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} else {
  console.log("Error connecting to MongoDB");
}
