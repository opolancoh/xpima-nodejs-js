const data = [
  {
    body: {
      description: 'This is a description'
    },
    response: {
      status: 'failure',
      code: 400
    },
    message: 'should not CREATE an item if NAME is missing'
  },
  {
    body: {
      prop: 'prop'
    },
    response: {
      status: 'failure',
      code: 400
    },
    message: 'should not CREATE an item when field/property is not allowed'
  },
  {
    body: {},
    response: {
      status: 'failure',
      code: 400
    },
    message: 'should not CREATE an empty item/object'
  },
  {
    body: {
      name: 'Home'
    },
    response: {
      status: 'failure',
      code: 409
    },
    message: 'should not CREATE a duplicated item'
  }
];

module.exports = data;
