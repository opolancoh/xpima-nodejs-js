const data = [
  {
    query: 'select=name',
    shouldHaveFields: [
      {
        name: 'name',
        type: 'string'
      }
    ],
    shouldNotHaveFields: ['email', 'password', 'createdAt', 'updatedAt']
  },
  {
    query: 'select=email',
    shouldHaveFields: [
      {
        name: 'email',
        type: 'string'
      }
    ],
    shouldNotHaveFields: ['name', 'password', 'createdAt', 'updatedAt']
  },
  {
    query: 'select=password',
    shouldHaveFields: [],
    shouldNotHaveFields: ['name', 'email', 'password', 'createdAt', 'updatedAt']
  },
  {
    query: 'select=email,name',
    shouldHaveFields: [
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'email',
        type: 'string'
      }
    ],
    shouldNotHaveFields: ['password', 'createdAt', 'updatedAt']
  },
  {
    query: '',
    shouldHaveFields: [
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'email',
        type: 'string'
      },
      {
        name: 'createdAt',
        type: 'string'
      },
      {
        name: 'updatedAt',
        type: 'string'
      }
    ],
    shouldNotHaveFields: ['password']
  }
];

module.exports = data;
