const model = require('./_model');
const { createValidDataForPut } = require('../../_shared/actions');

const validData = [
  /*{
    body: {
      amount: 123456
    },
    message: function() {
      return `should UPDATE an item changing AMOUNT to '${this.body.amount}'`;
    }
  },
  {
    body: {
      account: 'setValidValue' // filled later
    },
    message: function() {
      return `should UPDATE an item changing ACCOUNT to a valid value`;
    }
  },*/
  {
    body: {
      date: new Date('2019-01-24').toISOString()
    },
    message: function() {
      return `should UPDATE an item changing DATE to '${this.body.date}'`;
    }
  },
  {
    body: {
      category: 'setValidValue' // filled later
    },
    message: function() {
      return `should UPDATE an item changing CATEGORY to a valid value`;
    }
  },
  {
    body: {
      description: 'New description!!'
    },
    message: function() {
      return `should UPDATE an item changing DESCRIPTION to '${
        this.body.description
      }'`;
    }
  }
];

createValidDataForPut(model, validData);

module.exports = validData;
