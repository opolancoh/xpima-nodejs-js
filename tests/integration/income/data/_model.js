const baseModel = require('../../_shared/base-model');

const model = [
  {
    name: 'amount',
    type: 'number',
    selectable: true
  },
  {
    name: 'account',
    type: 'string',
    selectable: true
  },
  {
    name: 'date',
    type: 'string',
    selectable: true
  },
  {
    name: 'category',
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
