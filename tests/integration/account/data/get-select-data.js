const data = [
  {
    query: 'select=name',
    shouldHaveFields: [
      {
        name: 'name',
        type: 'string'
      }
    ],
    shouldNotHaveFields: [
      'type',
      'balance',
      'totalRevenue',
      'totalExpenses',
      'description',
      'createdAt',
      'updatedAt'
    ]
  },
  {
    query: 'select=description',
    shouldHaveFields: [
      {
        name: 'description',
        type: 'string'
      }
    ],
    shouldNotHaveFields: [
      'name',
      'type',
      'balance',
      'totalRevenue',
      'totalExpenses',
      'createdAt',
      'updatedAt'
    ]
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
    shouldNotHaveFields: [
      'type',
      'balance',
      'totalRevenue',
      'totalExpenses',
      'createdAt',
      'updatedAt',
      'createdAt',
      'updatedAt'
    ]
  },
  {
    query: '',
    shouldHaveFields: [
      {
        name: '_id',
        type: 'string'
      },
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'type',
        type: 'string'
      },
      {
        name: 'balance',
        type: 'number'
      },
      {
        name: 'description',
        type: 'string'
      },
      {
        name: 'totalRevenue',
        type: 'number'
      },
      {
        name: 'totalExpenses',
        type: 'number'
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
