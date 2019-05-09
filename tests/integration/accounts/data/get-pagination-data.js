const baseGetPaginationData = require('../../_shared/data/base-get-pagination-data');
const totalCount = require('./post-valid-data').length;

const data = baseGetPaginationData.getData(totalCount);

module.exports = data;
