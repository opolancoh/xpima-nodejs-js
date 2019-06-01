const model = require('./_model');
const { createValidDataForGetSelect } = require('../../_shared/actions');

const validData = [
  {
    query: 'select=fromAccount'
  },
  {
    query: 'select=toAccount'
  },
  {
    query: 'select=amount'
  },
  {
    query: 'select=date'
  },
  {
    query: 'select=description'
  },
  {
    query: 'select=description,amount'
  },
  {
    query: ''
  }
];

createValidDataForGetSelect(model, validData);

module.exports = validData;
