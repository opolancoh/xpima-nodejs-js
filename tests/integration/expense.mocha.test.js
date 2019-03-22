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
const expect = require('chai').expect;

const {
    validData,
    invalidData
} = require('./expense.data');

const baseUrl = process.env.XPIMA_INTEGRATION_TEST_URI;
const resourceEndpoint = '/api/expenses';

/*describe(resourceEndpoint, () => {
    let dataFromDb;
    let categoriesFromDb;
    describe('GET Expense Categories', () => {
        it(`status 200: should GET Expense Categories`, async () => {
            const res = await request(baseUrl)
                .get('/api/expense-categories');

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('data');
            expect(res.body.data).to.have.length(config.get('app.items.limit'));
            categoriesFromDb = res.body.data;
        });
    });
    describe(`POST ${resourceEndpoint}`, () => {
        validData.forEach((element, index) => {
            it(`status 201: should CREATE a valid item`, async () => {
                if (index % 2 == 0) {
                    element.category = categoriesFromDb[Math.floor(Math.random() * categoriesFromDb.length)]._id
                }
                const res = await request(baseUrl)
                    .post(resourceEndpoint)
                    .send(element);

                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.a.property('_id');
                expect(res.body).to.have.a.property('amount');
                expect(res.body).to.have.a.property('date');
                expect(res.body).to.have.a.property('paymentType');
                expect(res.body).to.have.a.property('createdAt');
                expect(res.body).to.have.a.property('updatedAt');
            });
        });
        invalidData.forEach((element) => {
            it(`status ${element.status}: ${element.message}`, async () => {
                const res = await request(baseUrl)
                    .post(resourceEndpoint)
                    .send(element.body);

                expect(res.status).to.equal(element.status);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.a.property('message');
            });
        });
    });
    describe(`GET ${resourceEndpoint}`, () => {
        it(`status 200: should GET ${config.get('app.items.limit')} items`, async () => {
            const res = await request(baseUrl)
                .get(resourceEndpoint);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('data');
            expect(res.body.data).to.have.length(config.get('app.items.limit'));
            dataFromDb = res.body.data;
        });
        it(`status 200: should GET 2 items when param ?limit=2`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}?limit=2`);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('data');
            expect(res.body.data).to.have.length(2);
        });
        it(`status 200: should GET ${config.get('app.items.limit')} items when param ?limit=0`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}?limit=0`);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('data');
            expect(res.body.data).to.have.length(config.get('app.items.limit'));
        });
        it(`status 200: should GET ${config.get('app.items.limit')} items when param ?limit=-1`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}?limit=-1`);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('data');
            expect(res.body.data).to.have.length(config.get('app.items.limit'));
        });
        it(`status 200: should GET ${config.get('app.items.limit')} items when param ?limit=a`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}?limit=a`);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('data');
            expect(res.body.data).to.have.length(config.get('app.items.limit'));
        });
        it(`status 200: should GET maximum ${config.get('app.items.limitMax')} items when param ?limit=10000`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}?limit=10000`);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('data');
            expect(res.body.data).to.have.length.of.at.most(config.get('app.items.limitMax'));
        });
    });
    describe(`GET ${resourceEndpoint}/:id`, () => {
        it(`status 200: should GET an item when ID is valid`, async () => {
            const item = dataFromDb[0];
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}/${item._id}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('_id');
        });
        it(`status 400: should not GET an item when ID is not valid`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}/${'123456'}`);

            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('message');
            expect(res.body).to.have.a.property('errors');
        });
        it(`status 404: should not GET an item when ID is valid but an item was not found`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}/${'5c6e36b17a76dd1f30c17be1'}`);

            expect(res.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('message');
        });
    });
    describe(`PUT ${resourceEndpoint}/:id`, () => {
        it(`status 200: should UPDATE an item changing the amount to '123456.78'`, async () => {
            const item = dataFromDb[0];
            const newItem = {
                amount: 123456.78
            };
            const res = await request(baseUrl)
                .put(`${resourceEndpoint}/${item._id}`)
                .send(newItem);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('_id');
            expect(res.body).to.have.a.property('amount', 123456.78);
        });
        it(`status 400: should not UPDATE an item with no fields`, async () => {
            const item = dataFromDb[1];
            const newItem = {};
            const res = await request(baseUrl)
                .put(`${resourceEndpoint}/${item._id}`)
                .send(newItem);

            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('message');
            expect(res.body).to.have.a.property('errors');
        });
        it(`status 400: should not UPDATE an item when ID is not valid`, async () => {
            const res = await request(baseUrl)
                .put(`${resourceEndpoint}/${'5c6e36b17a76dd1f30c17be1'}`)
                .send({});

            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('message');
            expect(res.body).to.have.a.property('errors');
        });
        it(`status 404: should not UPDATE an item when ID is valid but an item was not found`, async () => {
            const newItem = {
                amount: 987654
            };
            const res = await request(baseUrl)
                .put(`${resourceEndpoint}/${'5c6e36b17a76dd1f30c17be1'}`)
                .send(newItem);

            expect(res.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('message');
        });
    });
    describe(`DELETE ${resourceEndpoint}/:id`, () => {
        it(`status 200: should DELETE an item given the id`, async () => {
            const item = dataFromDb[1];

            const res = await request(baseUrl)
                .delete(`${resourceEndpoint}/${item._id}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('message');
        });
        it(`status 400: should not DELETE an item when ID is not valid`, async () => {
            const res = await request(baseUrl)
                .delete(`${resourceEndpoint}/${'123456'}`);

            expect(res.status).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('message');
            expect(res.body).to.have.a.property('errors');
        });
        it(`status 404: should no DELETE an item when ID is valid but an item was not found`, async () => {
            const res = await request(baseUrl)
                .delete(`${resourceEndpoint}/${'5c6e36b17a76dd1f30c17be1'}`);

            expect(res.status).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.a.property('message');
        });
    });
});*/