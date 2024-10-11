const mongoose = require('mongoose');

// Question Schema
const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    questionType: {
        type: String,
        enum: ['text', 'multiple-choice'],
        required: true,
    },
    options: {
        type: [String],
        validate: {
            validator: (val) => val.length <= 10, // Array limit validator
            message: 'Exceeds the limit of 10 options',
        },
        default: [], // Default to an empty array
    },
    required: {
        type: Boolean,
        default: false,
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
    questions: {
        type: [questionSchema],
        default: [], // Default to an empty array
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to User model (if applicable)
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the Survey model
const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
