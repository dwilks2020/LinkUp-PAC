const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');



router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find(); 
    res.render('blogs/index.ejs', { blogs }); // Pass blogs to the view
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.redirect('/'); // Redirect on error
  }
});

router.get('/new', (req, res) => {
  res.render('blogs/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    const newBlog = new Blog({
      ...req.body,
      author: req.session.user._id,
      date: req.body.date || Date.now(),
    });
    await newBlog.save();
    res.redirect('/blogs');
  } catch (error) {
    console.error('Error creating blog:', error);
    res.redirect('/blogs/new');
  }
});

router.get('/:blogId', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId).populate('author');
    if (!blog) return res.status(404).send('Blog not found');
    res.render('blogs/show.ejs', { blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.redirect('/blogs');
  }
});

// Edit blog
router.get('/:blogId/edit', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).send('Blog not found');
    res.render('blogs/edit.ejs', { blog });
  } catch (error) {
    console.error('Error fetching blog for edit:', error);
    res.redirect('/blogs');
  }
});

// Update: 
router.put('/:blogId', async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.blogId, req.body, { new: true });
    res.redirect('/blogs');
  } catch (error) {
    console.error('Error updating blog:', error);
    res.redirect(`/blogs/${req.params.blogId}/edit`);
  }
});

// Delete: 
router.delete('/:blogId', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.blogId);
    res.redirect('/blogs');
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.redirect('/blogs');
  }
});

module.exports = router;
