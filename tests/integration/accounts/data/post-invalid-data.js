const baseInvalidData = require('../../_shared/data/base-invalid-data').getData(
  'CREATE'
);

const invalidData = [
  {
    body: {
      name: 'Visa',
      balance: -1,
      totalExpenditures: -1
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if BALANCE is ${this.body.balance}`;
    }
  },
  {
    body: {
      name: 'Visa',
      balance: 9007199254740992
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if BALANCE '${
        this.body.balance
      }' is greater than (2^53)-1`;
    }
  },
  {
    body: {
      description: 'This is a description'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if NAME is missing`;
    }
  },
  {
    body: {
      name: 'Visa',
      type: 'creditCard'
    },
    code: 409,
    message: function() {
      return `should not CREATE a duplicated item`;
    }
  },
  ...baseInvalidData
];

module.exports = invalidData;
