// const
const dotenv = require("dotenv");
dotenv.config(); // Loads the environment variables from .env file

const express = require("express");
const app = express();

const mongoose = require("mongoose")



/// middleware


///routess

// server.js

// GET /
app.get("/", async (req, res) => {
    res.send("hello, friend!");
  });
  
app.listen(3000, () => {
    console.log("Listening on port 3000");
  });