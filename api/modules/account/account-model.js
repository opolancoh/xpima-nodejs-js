const mongoose = require('mongoose');

const { auditSchema } = require('../_shared/base-model');

// defining the schema
const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  type: {
    type: String
  },
  balance: {
    type: Number
  },
  description: {
    type: String
  },
  totalRevenue: {
    type: Number
  },
  totalExpenses: {
    type: Number
  },
  ...auditSchema
});

// exporting the model
const model = mongoose.model('Account', modelSchema);

module.exports = model;
