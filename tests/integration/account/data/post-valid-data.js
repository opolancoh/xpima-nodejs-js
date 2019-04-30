const shouldHaveFields = [
  {
    name: '_id',
    type: 'string'
  },
  {
    name: 'name',
    type: 'string'
  },
  {
    name: 'totalRevenues',
    type: 'number'
  },
  {
    name: 'totalExpenditures',
    type: 'number'
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
];

const filterFields = fields => {
  return shouldHaveFields.filter(item => {
    let ret = true;
    for (const field of fields) {
      if (item.name === field) return false;
    }
    return ret;
  });
};

const data = [
  {
    body: {
      // This item must have all body from model
      name: 'First Category',
      totalRevenues: 1500000,
      totalExpenditures: 700000,
      description: 'Description for First Category.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Cash',
      totalRevenues: 9007199254740991, // The largest exact integral value is 2^53-1, or 9007199254740991
      totalExpenditures: 9007199254740991,
      description: 'Description for cash.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Visa',
      totalRevenues: 5000000,
      totalExpenditures: 1500000
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Master Card Prepaid',
      description: 'Prepaid credit card.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  }
];

module.exports = data;
