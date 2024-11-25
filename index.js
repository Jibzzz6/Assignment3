const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment'); // Correct model import

// Home page
router.get('/', async (req, res) => {
    try {
      // Fetch all assignments from the database
      const assignments = await Assignment.find();
  
      // Pass the assignments to the index.ejs view
      res.render('index', { assignments });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching assignments');
    }
  });

// Display all assignments
router.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.render('assignments', { assignments });  // Render the assignments page with the list of assignments
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching assignments');
  }
});

// Create new assignment
router.post('/assignments', async (req, res) => {
  const { name, dueDate, description } = req.body;
  try {
    const newAssignment = new Assignment({ name, dueDate, description });
    await newAssignment.save();
    res.redirect('/assignments');  // Redirect back to the assignments list after saving
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
    res.render('edit', { assignment });  // Render the edit form with the assignment details
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
    res.redirect('/assignments');  // Redirect to the assignments list after update
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating assignment');
  }
});

// Delete assignment
router.get('/assignments/delete/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.redirect('/assignments');  // Redirect back to the assignments list after deletion
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting assignment');
  }
});

module.exports = router;