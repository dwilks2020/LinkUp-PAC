const express = require('express');
const router = express.Router();
const Survey = require('../models/survey'); // Ensure you import your Survey model

// GET /surveys - List all surveys
router.get('/', async (req, res) => {
    try {
        const surveys = await Survey.find({ userId: req.session.user._id });
        res.render('surveys/index.ejs', { surveys });
    } catch (error) {
        console.error('Error fetching surveys:', error);
        res.status(500).send('Error fetching surveys');
    }
});

// GET /surveys/new - Show form for creating a new survey
router.get('/new', (req, res) => {
    res.render('surveys/new');
});

// POST /surveys - Create a new survey
router.post('/', async (req, res) => {
    try {
        const survey = new Survey({
            title: req.body.title,
            description: req.body.description,
            questions: req.body.questions, // Assuming you process questions properly
            userId: req.session.user._id,
        });
        await survey.save();
        res.redirect('/surveys');
    } catch (error) {
        console.error('Error creating survey:', error);
        res.status(500).send('Error creating survey');
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

module.exports = router;
