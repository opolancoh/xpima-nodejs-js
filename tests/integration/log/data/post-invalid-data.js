const data = [
  {
    body: {
      level: 'error'
    },
    code: 400,
    message: 'should not CREATE an item if a required field/property is missing'
  },
  {
    body: {
      prop: 'prop'
    },
    code: 400,
    message: 'should not CREATE an item when field/property is not allowed'
  },
  {
    body: {},
    code: 400,
    message: 'should not CREATE an empty item/object'
  },
  {
    body: {
      level: 'error',
      timestamp: 'timestamp',
      description: 'description'
    },
    code: 400,
    message: 'should not CREATE an item if timestamp is no a date type'
  }
];

module.exports = data;
