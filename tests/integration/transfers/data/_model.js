const baseModel = require('../../_shared/base-model');

const model = [
  {
    name: 'fromAccount',
    type: 'string',
    selectable: true
  },
  {
    name: 'toAccount',
    type: 'string',
    selectable: true
  },
  {
    name: 'amount',
    type: 'number',
    selectable: true
  },
  {
    name: 'date',
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
