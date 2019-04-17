const request = require('supertest');
const expect = require('chai').expect;

const { validData, invalidData } = require('./data/get-by-id-data');
const { apiUrl, resourceSuffix } = require('./_params');

describe(`GET ${apiUrl}${resourceSuffix}/:id`, () => {
  let dataFromDb;

  before(async () => {
    const res = await request(apiUrl).get(`${resourceSuffix}?limit=1`);
    dataFromDb = res.body.d;
  });

  // Valid data
  validData.forEach(item => {
    const query = item.query;
    it(`Status 200: should GET an item when query is ?${query}`, async () => {
      const id = dataFromDb[0]._id;
      const url = `${resourceSuffix}/${id}?${query}`;
      const res = await request(apiUrl).get(url);

      expect(res.status).to.equal(200);

      expect(res.body)
        .to.have.a.property('status')
        .to.be.a('number')
        .to.equal(200);

      expect(res.body)
        .to.have.a.property('d')
        .to.be.an('object');

      expect(res.body.d)
        .to.have.a.property('_id')
        .to.be.a('string')
        .to.equal(id);

      item.shouldHaveFields.forEach(field => {
        expect(res.body.d)
          .to.have.a.property(field.name)
          .to.be.a(field.type);
      });

      item.shouldNotHaveFields.forEach(field => {
        expect(res.body.d).to.not.have.a.property(field);
      });
    });
  });
  // Invalid data
  invalidData.forEach(item => {
    it(`${item.message()} ${resourceSuffix}/${item.id}`, async () => {
      const res = await request(apiUrl).get(`${resourceSuffix}/${item.id}`);

      expect(res.status).to.equal(200);

      expect(res.body)
        .to.have.a.property('status')
        .to.be.a('number')
        .to.equal(item.status);

      expect(res.body)
        .to.have.a.property('message')
        .to.be.a('string');
      expect(res.body)
        .to.have.a.property('errors')
        .to.be.an('object');
    });
  });
});
