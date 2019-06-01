const model = require('./_model');
const { createValidDataForPost } = require('../../_shared/actions');

const validData = [
  {
    body: {
      // This item must have all body from model
      name: 'User 1',
      email: 'user1@ikobit.com',
      password: 'User1Pa$$'
    },
    nonRetornableFields: ['password']
  },
  {
    body: {
      name: 'User 2',
      email: 'user2@ikobit.com',
      password: 'User2Pa$$'
    },
    nonRetornableFields: ['password']
  },
  {
    body: {
      name: 'User 3',
      email: 'user3@ikobit.com',
      password: 'User3Pa$$'
    },
    nonRetornableFields: ['password']
  },
  {
    body: {
      name: 'User 4',
      email: 'user4@ikobit.com',
      password: 'User4Pa$$'
    },
    nonRetornableFields: ['password']
  }
];

createValidDataForPost(model, validData);

module.exports = validData;
