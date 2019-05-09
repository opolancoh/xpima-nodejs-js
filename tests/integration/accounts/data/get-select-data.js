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
    query: 'select=type'
  },
  {
    query: 'select=description'
  },
  {
    query: 'select=balance'
  },
  {
    query: 'select=totalRevenue'
  },
  {
    query: 'select=totalExpenses'
  },
  {
    query: ''
  }
];

createValidDataForGetSelect(model, validData);

module.exports = validData;
