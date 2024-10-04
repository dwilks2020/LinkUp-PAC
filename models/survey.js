const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    question: string,
    Answer: Boolean,
    Answer: Boolean,
})

const survey = mongoose.model('survey, surveySchema');
tou

module.exports = survey;