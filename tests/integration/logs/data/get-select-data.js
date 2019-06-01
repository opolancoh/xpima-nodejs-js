const model = require('./_model');
const { createValidDataForGetSelect } = require('../../_shared/actions');

const validData = [
  {
    query: 'select=level'
  },
  {
    query: 'select=timestamp'
  },
  {
    query: 'select=description,level'
  },
  {
    query: ''
  }
];

createValidDataForGetSelect(model, validData);

module.exports = validData;
