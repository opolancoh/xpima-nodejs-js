const data = [
  {
    body: {
      name: 'Visa',
      totalRevenues: -1,
      totalExpenditures: -1
    },
    code: 400,
    message:
      'should not CREATE an item if totalRevenues and totalExpenditures is -1'
  },
  {
    body: {
      name: 'Visa',
      totalRevenues: 0,
      totalExpenditures: 0
    },
    code: 400,
    message:
      'should not CREATE an item if totalRevenues and totalExpenditures is 0'
  },
  {
    body: {
      name: 'Visa',
      totalRevenues: 0,
      totalExpenditures: 0
    },
    code: 400,
    message:
      'should not CREATE an item if totalRevenues and totalExpenditures are greater thN (2^53)-1'
  },
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
      name: 'Visa'
    },
    code: 409,
    message: 'should not CREATE a duplicated item'
  }
];

module.exports = data;
