const model = require('./_model');
const { createValidDataForPost } = require('../../_shared/actions');

const validData = [
  {
    body: {
      // This item must have all body from model
      name: 'First Account',
      type: 'cash',
      balance: 700000,
      description: 'Description for First Account.'
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'Cash',
      type: 'cash',
      balance: 9007199254740991, // The largest exact integral value is 2^53-1, or 9007199254740991
      description: 'Description for cash.'
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'Visa',
      type: 'creditCard',
      balance: 1500000
    },
    nonRetornableFields: ['description']
  },
  {
    body: {
      name: 'Master Card Prepaid',
      type: 'creditCard',
      balance: 1500000,
      description: 'Prepaid credit card.'
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'Bancolombia Ahorros',
      type: 'bankAccount',
      balance: 1500000,
      description: "Bancolombia's savings account"
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'Bancolombia Corriente',
      type: 'bankAccount',
      description: "Bancolombia's current account"
    },
    nonRetornableFields: []
  }
];

createValidDataForPost(model, validData);

module.exports = validData;
