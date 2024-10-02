// const
const express = require("express");
const path = require('path');
const app = express();

const dotenv = require("dotenv");
dotenv.config(); // Loads the environment variables from .env file


const mongoose = require("mongoose")


app.set('view engine', 'ejs');


/// middleware


///routess

// server.js

// GET /
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
  app.get("/blog", async (req, res) => {
    res.render("blog");
  });
  app.get("/survey", async (req, res) => {
    res.render("survey");
  });
  
app.listen(3000, () => {
    console.log("Listening on port 3000");
  });