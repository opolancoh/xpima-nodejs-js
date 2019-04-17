const data = [
  {
    body: {
      level: 'error'
    },
    status: 400,
    message: 'should not CREATE an item if a required field/property is missing'
  },
  {
    body: {
      prop: 'prop'
    },
    status: 400,
    message: 'should not CREATE an item when field/property is not allowed'
  },
  {
    body: {},
    status: 400,
    message: 'should not CREATE an empty item/object'
  },
  {
    body: {
      level: 'error',
      timestamp: 'timestamp',
      description: 'description'
    },
    status: 400,
    message: 'should not CREATE an item if timestamp is no a date type'
  }
];

module.exports = data;
