// Required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override'); // For handling HTTP methods like DELETE
require('dotenv').config(); // Load environment variables from .env

// Initialize express
const app = express();

// Middleware to parse incoming JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to use methodOverride for HTTP methods like DELETE in forms
app.use(methodOverride('_method'));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Log the MONGO_URI to check if it's being loaded correctly
console.log('MONGO_URI:', process.env.MONGO_URI);  // Check if the URI is being logged correctly

// Routes
const assignmentRoutes = require('./routes/assignment');
app.use('/', assignmentRoutes);

// Connect to MongoDB using the MONGO_URI from .env
// Connect to MongoDB using the MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Error: ' + err));


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});