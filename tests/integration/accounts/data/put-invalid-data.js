const baseInvalidData = require('../../_shared/data/base-invalid-data').getData(
  'UPDATE'
);

const invalidData = [
  {
    id: '5c6e36b17a76dd1f30c17be1',
    body: { totalRevenue: 1000 },
    code: 400,
    message: function() {
      return `should not UPDATE an item if 'totalRevenue' field is present in the payload`;
    }
  },
  {
    id: '5c6e36b17a76dd1f30c17be1',
    body: { totalExpenses: 1000 },
    code: 400,
    message: function() {
      return `should not UPDATE an item if 'totalExpenses' field is present in the payload`;
    }
  },
  {
    id: '5c6e36b17a76dd1f30c17be1',
    body: { balance: 1000 },
    code: 400,
    message: function() {
      return `should not UPDATE an item if 'balance' field is present in the payload`;
    }
  },
  {
    id: '123456',
    body: { name: 'New name!!' },
    code: 400,
    message: function() {
      return `should not UPDATE an item when ID '${this.id}' is not valid`;
    }
  },
  {
    id: '5c6e36b17a76dd1f30c17be1',
    body: { name: 'New name 2!!' },
    code: 404,
    message: function() {
      return `should not UPDATE an item when ID '${
        this.id
      }' is valid but not exists on DB`;
    }
  },
  ...baseInvalidData
];

module.exports = invalidData;
