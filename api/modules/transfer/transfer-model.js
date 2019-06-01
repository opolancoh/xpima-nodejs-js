const mongoose = require('mongoose');

const { auditSchema } = require('../_shared/base-model');

// defining the schema
const modelSchema = new mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  amount: {
    type: Number
  },
  date: {
    type: Date
  },
  description: {
    type: String
  },
  ...auditSchema
});

// exporting the model
module.exports = mongoose.model('Transfer', modelSchema);
