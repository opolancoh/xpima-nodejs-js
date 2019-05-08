const baseModel = require('../../_shared/base-model');

const model = [
  {
    name: 'name',
    type: 'string',
    selectable: true
  },

  {
    name: 'description',
    type: 'string',
    selectable: true
  },
  ...baseModel
];

module.exports = model;
