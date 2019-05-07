const mongoose = require('mongoose');

const { auditSchema } = require('../_shared/base-model');

// defining the schema
const modelSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  description: {
    type: String
  },
  ...auditSchema
});

// exporting the model
const model = mongoose.model('Income_Category', modelSchema);

module.exports = model;
