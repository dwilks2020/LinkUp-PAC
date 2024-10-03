const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: Name,
    Email: Email,
    Password: Password,
})

const User = mongoose.model('User', userSchema);

module.exports = User;