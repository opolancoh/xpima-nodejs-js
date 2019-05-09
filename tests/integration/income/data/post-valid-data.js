const model = require('./_model');
const { createValidDataForPost } = require('../../_shared/actions');

const validData = [
  {
    body: {
      // This item must have all body from model
      amount: 1050000,
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
      amount: 2000,
      account: '', // filled later
      date: '2019-06-20',
      category: '' // filled later
    },
    nonRetornableFields: ['description']
    // retornableFields: filled later
  },
  {
    body: {
      amount: 9007199254740991, // The largest exact integral value is 2^53-1, or 9007199254740991
      account: '', // filled later
      date: '2019-06-20',
      category: '', // filled later
      description:
        'The largest exact integral value is 2^53-1, or 9007199254740991'
    },
    nonRetornableFields: []
    // retornableFields: filled later
  }
];

createValidDataForPost(model, validData);

module.exports = validData;
