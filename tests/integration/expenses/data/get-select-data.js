const model = require('./_model');
const { createValidDataForGetSelect } = require('../../_shared/actions');

const baseData = [
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

const validData = createValidDataForGetSelect(model, baseData);

module.exports = validData;
