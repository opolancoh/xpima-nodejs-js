const model = require('./_model');
const { createValidDataForPost } = require('../../_shared/actions');

const validData = [
  {
    body: {
      // This item must have all body from model
      level: 'error',
      timestamp: new Date(),
      description: 'This is log example for error level'
    },
    nonRetornableFields: []
  },
  {
    body: {
      level: 'warn',
      timestamp: new Date(),
      description: 'This is log example for warn level'
    },
    nonRetornableFields: []
  },
  {
    body: {
      level: 'info',
      timestamp: new Date(),
      description: 'This is log example for info level'
    },
    nonRetornableFields: []
  },
  {
    body: {
      level: 'verbose',
      timestamp: new Date(),
      description: 'This is log example for verbose level'
    },
    nonRetornableFields: []
  },
  {
    body: {
      level: 'debug',
      timestamp: new Date(),
      description: 'This is log example for debug level'
    },
    nonRetornableFields: []
  },
  {
    body: {
      // This item must have all body from model
      level: 'silly',
      timestamp: new Date(),
      description: 'This is log example for silly level'
    },
    nonRetornableFields: []
  },
  {
    body: {
      level: 'info',
      timestamp: new Date(),
      description: 'This is log example for info level'
    },
    nonRetornableFields: []
  },
  {
    body: {
      level: 'verbose',
      timestamp: new Date(),
      description: 'This is log example for verbose level'
    },
    nonRetornableFields: []
  },
  {
    body: {
      level: 'debug',
      timestamp: new Date(),
      description: 'This is log example for debug level'
    },
    nonRetornableFields: []
  },
  {
    body: {
      level: 'silly',
      timestamp: new Date(),
      description: 'This is log example for silly level'
    },
    nonRetornableFields: []
  }
];

createValidDataForPost(model, validData);

module.exports = validData;
