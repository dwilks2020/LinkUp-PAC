const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define the blog schema
const blogSchema = new mongoose.Schema({
  Author: String,
  Date: { type: Date, default: Date.now },
  BodyText: String
});

// Compile the schema into a model
const Blog = mongoose.model('Blog', blogSchema);

console.log("MongoDB URI:", process.env.MONGODB_URI); // Add this line for debugging


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server only after MongoDB connection is successful
    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
  });

// Routes
app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/signin", async (req, res) => {
  res.render("signin");
});

app.get("/signup", async (req, res) => {
  res.render("signup");
});

app.get("/blog", async (req, res) => {
  res.render("blog");
});

app.get("/survey", async (req, res) => {
  res.render("survey");
});
