const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// defining the schema
const modelSchema = Schema({
  name: {
    type: String,
    index: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

// exporting the model
const model = mongoose.model('Expense_Category', modelSchema);

module.exports = model;
