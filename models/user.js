const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,  // Ensures that usernames are unique
    trim: true,    // Removes whitespace from the username
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
