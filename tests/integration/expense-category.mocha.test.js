// validate required environment variables
console.log('\nvalidating environment variables ...');
[
    'XPIMA_INTEGRATION_TEST_URI'
].forEach(item => {
    if (!process.env[item]) {
        console.error(`Environment variable '${item}' is not defined!`);
        process.exit(1);
    } else {
        console.log(item, process.env[item]);
    }
});

const config = require('config');
const request = require('supertest');
const expect = require('chai').expect;

const {
    validData,
    invalidData
} = require('./expense-category.data');

const baseUrl = process.env.XPIMA_INTEGRATION_TEST_URI;
const resourceEndpoint = '/api/expense-categories';

describe(resourceEndpoint, () => {
    let dataFromDb;
    describe(`POST ${resourceEndpoint}`, () => {
        validData.forEach((element) => {
            it(`status 201: should CREATE an item with name {${element.name}}`, async () => {
                const res = await request(baseUrl)
                    .post(resourceEndpoint)
                    .send(element);

                expect(res.status).to.equal(200);
                expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('success');
                expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(201);
                expect(res.body).to.have.a.property('d').to.be.an('object');
                expect(res.body).to.have.a.property('d').to.have.a.property('_id').to.be.a('string');
                expect(res.body).to.have.a.property('d').to.have.a.property('name').to.be.a('string');
                expect(res.body).to.have.a.property('d').to.have.a.property('createdAt').to.be.a('string');
                expect(res.body).to.have.a.property('d').to.have.a.property('updatedAt').to.be.a('string');
            });
        });
        invalidData.forEach((element) => {
            it(`status ${element.status}: ${element.message}`, async () => {
                const res = await request(baseUrl)
                    .post(resourceEndpoint)
                    .send(element.body);

                expect(res.status).to.equal(200);
                expect(res.body).to.have.a.property('status').to.be.a('string').to.equal(element.response.status);
                expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(element.response.code);
                expect(res.body).to.have.a.property('message').to.be.a('string');
                expect(res.body).to.have.a.property('errors').to.be.an('array');
            });
        });
    });
    describe(`GET ${resourceEndpoint}`, () => {
        it(`status 200: should GET ${config.get('app.items.limit')} items`, async () => {
            const res = await request(baseUrl)
                .get(resourceEndpoint);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('success');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(200);
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('d');
            expect(res.body.d).to.have.length(config.get('app.items.limit'));
            dataFromDb = res.body.d;
        });
        it(`status 200: should GET 2 items when param ?limit=2`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}?limit=2`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('success');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(200);
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('d');
            expect(res.body.d).to.have.length(2);
        });
        it(`status 200: should GET ${config.get('app.items.limit')} items when param ?limit=0`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}?limit=0`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('success');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(200);
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('d');
            expect(res.body.d).to.have.length(config.get('app.items.limit'));
        });
        it(`status 200: should GET ${config.get('app.items.limit')} items when param ?limit=-1`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}?limit=-1`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('success');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(200);
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('d');
            expect(res.body.d).to.have.length(config.get('app.items.limit'));
        });
        it(`status 200: should GET ${config.get('app.items.limit')} items when param ?limit=a`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}?limit=a`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('success');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(200);
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('d');
            expect(res.body.d).to.have.length(config.get('app.items.limit'));
        });
        it(`status 200: should GET maximum ${config.get('app.items.limitMax')} items when param ?limit=10000`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}?limit=10000`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('success');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(200);
            expect(res.body).to.have.a.property('_meta');
            expect(res.body).to.have.a.property('d');
            expect(res.body.d).to.have.length.of.at.most(config.get('app.items.limitMax'));
        });
    });
    describe(`GET ${resourceEndpoint}/:id`, () => {
        it(`status 200: should GET an item when ID is valid`, async () => {
            const item = dataFromDb[0];
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}/${item._id}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('success');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(200);
            expect(res.body).to.have.a.property('d').to.be.an('object');
            expect(res.body).to.have.a.property('d').to.have.a.property('_id').to.be.a('string');
            expect(res.body).to.have.a.property('d').to.have.a.property('name').to.be.a('string');
            expect(res.body).to.have.a.property('d').to.have.a.property('createdAt').to.be.a('string');
            expect(res.body).to.have.a.property('d').to.have.a.property('updatedAt').to.be.a('string');
        });
        it(`status 400: should not GET an item when ID is not valid`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}/${'123456'}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('failure');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(400);
            expect(res.body).to.have.a.property('message').to.be.a('string');
            expect(res.body).to.have.a.property('errors').to.be.an('array');
        });
        it(`status 404: should not GET an item when ID is valid but an item was not found`, async () => {
            const res = await request(baseUrl)
                .get(`${resourceEndpoint}/${'5c6e36b17a76dd1f30c17be1'}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('failure');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(404);
            expect(res.body).to.have.a.property('message').to.be.a('string');
        });
    });
    describe(`PUT ${resourceEndpoint}/:id`, () => {
        it(`status 200: should UPDATE an item changing the name to 'new name'`, async () => {
            const item = dataFromDb[0];
            const newItem = {
                name: '  new name  '
            };
            const res = await request(baseUrl)
                .put(`${resourceEndpoint}/${item._id}`)
                .send(newItem);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('success');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(200);
            expect(res.body).to.have.a.property('d').to.be.an('object');
            expect(res.body).to.have.a.property('d').to.have.a.property('_id').to.be.a('string');
            expect(res.body).to.have.a.property('d').to.have.a.property('name', 'new name').to.be.a('string');
            expect(res.body).to.have.a.property('d').to.have.a.property('createdAt').to.be.a('string');
            expect(res.body).to.have.a.property('d').to.have.a.property('updatedAt').to.be.a('string');
        });
        it(`status 400: should not UPDATE an item with no fields`, async () => {
            const item = dataFromDb[1];
            const newItem = {};
            const res = await request(baseUrl)
                .put(`${resourceEndpoint}/${item._id}`)
                .send(newItem);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('failure');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(400);
            expect(res.body).to.have.a.property('message').to.be.a('string');
            expect(res.body).to.have.a.property('errors').to.be.an('array');
        });
        it(`status 400: should not UPDATE an item when ID is not valid`, async () => {
            const res = await request(baseUrl)
                .put(`${resourceEndpoint}/${'5c6e36b17a76dd1f30c17be1'}`)
                .send({});

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('failure');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(400);
            expect(res.body).to.have.a.property('message').to.be.a('string');
            expect(res.body).to.have.a.property('errors').to.be.an('array');
        });
        it(`status 404: should not UPDATE an item when ID is valid but an item was not found`, async () => {
            const newItem = {
                name: '  new name 2  '
            };
            const res = await request(baseUrl)
                .put(`${resourceEndpoint}/${'5c6e36b17a76dd1f30c17be1'}`)
                .send(newItem);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('failure');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(404);
            expect(res.body).to.have.a.property('message').to.be.a('string');
        });
    });
    describe(`DELETE ${resourceEndpoint}/:id`, () => {
        it(`status 200: should DELETE an item given the id`, async () => {
            const item = dataFromDb[1];

            const res = await request(baseUrl)
                .delete(`${resourceEndpoint}/${item._id}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('success');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(200);
            expect(res.body).to.have.a.property('message').to.be.a('string');
        });
        it(`status 400: should not DELETE an item when ID is not valid`, async () => {
            const res = await request(baseUrl)
                .delete(`${resourceEndpoint}/${'123456'}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('failure');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(400);
            expect(res.body).to.have.a.property('message').to.be.a('string');
            expect(res.body).to.have.a.property('errors').to.be.an('array');
        });
        it(`status 404: should no DELETE an item when ID is valid but an item was not found`, async () => {
            const res = await request(baseUrl)
                .delete(`${resourceEndpoint}/${'5c6e36b17a76dd1f30c17be1'}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.a.property('status').to.be.a('string').to.equal('failure');
            expect(res.body).to.have.a.property('code').to.be.a('number').to.equal(404);
            expect(res.body).to.have.a.property('message').to.be.a('string');
        });
    });
});