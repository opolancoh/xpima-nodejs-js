const model = require('./_model');
const { createValidDataForPost } = require('../../_shared/actions');

const validData = [
  {
    body: {
      // This item must have all body from model
      amount: 200,
      account: '', // filled later
      date: '2019-05-26',
      category: '', // filled later
      description: 'Description for First Category.'
    },
    nonRetornableFields: []
    // retornableFields: filled later
  },
  {
    body: {
      amount: 400,
      account: '', // filled later
      date: '2019-06-20',
      category: '' // filled later
    },
    nonRetornableFields: ['description']
    // retornableFields: filled later
  },
  {
    body: {
      amount: 600,
      account: '', // filled later
      date: '2019-06-20',
      category: '', // filled later
      description: 'Description'
    },
    nonRetornableFields: []
    // retornableFields: filled later
  }
];

createValidDataForPost(model, validData);

module.exports = validData;
