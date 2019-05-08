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
      name: 'Food',
      description: 'Description for food.'
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'Bills'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      name: 'Transportation',
      description: 'Description for Transportation.'
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'Home'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      name: 'Car',
      description: 'Description for Car.'
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'Entertainment'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      name: 'Shopping',
      description: 'Description for Shopping.'
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'Clothing'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      name: 'Learning',
      description: 'Description for Learning.'
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'Tax'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      name: 'Communications',
      description: 'Description for Communications.'
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'Health'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      name: 'Eating Out',
      description: 'Description for Eating Out.'
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'Bar'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      name: 'Travel'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      name: 'Snacks'
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      name: 'Children'
    },
    nonRetornableFields: ['description']
  }
];

createValidDataForPost(model, validData);

module.exports = validData;
