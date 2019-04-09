const expect = require('chai').expect;

const validationUtils = require('../../helpers/validation-utils');

describe('isObjectId', () => {
    [{
        value: '5c527173051a2942f87abf8d',
            result: true
        },
        {
            value: '',
            result: false
        },
        {
            value: '5c527173051a2942f87abf81',
            result: true
        },
        {
            value: '456',
            result: false
        },
        {
            value: 456,
            result: false
        },
        {
            value: 'a',
            result: false
        },
        {
            value: -456,
            result: false
        }
    ].forEach(item => {
        it(`should return ${item.result} for value {${item.value}} and type {${typeof item.value}}`, () => {
            const result = validationUtils.isObjectId(item.value);
            expect(result).to.equal(item.result);
        });
    });
});

describe('isIntegerGreaterThanZero', () => {
    [{
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
        it(`should return ${item.result} for value {${item.value}} and type {${typeof item.value}}`, () => {
            const result = validationUtils.isIntegerGreaterThanZero(item.value);
            expect(result).to.equal(item.result);
        });
    });
});

describe('isIntegerGreaterOrEqualThanZero', () => {
    [{
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
            result: true
        },
        {
            value: 0,
            result: true
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
        it(`should return ${item.result} for value {${item.value}} and type {${typeof item.value}}`, () => {
            const result = validationUtils.isIntegerGreaterOrEqualThanZero(item.value);
            expect(result).to.equal(item.result);
        });
    });
});