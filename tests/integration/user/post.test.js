const request = require('supertest');
const expect = require('chai').expect;

const validData = require('./data/post-valid-data');
const invalidData = require('./data/post-invalid-data');
const { apiUrl, resourceSuffix } = require('./_params');

describe(`POST ${apiUrl}${resourceSuffix}`, () => {
  validData.forEach(item => {
    it(`Code 201: should CREATE an item when data is valid. name: '${
      item.body.name
    }'`, async () => {
      const res = await request(apiUrl)
        .post(resourceSuffix)
        .send(item.body);

      expect(res.status).to.equal(200);

      expect(res.body)
        .to.have.a.property('code')
        .to.be.a('number')
        .to.equal(201);

      expect(res.body)
        .to.have.a.property('d')
        .to.be.an('object');

      item.shouldHaveFields().forEach(field => {
        expect(res.body.d)
          .to.have.a.property(field.name)
          .to.be.a(field.type);
      });
    });
  });
  invalidData.forEach(item => {
    it(`Code ${item.code}: ${item.message}`, async () => {
      const res = await request(apiUrl)
        .post(resourceSuffix)
        .send(item.body);

      expect(res.status).to.equal(200);

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
