const model = require('./_model');
const { createValidDataForPost } = require('../../_shared/actions');

const validData = [
  {
    body: {
      // This item must have all body from model
      fromAccount: '', // filled later
      toAccount: '', // filled later
      amount: 1000,
      date: '2019-05-26',
      description: 'Description for First Transfer.'
    },
    nonRetornableFields: []
  },
  {
    body: {
      fromAccount: '', // filled later
      toAccount: '', // filled later
      amount: 2000,
      date: '2019-06-26'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      fromAccount: '', // filled later
      toAccount: '', // filled later
      amount: 3000,
      date: '2019-07-26'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      fromAccount: '', // filled later
      toAccount: '', // filled later
      amount: 4000,
      date: '2019-08-26'
    },
    nonRetornableFields: ['description']
  }
];

createValidDataForPost(model, validData);

module.exports = validData;
