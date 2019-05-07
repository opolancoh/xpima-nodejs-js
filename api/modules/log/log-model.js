const mongoose = require('mongoose');

// defining the schema
const modelSchema = new mongoose.Schema({
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
