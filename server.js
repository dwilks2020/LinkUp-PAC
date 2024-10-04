const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const surveysController = require('./controllers/surveys.js');
const authController = require('./controllers/auth.js');

const port = process.env.PORT ? process.env.PORT : '3000';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Use passUserToView middleware globally
app.use(passUserToView);

app.get('/', (req, res) => {
  // Check if the user is signed in
  if (req.session.user) {
    // Redirect signed-in users to their applications index
    res.redirect(`/users/${req.session.user._id}/surveys`);
  } else {
    // Show the homepage for users who are not signed in
    res.render('index.ejs', {
      user: null, // Ensure user is defined for the view
    });
  }
});

app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/surveys', surveysController); // New!

// Members-only route
app.get('/members-only', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome ${req.session.user.username}.`);
  } else {
    res.send('Sorry, members only area.');
  }
});

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
