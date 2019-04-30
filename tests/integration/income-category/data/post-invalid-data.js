const data = [
  {
    body: {
      description: 'This is a description'
    },
    code: 400,
    message: 'should not CREATE an item if NAME is missing'
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
      name: 'Salary'
    },
    code: 409,
    message: 'should not CREATE a duplicated item'
  }
];

module.exports = data;
