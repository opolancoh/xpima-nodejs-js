const model = require('./_model');
const { createValidDataForGetSelect } = require('../../_shared/actions');

const validData = [
  {
    query: 'select=name'
  },
  {
    query: 'select=email'
  },
  {
    query: 'select=password'
  },
  {
    query: 'select=email,name'
  },
  {
    query: ''
  }
];

createValidDataForGetSelect(model, validData);

module.exports = validData;
