const config = require('config');
const request = require('supertest');
const expect = require('chai').expect;

const invalidData = require('./data/get-by-id-data');
const { apiUrl, resourceSuffix } = require('./_params');

describe(`GET ${apiUrl}${resourceSuffix}/:id`, () => {
  let dataFromDb;

  before(async () => {
    const res = await request(apiUrl).get(`${resourceSuffix}?limit=1`);
    dataFromDb = res.body.d;
  });

  // Valid data
  it(`Code 200: should GET an item when ID is valid and exists on DB`, async () => {
    const id = dataFromDb[0]._id;
    const res = await request(apiUrl).get(`${resourceSuffix}/${id}`);

    expect(res.status).to.equal(200);

    expect(res.body)
      .to.have.a.property('status')
      .to.be.a('string')
      .to.equal('success');
    expect(res.body)
      .to.have.a.property('code')
      .to.be.a('number')
      .to.equal(200);

    expect(res.body)
      .to.have.a.property('d')
      .to.be.an('object');

    expect(res.body.d)
      .to.have.a.property('_id')
      .to.be.a('string')
      .to.equal(id);
  });
  // Invalid data
  invalidData.forEach(item => {
    it(`${item.message()} ${resourceSuffix}/${item.id}`, async () => {
      const res = await request(apiUrl).get(`${resourceSuffix}/${item.id}`);

      expect(res.status).to.equal(200);

      expect(res.body)
        .to.have.a.property('status')
        .to.be.a('string')
        .to.equal(item.status);
      expect(res.body)
        .to.have.a.property('code')
        .to.be.a('number')
        .to.equal(item.code);

      expect(res.body)
        .to.have.a.property('message')
        .to.be.a('string');
        expect(res.body)
        .to.have.a.property('errors')
        .to.be.an('object');
    });
  });
});
