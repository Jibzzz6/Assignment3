const mongoose = require('mongoose');

// Define the schema for an Assignment
const assignmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create the Assignment model from the schema
const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
