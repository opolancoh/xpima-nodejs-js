const shouldHaveFields = [
  {
    name: '_id',
    type: 'string'
  },
  {
    name: 'level',
    type: 'string'
  },
  {
    name: 'timestamp',
    type: 'string'
  },
  {
    name: 'description',
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
      level: 'error',
      timestamp: new Date(),
      description: 'This is log example for error level'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      // This item must have all body from model
      level: 'warn',
      timestamp: new Date(),
      description: 'This is log example for warn level'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      // This item must have all body from model
      level: 'info',
      timestamp: new Date(),
      description: 'This is log example for info level'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      // This item must have all body from model
      level: 'verbose',
      timestamp: new Date(),
      description: 'This is log example for verbose level'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      // This item must have all body from model
      level: 'debug',
      timestamp: new Date(),
      description: 'This is log example for debug level'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      // This item must have all body from model
      level: 'silly',
      timestamp: new Date(),
      description: 'This is log example for silly level'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      // This item must have all body from model
      level: 'info',
      timestamp: new Date(),
      description: 'This is log example for info level'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      // This item must have all body from model
      level: 'verbose',
      timestamp: new Date(),
      description: 'This is log example for verbose level'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      // This item must have all body from model
      level: 'debug',
      timestamp: new Date(),
      description: 'This is log example for debug level'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      // This item must have all body from model
      level: 'silly',
      timestamp: new Date(),
      description: 'This is log example for silly level'
    },
    shouldNotHaveFields: [],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  }
];

module.exports = data;
