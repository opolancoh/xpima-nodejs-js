// validate required environment variables
[
    'XPIMA_INTEGRATION_TEST_URI'
].forEach(item => {
    if (!process.env[item]) {
        console.error(`Environment variable '${item}' is not defined!`);
        process.exit(1);
    }
});

const config = require('config');
const request = require('supertest');

const validationUtils = require('../../helpers/validation-utils');
const {
    validData,
    invalidData
} = require('./expense-category.data');

const url = process.env.XPIMA_INTEGRATION_TEST_URI;
let data;

const expenseCategoriesEndpoint = '/api/expense-categories';
describe(expenseCategoriesEndpoint, () => {
    /*describe('POST', () => {
        validData.forEach((element, index, array) => {
            it(`should create an item with name {${element.name}}`, async () => {
                const res = await request(url)
                    .post(expenseCategoriesEndpoint)
                    .send(element);

                expect(res.status).toBe(201);
                array[index]._id = res._id;
                console.log();
            });
        });
    });*/
    describe('GET', () => {
        it(`should return '${config.get('app.items.limit')}' items`, async () => {
            const res = await request(url)
                .get(expenseCategoriesEndpoint);

            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(config.get('app.items.limit'));
            data = res.body;
        });
    });
});