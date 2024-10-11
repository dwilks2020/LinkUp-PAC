// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');

// Import middleware and controllers
const passUserToView = require('./middleware/pass-user-to-view'); // Middleware for passing user to view
const isSignedIn = require('./middleware/is-signed-in'); // Middleware for route protection
const surveysController = require('./controllers/surveys'); // Surveys controller
const authController = require('./controllers/auth'); // Authentication controller
const blogsController = require('./controllers/blogs'); // Blogs controller
const usersController = require('./controllers/users'); // Users controller


// Initialize the app and set the port
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); // Enable PUT and DELETE methods via forms
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Pass user to views
app.use(passUserToView);

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs', { user: req.session.user });
});

// Authentication routes
app.use('/auth', authController);

// Protected routes (only accessible after sign-in)
app.use(isSignedIn);

// Survey routes
app.use('/surveys', surveysController);

// Blog routes
app.use('/blogs', blogsController);

// User routes
app.use('/users', usersController);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
