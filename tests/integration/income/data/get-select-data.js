const model = require('./_model');
const { createValidDataForGetSelect } = require('../../_shared/actions');

const validData = [
  {
    query: 'select=amount'
  },
  {
    query: 'select=account'
  },
  {
    query: 'select=date'
  },
  {
    query: 'select=category'
  },
  {
    query: 'select=description'
  },
  {
    query: 'select=_id'
  },
  {
    query: ''
  }
];

createValidDataForGetSelect(model, validData);

module.exports = validData;
