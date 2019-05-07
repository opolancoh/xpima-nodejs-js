const data = [
  {
    body: {
      name: 'Visa',
      balance: -1,
      totalExpenditures: -1
    },
    code: 400,
    message: 'should not CREATE an item if Balance is -1'
  },
  {
    body: {
      name: 'Visa',
      balance: 9007199254740992
    },
    code: 400,
    message: 'should not CREATE an item if Balance is greater than (2^53)-1'
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
      name: 'Visa',
      type: 'creditCard'
    },
    code: 409,
    message: 'should not CREATE a duplicated item'
  }
];

module.exports = data;
