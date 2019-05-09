const validData = require('./data/put-valid-data');
const invalidData = require('./data/put-invalid-data');
const { resourceSuffix } = require('./_params');

const baseTest = require('../_shared/base-put.test');

baseTest.run({ resourceSuffix, validData, invalidData });
