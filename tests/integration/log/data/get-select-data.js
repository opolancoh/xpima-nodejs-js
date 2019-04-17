const data = [
  {
    query: 'select=level',
    shouldHaveFields: [
      {
        name: 'level',
        type: 'string'
      }
    ],
    shouldNotHaveFields: ['timestamp', 'description']
  },
  {
    query: 'select=timestamp',
    shouldHaveFields: [
      {
        name: 'timestamp',
        type: 'string'
      }
    ],
    shouldNotHaveFields: ['level', 'description']
  },
  {
    query: 'select=level,description',
    shouldHaveFields: [
      {
        name: 'level',
        type: 'string'
      },
      {
        name: 'description',
        type: 'string'
      }
    ],
    shouldNotHaveFields: ['timestamp']
  },
  {
    query: '',
    shouldHaveFields: [
      {
        name: 'level',
        type: 'string'
      },
      {
        name: 'description',
        type: 'string'
      },
      {
        name: 'timestamp',
        type: 'string'
      }
    ],
    shouldNotHaveFields: []
  }
];

module.exports = data;
