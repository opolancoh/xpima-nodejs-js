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
      type: 'cash',
      balance: 700000,
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
      type: 'cash',
      balance: 9007199254740991, // The largest exact integral value is 2^53-1, or 9007199254740991
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
      type: 'creditCard',
      balance: 1500000
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Master Card Prepaid',
      type: 'creditCard',
      balance: 1500000,
      description: 'Prepaid credit card.'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Bancolombia Ahorros',
      type: 'bankAccount',
      balance: 1500000,
      description: "Bancolombia's savings account"
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'Bancolombia Corriente',
      type: 'bankAccount',
      description: "Bancolombia's current account"
    },
    shouldNotHaveFields: ['description'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  }
];

module.exports = data;
