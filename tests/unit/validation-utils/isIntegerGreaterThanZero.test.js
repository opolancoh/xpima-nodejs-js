const expect = require('chai').expect;

const validationUtils = require('../../../helpers/validation-utils');

describe('isIntegerGreaterThanZero', () => {
  [
    {
      value: '',
      result: false
    },
    {
      value: '1',
      result: true
    },
    {
      value: 1,
      result: true
    },
    {
      value: '0',
      result: false
    },
    {
      value: 0,
      result: false
    },
    {
      value: -1,
      result: false
    },
    {
      value: 456,
      result: true
    }
  ].forEach(item => {
    it(`should return ${item.result} for value {${
      item.value
    }} and type {${typeof item.value}}`, () => {
      const result = validationUtils.isIntegerGreaterThanZero(item.value);
      expect(result).to.equal(item.result);
    });
  });
});
