const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const Blog = require('./models/blog.js'); //

const createBlog = async () => {
  const blogData = {
    Author: "John Doe",  
    Date: new Date(),    
    BodyText: "This is the body of the blog.",  
  };

  const blog = await Blog.create(blogData);
  console.log("New blog:", blog);
};

const connect = async () => {
  try {
    // Connect to MongoDB using the MONGODB_URI specified in our .env file.
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Call the runQueries function
    await runQueries();

    // Disconnect from MongoDB after queries run
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    // Close the app
    process.exit();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

const runQueries = async () => {
  console.log('Queries running.');
  await createBlog();
};

connect();
