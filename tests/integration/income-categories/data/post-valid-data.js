const model = require('./_model');
const { createValidDataForPost } = require('../../_shared/actions');

const validData = [
  {
    body: {
      // This item must have all body from model
      name: 'First Category',
      description: 'Description for First Category.'
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'Deposits'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      name: 'Salary'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      name: 'Savings',
      description: 'Description for Savings.'
    },
    nonRetornableFields: []
  }
];

createValidDataForPost(model, validData);

module.exports = validData;
