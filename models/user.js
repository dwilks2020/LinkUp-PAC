const mongoose = require('mongoose');

<<<<<<< HEAD
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
=======
const userSchema = new mongoose.Schema({
    Name: Name,
    Email: Email,
    Password: Password,
})

const User = mongoose.model('User', userSchema);

module.exports = User;
>>>>>>> ac2c6464cbeed215da421491bf68d26ed6ae1577
