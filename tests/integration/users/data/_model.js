const baseModel = require('../../_shared/base-model');

const model = [
  {
    name: 'name',
    type: 'string',
    selectable: true
  },
  {
    name: 'email',
    type: 'string',
    selectable: true
  },
  {
    name: 'password',
    type: 'string',
    selectable: false
  },
  ...baseModel
];

module.exports = model;
