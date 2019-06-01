const baseInvalidData = require('../../_shared/data/base-invalid-data').getData(
  'CREATE'
);

const invalidData = [
  {
    body: {
      description: 'This is a description'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if NAME is missing`;
    }
  },
  {
    body: {
      name: 'Salary'
    },
    code: 409,
    message: function() {
      return `should not CREATE a duplicated item`;
    }
  },
  ...baseInvalidData
];

module.exports = invalidData;
