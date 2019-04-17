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
      name: 'Food',
      description: 'Description for food.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Bills'
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Transportation',
      description: 'Description for Transportation.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Home'
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Car',
      description: 'Description for Car.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Entertainment'
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Shopping',
      description: 'Description for Shopping.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Clothing'
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Learning',
      description: 'Description for Learning.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Tax'
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Communications',
      description: 'Description for Communications.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Health'
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Eating Out',
      description: 'Description for Eating Out.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Bar'
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Travel'
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Snacks'
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Children'
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  }
];

module.exports = data;
