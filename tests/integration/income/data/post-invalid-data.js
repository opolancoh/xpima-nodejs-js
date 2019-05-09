const baseInvalidData = require('../../_shared/data/base-invalid-data').getData(
  'CREATE'
);

const invalidData = [
  {
    body: {
      amount: -1,
      account: 'setValidValue', // filled later
      date: '2019-05-26',
      category: 'setValidValue', // filled later
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if AMOUNT is '${this.body.amount}'`;
    }
  },
  {
    body: {
      amount: 0,
      account: 'setValidValue', // filled later
      date: '2019-05-26',
      category: 'setValidValue', // filled later
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if AMOUNT is '${this.body.amount}'`;
    }
  },
  {
    body: {
      amount: 'A',
      account: 'setValidValue', // filled later
      date: '2019-05-26',
      category: 'setValidValue', // filled later
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if AMOUNT is '${this.body.amount}'`;
    }
  },
  {
    body: {
      amount: 9007199254740992,
      account: 'setValidValue', // filled later
      date: '2019-05-26',
      category: 'setValidValue', // filled later
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
      account: 'setValidValue', // filled later
      date: '2019-05-26',
      category: 'setValidValue', // filled later
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if AMOUNT is missing`;
    }
  },
  {
    body: {
      amount: 1000,
      date: '2019-05-26',
      category: 'setValidValue', // filled later
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if ACCOUNT is missing`;
    }
  },
  {
    body: {
      amount: 1000,
      account: '123456',
      date: '2019-05-26',
      category: 'setValidValue', // filled later
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if ACCOUNT is '${this.body.account}'`;
    }
  },
  {
    body: {
      amount: 1000,
      account: '5c6e36b17a76dd1f30c17be1',
      date: '2019-05-26',
      category: 'setValidValue', // filled later
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item when ACCOUNT '${
        this.body.account
      }' is valid' but not exists on DB`;
    }
  },
  {
    body: {
      amount: 1000,
      account: 'setValidValue', // filled later
      category: 'setValidValue', // filled later
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if DATE is missing`;
    }
  },
  {
    body: {
      amount: 1000,
      account: 'setValidValue', // filled later
      date: '2019-24-30',
      category: 'setValidValue', // filled later
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
      amount: 1000,
      account: 'setValidValue', // filled later
      date: '19-04-20',
      category: 'setValidValue', // filled later
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
      amount: 1000,
      account: 'setValidValue', // filled later
      date: '2019-04-32',
      category: 'setValidValue', // filled later
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
      amount: 1000,
      account: 'setValidValue', // filled later
      date: '2019-05-26',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if CATEGORY is missing`;
    }
  },
  {
    body: {
      amount: 1000,
      account: 'setValidValue', // filled later
      date: '2019-05-26',
      category: '654321',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if CATEGORY is '${this.body.category}'`;
    }
  },
  {
    body: {
      amount: 1000,
      account: 'setValidValue', // filled later
      date: '2019-05-26',
      category: '5c6e36b17a76dd1f30c17be1',
      description: 'Description.'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item when CATEGORY '${
        this.body.category
      }' is valid' but not exists on DB`;
    }
  },
  //
  ...baseInvalidData
];

module.exports = invalidData;
