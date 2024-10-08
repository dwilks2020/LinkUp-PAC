const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const isSignedIn = require('../middleware/is-signed-in');
const passUserToView = require('../middleware/pass-user-to-view');

// Use middleware to pass the user to views
router.use(passUserToView);

// Public route: View all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render('blogs/index.ejs', { blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.redirect('/');
  }
});

// Public route: View a single blog post
router.get('/:blogId', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId).populate('author');
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.render('blogs/read-blog.ejs', { blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.redirect('/blogs');
  }
});

// Routes requiring authentication
router.use(isSignedIn);

// Protected route: Show form to create a new blog
router.get('/new', (req, res) => {
  console.log("BLOG_WORKING")
  res.render('blogs/create-blog.ejs');
});

// Protected route: Create a new blog
router.post('/', async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const authorId = req.session.user._id; // Get the author ID from the session

    const newBlog = new Blog({
      title,
      content,
      date: date || Date.now(),
      author: authorId // Assign the correct author ID
    });

    await newBlog.save();
    res.redirect('/blogs'); // Redirect to the blogs index after saving
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(400).send('Error creating blog');
  }
});


// Protected route: Show form to edit a blog
router.get('/:blogId/edit', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.render('blogs/edit-blog.ejs', { blog });
  } catch (error) {
    console.error('Error fetching blog for edit:', error);
    res.redirect('/blogs');
  }
});

// Protected route: Update a blog
router.put('/:blogId', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.blogId, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).send('Blog not found');
    }
    res.redirect(`/blogs/${req.params.blogId}`);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.redirect(`/blogs/${req.params.blogId}/edit`);
  }
});

// Protected route: Delete a blog
router.delete('/:blogId', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.blogId);
    if (!deletedBlog) {
      return res.status(404).send('Blog not found');
    }
    res.redirect('/blogs');
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.redirect('/blogs');
  }
});

module.exports = router;
