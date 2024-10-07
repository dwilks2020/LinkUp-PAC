
const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    title: {
        type: String,  
        required: true,
    },
    description: {
        type: String,  
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;
