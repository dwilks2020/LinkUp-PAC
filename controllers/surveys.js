// controllers/surveys.js
const express = require('express');
const router = express.Router();
const Survey = require('../models/survey'); // Ensure you import your Survey model

// GET /surveys - List all surveys
router.get('/', async (req, res) => {
    try {
        const surveys = await Survey.find({ userId: req.session.user._id });
        res.render('surveys/index', { surveys });
    } catch (error) {
        console.error('Error fetching surveys:', error);
        res.status(500).send('Error fetching surveys');
    }
});

// GET /surveys/new - Show form for creating a new survey
router.get('/new', (req, res) => {
    res.render('surveys/new');
});

// POST /surveys - Handle creation of a new survey
router.post('/', async (req, res) => {
    try {
        const newSurvey = new Survey({
            title: req.body.title,
            description: req.body.description,
            userId: req.session.user._id, // Ensure you use the logged-in user's ID
            questions: req.body.questions, // Assuming this is an array of questions
        });

        await newSurvey.save(); // Save the survey to the database
        res.redirect('/surveys'); // Redirect to the surveys list
    } catch (error) {
        console.error('Error creating survey:', error);
        res.status(500).send('Error creating survey');
    }
});

// POST /surveys/:id/submit - Handle survey submission
router.post('/:id/submit', async (req, res) => {
  try {
      const answers = req.body; // This will contain the user's answers.
      // You might want to save the answers to a separate collection or process them
      console.log('Survey submitted:', answers);
      res.redirect('/surveys'); // Redirect to the surveys list or a thank you page.
  } catch (error) {
      console.error('Error submitting survey:', error);
      res.status(500).send('Error submitting survey');
  }
});

// GET /surveys/:id - Show a specific survey
router.get('/:id', async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) {
            return res.status(404).send('Survey not found');
        }
        res.render('surveys/show', { survey });
    } catch (error) {
        console.error('Error fetching survey:', error);
        res.status(500).send('Error fetching survey');
    }
});

// GET /surveys/:id/edit - Show form for editing a survey
router.get('/:id/edit', async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) {
            return res.status(404).send('Survey not found');
        }
        res.render('surveys/edit', { survey });
    } catch (error) {
        console.error('Error fetching survey for edit:', error);
        res.status(500).send('Error fetching survey for edit');
    }
});

// PUT /surveys/:id - Update a survey
router.put('/:id', async (req, res) => {
    try {
        const survey = await Survey.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!survey) {
            return res.status(404).send('Survey not found');
        }
        res.redirect(`/surveys/${survey._id}`);
    } catch (error) {
        console.error('Error updating survey:', error);
        res.status(500).send('Error updating survey');
    }
});

// Display survey by ID
router.get('/:id', async (req, res) => {
  try {
      const survey = await Survey.findById(req.params.id);
      res.render('surveys/show', { survey });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});

// Submit survey responses
router.post('/:id/submit', async (req, res) => {
  try {
      const survey = await Survey.findById(req.params.id);
      if (!survey) return res.status(404).send('Survey not found');
      
      // Handle submission logic (e.g., save responses to a separate model)
      survey.responses += 1;
      await survey.save();
      
      res.redirect(`/surveys/${survey._id}/thank-you`);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});


module.exports = router;
