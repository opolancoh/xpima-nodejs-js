const model = require('./_model');
const { createValidDataForGetSelect } = require('../../_shared/actions');

const validData = [
  {
    query: 'select=name'
  },
  {
    query: 'select=description'
  },
  {
    query: 'select=description,name'
  },
  {
    query: ''
  }
];

createValidDataForGetSelect(model, validData);

module.exports = validData;
