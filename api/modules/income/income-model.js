const mongoose = require('mongoose');

const { auditSchema } = require('../_shared/base-model');

// defining the schema
const modelSchema = new mongoose.Schema({
  amount: {
    type: Number
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  date: {
    type: Date
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Income_Category'
  },
  description: {
    type: String
  },
  ...auditSchema
});

// exporting the model
module.exports = mongoose.model('Income', modelSchema);
