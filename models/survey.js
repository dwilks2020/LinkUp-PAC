const mongoose = require('mongoose');

// Question Schema
const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    questionType: {
        type: String,
        enum: ['text', 'multiple-choice', 'true-false', 'rating', 'dropdown', 'date'], // Added more question types
        required: true,
    },
    options: {
        type: [String], // Only relevant for multiple-choice or dropdown
        validate: {
            validator: function (val) {
                return this.questionType !== 'multiple-choice' && this.questionType !== 'dropdown' || val.length <= 10;
            },
            message: 'Options allowed only for multiple-choice or dropdown and should not exceed 10 options',
        },
        default: [],
    },
    required: {
        type: Boolean,
        default: true, // Default to true to ensure required responses
    },
    ratingScale: {
        type: Number,
        min: 1,
        max: 10,
        required: function () {
            return this.questionType === 'rating'; // Required only for rating questions
        },
    },
    // Field to store conditional logic (for advanced surveys)
    conditional: {
        type: mongoose.Schema.Types.Mixed, // Allows dynamic conditions (e.g., show question if certain answer is chosen)
        default: null,
    },
    // For date type questions
    dateOptions: {
        type: Object,
        default: null, // Only applies if questionType is 'date'
    },
});

// Survey Schema
const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Ensure there's a User model
        required: true,
    },
    questions: [questionSchema], // Array of questions using questionSchema
    isPublished: {
        type: Boolean,
        default: false, // Allows you to manage published state
    },
    responses: {
        type: Number,
        default: 0, // Track number of responses to the survey
    },
});

// Export the Survey model
const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
