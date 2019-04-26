const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// defining the schema
const modelSchema = Schema({
  name: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

// exporting the model
const model = mongoose.model('User', modelSchema);

module.exports = model;
