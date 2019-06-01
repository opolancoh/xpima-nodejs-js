const model = require('./_model');
const { createValidDataForPut } = require('../../_shared/actions');

const validData = [
  {
    body: {
      date: '2019-01-24T00:00:00.000Z'
    },
    message: function() {
      return `should UPDATE an item changing DATE to '${this.body.date}'`;
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
