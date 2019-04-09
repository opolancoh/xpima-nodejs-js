const request = require('supertest');
const expect = require('chai').expect;

const validData = require('./data/post-valid-data');
const invalidData = require('./data/post-invalid-data');
const { apiUrl, resourceSuffix } = require('./_params');

describe(`POST ${apiUrl}${resourceSuffix}`, () => {
  validData.forEach(element => {
    it(`Code 201: should CREATE an item when data is valid. name: '${
      element.name
    }'`, async () => {
      const res = await request(apiUrl)
        .post(resourceSuffix)
        .send(element);

      expect(res.status).to.equal(200);
      expect(res.body)
        .to.have.a.property('status')
        .to.be.a('string')
        .to.equal('success');
      expect(res.body)
        .to.have.a.property('code')
        .to.be.a('number')
        .to.equal(201);
      expect(res.body)
        .to.have.a.property('d')
        .to.be.an('object');
      expect(res.body)
        .to.have.a.property('d')
        .to.have.a.property('_id')
        .to.be.a('string');
      expect(res.body)
        .to.have.a.property('d')
        .to.have.a.property('name')
        .to.be.a('string');
      expect(res.body)
        .to.have.a.property('d')
        .to.have.a.property('createdAt')
        .to.be.a('string');
      expect(res.body)
        .to.have.a.property('d')
        .to.have.a.property('updatedAt')
        .to.be.a('string');
    });
  });
  invalidData.forEach(element => {
    it(`Code ${element.response.code}: ${element.message}`, async () => {
      const res = await request(apiUrl)
        .post(resourceSuffix)
        .send(element.body);

      expect(res.status).to.equal(200);
      expect(res.body)
        .to.have.a.property('status')
        .to.be.a('string')
        .to.equal(element.response.status);
      expect(res.body)
        .to.have.a.property('code')
        .to.be.a('number')
        .to.equal(element.response.code);
      expect(res.body)
        .to.have.a.property('message')
        .to.be.a('string');
      expect(res.body)
        .to.have.a.property('errors')
        .to.be.an('object');
    });
  });
});
