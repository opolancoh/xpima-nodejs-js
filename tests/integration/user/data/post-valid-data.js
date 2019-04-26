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
    name: 'email',
    type: 'string'
  },
  {
    name: 'password',
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
      name: 'User 1',
      email: 'user1@ikobit.com',
      password: 'User1Pa$$'
    },
    shouldNotHaveFields: ['password'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'User 2',
      email: 'user2@ikobit.com',
      password: 'User2Pa$$'
    },
    shouldNotHaveFields: ['password'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'User 3',
      email: 'user3@ikobit.com',
      password: 'User3Pa$$'
    },
    shouldNotHaveFields: ['password'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  },
  {
    body: {
      name: 'User 4',
      email: 'user4@ikobit.com',
      password: 'User4Pa$$'
    },
    shouldNotHaveFields: ['password'],
    shouldHaveFields: function() {
      return filterFields(this.shouldNotHaveFields);
    }
  }
];

module.exports = data;
