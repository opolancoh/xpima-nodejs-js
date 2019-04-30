const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// defining the schema
const modelSchema = Schema({
  name: {
    type: String,
    index: true
  },
  totalRevenues: {
    type: Number
  },
  totalExpenditures: {
    type: Number
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
const model = mongoose.model('Account', modelSchema);

module.exports = model;
