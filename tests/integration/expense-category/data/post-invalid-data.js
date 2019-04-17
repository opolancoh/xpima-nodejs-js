const data = [
  {
    body: {
      description: 'This is a description'
    },
    status: 400,
    message: 'should not CREATE an item if NAME is missing'
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
      name: 'Home'
    },
    status: 409,
    message: 'should not CREATE a duplicated item'
  }
];

module.exports = data;
