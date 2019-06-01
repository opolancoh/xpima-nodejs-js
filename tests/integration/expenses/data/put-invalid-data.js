const baseInvalidData = require('../../_shared/data/base-invalid-data').getData(
  'UPDATE'
);

const invalidData = [
  {
    id: '5c6e36b17a76dd1f30c17be1',
    body: { description: 'New description!!' },
    code: 404,
    message: function() {
      return `should not UPDATE an item when ID '${
        this.id
      }' is valid but not exists on DB`;
    }
  },
  {
    id: '123',
    body: { amount: 654321 },
    code: 400,
    message: function() {
      return `should not UPDATE an item when ID '${this.id}' is not valid`;
    }
  },
  {
    id: '5c6e36b17a76dd1f30c17be1',
    body: {
      account: '5c6e36b17a76dd1f30c17be1',
      description: 'New description!!'
    },
    code: 400,
    message: function() {
      return `should not UPDATE an item when ACCOUNT is sent`;
    }
  },
  {
    id: '5c6e36b17a76dd1f30c17be1',
    body: {
      amount: 100,
      description: 'New description!!'
    },
    code: 400,
    message: function() {
      return `should not UPDATE an item when AMOUNT is sent`;
    }
  },
  ...baseInvalidData
];

module.exports = invalidData;
