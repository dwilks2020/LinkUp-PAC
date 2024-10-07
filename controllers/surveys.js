const express = require('express');
const router = express.Router();
const Survey = require('../models/survey');
const isSignedIn = require('../middleware/is-signed-in');
const passUserToView = require('../middleware/pass-user-to-view');

router.use(passUserToView);

// Public route: View all surveys
router.get('/', async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.render('surveys/index.ejs', { surveys });
  } catch (error) {
    console.error('Error fetching surveys:', error);
    res.redirect('/');
  }
});

// Public route: View a single survey
router.get('/:surveyId', async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.surveyId);
    if (!survey) {
      return res.status(404).send('Survey not found');
    }
    res.render('surveys/show.ejs', { survey });
  } catch (error) {
    console.error('Error fetching survey:', error);
    res.redirect('/surveys');
  }
});

// Routes requiring authentication
router.use(isSignedIn);

// Protected route: Show form to create a new survey
router.get('/new', (req, res) => {
  res.render('surveys/new.ejs'); 
});

// Protected route: Create a new survey
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.session.user._id;

    const survey = new Survey({
      title,
      description,
      userId,
    });

    await survey.save();
    res.redirect('/surveys'); 
  } catch (error) {
    console.error('Error creating survey:', error);
    res.status(400).send('Error creating survey');
  }
});

// Protected route: Show form to edit a survey
router.get('/:surveyId/edit', async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.surveyId);
    if (!survey) {
      return res.status(404).send('Survey not found');
    }
    res.render('surveys/edit.ejs', { survey });
  } catch (error) {
    console.error('Error fetching survey for edit:', error);
    res.redirect('/surveys');
  }
});

// Protected route: Update a survey
router.put('/:surveyId', async (req, res) => {
  try {
    const updatedSurvey = await Survey.findByIdAndUpdate(req.params.surveyId, req.body, { new: true });
    if (!updatedSurvey) {
      return res.status(404).send('Survey not found');
    }
    res.redirect(`/surveys/${req.params.surveyId}`);
  } catch (error) {
    console.error('Error updating survey:', error);
    res.redirect(`/surveys/${req.params.surveyId}/edit`);
  }
});

// Protected route: Delete a survey
router.delete('/:surveyId', async (req, res) => {
  try {
    const deletedSurvey = await Survey.findByIdAndDelete(req.params.surveyId);
    if (!deletedSurvey) {
      return res.status(404).send('Survey not found');
    }
    res.redirect('/surveys');
  } catch (error) {
    console.error('Error deleting survey:', error);
    res.redirect('/surveys');
  }
});

module.exports = router;
