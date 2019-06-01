const baseInvalidData = require('../../_shared/data/base-invalid-data').getData(
  'UPDATE'
);

const invalidData = [
  {
    id: '123456',
    body: { description: 'New description!!' },
    code: 400,
    message: function() {
      return `should not UPDATE an item when ID '${this.id}' is not valid`;
    }
  },
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
    id: '5c6e36b17a76dd1f30c17be1',
    body: {
      fromAccount: '5c6e36b17a76dd1f30c17be1',
      description: 'New description!!'
    },
    code: 400,
    message: function() {
      return `should not UPDATE an item when FROMACCOUNT is sent`;
    }
  },
  {
    id: '5c6e36b17a76dd1f30c17be1',
    body: {
      toAccount: '5c6e36b17a76dd1f30c17be1',
      description: 'New description!!'
    },
    code: 400,
    message: function() {
      return `should not UPDATE an item when TOACCOUNT is sent`;
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
