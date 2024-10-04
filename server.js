<<<<<<< HEAD
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
=======
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
>>>>>>> ac2c6464cbeed215da421491bf68d26ed6ae1577
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

<<<<<<< HEAD
const authController = require('./controllers/auth.js');

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.get('/members-only', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome  ${req.session.user.username}.`);
  } else {
    res.send('Sorry, members only area.');
  }
});

app.use('/auth', authController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
=======
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
>>>>>>> ac2c6464cbeed215da421491bf68d26ed6ae1577
});
