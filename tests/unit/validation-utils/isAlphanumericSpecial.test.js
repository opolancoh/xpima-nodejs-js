const expect = require('chai').expect;

const validationUtils = require('../../../helpers/validation-utils');

describe('isAlphanumericSpecial', () => {
  [
    {
      value:
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 -_',
      result: true
    },
    {
      value: undefined,
      result: false
    },
    {
      value: '',
      result: false
    },
    {
      value: '.~:/?#[]@!$&()*+,;=|{}%!`',
      result: false
    }
  ].forEach(item => {
    it(`should return ${item.result} for value {${
      item.value
    }} and type {${typeof item.value}}`, () => {
      const result = validationUtils.isAlphanumericSpecial(item.value);
      expect(result).to.equal(item.result);
    });
  });
});
