const config = require('config');

const defaultRowLimit = config.get('app.items.limit');
const defaultMaxRowLimit = config.get('app.items.limitMax');
const totalCount = require('./post-valid-data').length;

const data = [
  {
    query: '?limit=2&offset=0',
    limit: 2,
    offset: 0,
    dataLength: 2
  },
  {
    query: '',
    limit: defaultRowLimit,
    offset: 0,
    dataLength: defaultRowLimit
  },
  {
    query: '?limit=0&offset=0',
    limit: defaultRowLimit,
    offset: 0,
    dataLength: defaultRowLimit
  },
  {
    query: '?limit=-1&offset=-2',
    limit: defaultRowLimit,
    offset: 0,
    dataLength: defaultRowLimit
  },
  {
    query: '?limit=a&offset=b',
    limit: defaultRowLimit,
    offset: 0,
    dataLength: defaultRowLimit
  },
  {
    query: '?limit=10000',
    limit: defaultMaxRowLimit,
    offset: 0,
    dataLength: totalCount
  },
  {
    query: '?limit=9&offset=100',
    limit: 9,
    offset: 100,
    dataLength: 0
  }
];

module.exports = data;
