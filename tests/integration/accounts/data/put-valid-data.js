const model = require('./_model');
const { createValidDataForPut } = require('../../_shared/actions');

const validData = [
  {
    body: {
      name: 'New name!!'
    },
    message: function() {
      return `should UPDATE an item changing NAME to '${this.body.name}'`;
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
  },
  {
    body: {
      type: 'creditCard'
    },
    message: function() {
      return `should UPDATE an item changing TYPE to '${this.body.type}'`;
    }
  }
];

createValidDataForPut(model, validData);

module.exports = validData;
