const { validData, invalidData } = require('./data/get-by-id-data');
const { resourceSuffix } = require('./_params');

const baseTest = require('../_shared/base-getById.test');

baseTest.run({ resourceSuffix, validData, invalidData });