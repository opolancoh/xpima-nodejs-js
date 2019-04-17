const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// defining the schema
const modelSchema = Schema({
  level: {
    type: String,
    index: true
  },
  timestamp: {
    type: Date
  },
  description: {
    type: String
  }
});

// exporting the model
const model = mongoose.model('Log', modelSchema);

module.exports = model;
