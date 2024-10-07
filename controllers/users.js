const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Ensure this path is correct

// Index: Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.render('users/index.ejs', { users }); // Render the index view with all users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.redirect('/'); // Redirect on error
  }
});

// New: Render the form to create a new user
router.get('/new', (req, res) => {
  res.render('users/new.ejs'); // Render form to create a new user
});

// POST: Create a new user
router.post('/users', async (req, res) => {
  try {
      const newUser = new User({
          name: req.body.name,
          email: req.body.email,
      });
      
      await newUser.save();
      res.redirect('/users'); // Redirect to the users index after creation
  } catch (error) {
      console.error('Error creating user:', error);
      res.redirect('/users/new'); // Redirect back to the new user form on error
  }
});

// Show: Get a specific user by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found'); // Handle user not found
    }
    res.render('users/show.ejs', { user }); // Render user detail view
  } catch (error) {
    console.error('Error fetching user:', error);
    res.redirect('/users'); // Redirect to users index on error
  }
});

// Edit: Render the form to edit a specific user
router.get('/:userId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found'); // Handle user not found
    }
    res.render('users/edit.ejs', { user }); // Render edit form with user data
  } catch (error) {
    console.error('Error fetching user for edit:', error);
    res.redirect('/users'); // Redirect to users index on error
  }
});

// Update: Handle the form submission to update a specific user
router.put('/:userId', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }); // Update user
    res.redirect('/users'); // Redirect to the users index
  } catch (error) {
    console.error('Error updating user:', error);
    res.redirect(`/users/${req.params.userId}/edit`); // Redirect back to edit form on error
  }
});

// Delete: Handle the request to delete a specific user
router.delete('/:userId', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId); // Delete user
    res.redirect('/users'); // Redirect to the users index
  } catch (error) {
    console.error('Error deleting user:', error);
    res.redirect('/users'); // Redirect to users index on error
  }
});

module.exports = router;
