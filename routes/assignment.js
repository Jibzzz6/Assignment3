const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// Render the home page and pass assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find(); // Fetch all assignments
    res.render('index', { assignments }); // Pass assignments to the view
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching assignments');
  }
});

// Display all assignments
router.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find(); // Find all assignments
    res.render('assignments', { assignments }); // Render the assignments page
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching assignments');
  }
});

// Route to render the "Add New Assignment" form
router.get('/assignments/new', (req, res) => {
  console.log('GET /assignments/new route hit');
  res.render('new'); // Ensure 'new.ejs' exists
});

// Create new assignment
router.post('/assignments', async (req, res) => {
  const { name, dueDate, description } = req.body;
  try {
    const newAssignment = new Assignment({ name, dueDate, description });
    await newAssignment.save();
    res.redirect('/assignments');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving assignment');
  }
});

// Edit assignment form
router.get('/assignments/edit/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }
    res.render('edit', { assignment });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching assignment');
  }
});

// Update assignment
router.post('/assignments/edit/:id', async (req, res) => {
  const { name, dueDate, description } = req.body;
  try {
    await Assignment.findByIdAndUpdate(req.params.id, { name, dueDate, description });
    res.redirect('/assignments');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating assignment');
  }
});

// Delete assignment
router.get('/assignments/delete/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.redirect('/assignments');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting assignment');
  }
});

module.exports = router;
