const paginationData = require('./data/get-pagination-data');
const selectData = require('./data/get-select-data');
const totalCount = require('./data/post-valid-data').length;
const { resourceSuffix } = require('./_params');

const baseTest = require('../_shared/base-get.test');

baseTest.run({
  resourceSuffix,
  paginationData,
  selectData,
  totalCount
});
