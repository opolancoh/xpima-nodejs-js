const data = [
  {
    query: 'select=name',
    shouldHaveFields: [
      {
        name: 'name',
        type: 'string'
      }
    ],
    shouldNotHaveFields: ['description', 'createdAt', 'updatedAt']
  },
  {
    query: 'select=description',
    shouldHaveFields: [
      {
        name: 'description',
        type: 'string'
      }
    ],
    shouldNotHaveFields: ['name', 'createdAt', 'updatedAt']
  },
  {
    query: 'select=description,name',
    shouldHaveFields: [
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'description',
        type: 'string'
      }
    ],
    shouldNotHaveFields: ['createdAt', 'updatedAt']
  },
  {
    query: '',
    shouldHaveFields: [
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'description',
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
    shouldNotHaveFields: []
  }
];

module.exports = data;
