const mongoose = require('mongoose');

const { auditSchema } = require('../_shared/base-model');

// defining the schema
const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  ...auditSchema
});

// exporting the model
const model = mongoose.model('User', modelSchema);

module.exports = model;
