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
      return `should not CREATE an item if a required field/property is missing`;
    }
  },
  {
    body: {
      level: 'error',
      timestamp: 'timestamp',
      description: 'description'
    },
    code: 400,
    message: function() {
      return `should not CREATE an item if timestamp is no a date type`;
    }
  },
  ...baseInvalidData
];

module.exports = invalidData;
