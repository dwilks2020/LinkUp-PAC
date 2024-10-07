const express = require('express');
const router = express.Router();
const Survey = require('../models/survey'); 
// Index: Get all surveys
router.get('/', async (req, res) => {
  try {
    const surveys = await Survey.find(); // Fetch all surveys
    res.render('surveys/index.ejs', { surveys }); // Render the index view with all surveys
  } catch (error) {
    console.error('Error fetching surveys:', error);
    res.redirect('/'); // Redirect on error
  }
});

router.get('/new', (req, res) => {
  res.render('surveys/new.ejs'); 
});

// POST: Create a new survey
router.post('/', async (req, res) => {
  try {
    const newSurvey = new Survey(req.body); // Assuming req.body contains the survey data
    await newSurvey.save();
    res.redirect('/surveys'); // Redirect to the surveys index after creation
  } catch (error) {
    console.error('Error creating survey:', error);
    res.redirect('/surveys/new'); // Redirect back to the new survey form on error
  }
});

// Show: Get a specific survey by ID
router.get('/:surveyId', async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.surveyId);
    if (!survey) {
      return res.status(404).send('Survey not found'); // Handle survey not found
    }
    res.render('surveys/show.ejs', { survey }); // Render survey detail view
  } catch (error) {
    console.error('Error fetching survey:', error);
    res.redirect('/surveys'); // Redirect to surveys index on error
  }
});

// Edit: Render the form to edit a specific survey
router.get('/:surveyId/edit', async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.surveyId);
    if (!survey) {
      return res.status(404).send('Survey not found'); // Handle survey not found
    }
    res.render('surveys/edit.ejs', { survey }); // Render edit form with survey data
  } catch (error) {
    console.error('Error fetching survey for edit:', error);
    res.redirect('/surveys'); // Redirect to surveys index on error
  }
});

// Update: Handle the form submission to update a specific survey
router.put('/:surveyId', async (req, res) => {
  try {
    const updatedSurvey = await Survey.findByIdAndUpdate(req.params.surveyId, req.body, { new: true }); // Update survey
    if (!updatedSurvey) {
      return res.status(404).send('Survey not found'); // Handle survey not found
    }
    res.redirect(`/surveys/${req.params.surveyId}`); // Redirect to the updated survey
  } catch (error) {
    console.error('Error updating survey:', error);
    res.redirect(`/surveys/${req.params.surveyId}/edit`); // Redirect back to edit form on error
  }
});

// Delete: Handle the request to delete a specific survey
router.delete('/:surveyId', async (req, res) => {
  try {
    const deletedSurvey = await Survey.findByIdAndDelete(req.params.surveyId); // Delete survey
    if (!deletedSurvey) {
      return res.status(404).send('Survey not found'); // Handle survey not found
    }
    res.redirect('/surveys'); // Redirect to the surveys index
  } catch (error) {
    console.error('Error deleting survey:', error);
    res.redirect('/surveys'); // Redirect to surveys index on error
  }
});

// Export the router
module.exports = router;


