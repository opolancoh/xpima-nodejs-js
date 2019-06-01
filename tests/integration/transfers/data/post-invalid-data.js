const baseInvalidData = require('../../_shared/data/base-invalid-data').getData(
  'CREATE'
);

const invalidData = [
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      toAccount: 'setValidValue', // filled later
      amount: 500000,
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if AMOUNT '${this.body.amount}' is greater than FROMACCOUNT balance`;
    }
  },
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      toAccount: 'setValidValue', // filled later
      amount: -1,
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if AMOUNT is '${this.body.amount}'`;
    }
  },
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      toAccount: 'setValidValue', // filled later
      amount: 0,
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if AMOUNT is '${this.body.amount}'`;
    }
  },
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      toAccount: 'setValidValue', // filled later
      amount: 'A',
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if AMOUNT is '${this.body.amount}'`;
    }
  },
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      toAccount: 'setValidValue', // filled later
      amount: 9007199254740992,
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if AMOUNT is greater than (2^53)-1 '${
        this.body.amount
      }'`;
    }
  },
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      toAccount: 'setValidValue', // filled later
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if AMOUNT is missing`;
    }
  },
  {
    body: {
      toAccount: 'setValidValue', // filled later
      amount: 10000,
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if FROMACCOUNT is missing`;
    }
  },
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      amount: 10000,
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if TOACCOUNT is missing`;
    }
  },
  {
    body: {
      fromAccount: '123456', // filled later
      toAccount: 'setValidValue', // filled later
      amount: 10000,
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if FROMACCOUNT is '${
        this.body.fromAccount
      }'`;
    }
  },
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      toAccount: '123456', // filled later
      amount: 10000,
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if TOACCOUNT is '${
        this.body.toAccount
      }'`;
    }
  },
  {
    body: {
      fromAccount: '5c6e36b17a76dd1f30c17be1', // filled later
      toAccount: 'setValidValue', // filled later
      amount: 10000,
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item when FROMACCOUNT '${
        this.body.fromAccount
      }' is valid' but not exists on DB`;
    }
  },
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      toAccount: '5c6e36b17a76dd1f30c17be1', // filled later
      amount: 10000,
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item when FROMACCOUNT '${
        this.body.fromAccount
      }' is valid' but not exists on DB`;
    }
  },
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      toAccount: 'setValidValue', // filled later
      amount: 10000,
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if DATE is missing`;
    }
  },
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      toAccount: 'setValidValue', // filled later
      amount: 10000,
      date: '2019-24-30',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if DATE is not valid '${
        this.body.date
      }'`;
    }
  },
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      toAccount: 'setValidValue', // filled later
      amount: 10000,
      date: '19-04-20',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if DATE is not valid '${
        this.body.date
      }'`;
    }
  },
  {
    body: {
      fromAccount: 'setValidValue', // filled later
      toAccount: 'setValidValue', // filled later
      amount: 10000,
      date: '2019-04-32',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if DATE is not valid '${
        this.body.date
      }'`;
    }
  },
  //
  ...baseInvalidData
];

module.exports = invalidData;
