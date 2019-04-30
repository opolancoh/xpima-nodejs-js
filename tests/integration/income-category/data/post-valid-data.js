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
      description: 'Description for First Category.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Deposits'
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Salary'
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Savings',
      description: 'Description for Savings.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  }
];

module.exports = data;
