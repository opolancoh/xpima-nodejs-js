const model = require('./_model');
const { createValidDataForPut } = require('../../_shared/actions');

const validData = [
  {
    body: {
      name: 'New name!!'
    },
    message: function() {
      return `should UPDATE an item changing 'name' to '${this.body.name}'`;
    }
  },
  {
    body: {
      email: 'user0001@ikobit.com'
    },
    message: function() {
      return `should UPDATE an item changing the 'email' to '${
        this.body.email
      }'`;
    }
  }
  /*   {
    body: {
      password: 'myPa$$w0rd'
    },
    message: function() {
      return `should UPDATE an item changing the 'password' to '${
        this.body.password
      }'`;
    }
  } */
];

createValidDataForPut(model, validData);

module.exports = validData;
