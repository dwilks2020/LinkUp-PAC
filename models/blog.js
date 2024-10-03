const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    Author: { type: String, required: true},
    Date: { type: Date, default: Date.now },
BodyText: { type: String, required: true },
});

const Blog = mongoose.model('Blog', blogSchema);


module.exports = mongoose.Model('Blog', blogSchema);