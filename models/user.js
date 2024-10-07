const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['text', 'multiple choice', 'rating'], 
    required: true,
  },
  options: [String], 
});

const responseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question', 
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
});


const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  questions: [questionSchema], 
  responses: [responseSchema], 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true, 
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  surveys: [surveySchema],  
  name: { // Added name field
    type: String,
  },
  email: { // Added email field
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { // Added createdAt field
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model('User', userSchema);

module.exports = User;
