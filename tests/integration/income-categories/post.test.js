const validData = require('./data/post-valid-data');
const invalidData = require('./data/post-invalid-data');
const { resourceSuffix } = require('./_params');

const baseTest = require('../_shared/base-post.test');

baseTest.run({ resourceSuffix, validData, invalidData, propName: 'name' });
