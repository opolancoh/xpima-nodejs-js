const request = require('supertest');
const expect = require('chai').expect;

const { validData, invalidData } = require('./data/put-data');
const { apiUrl, resourceSuffix } = require('./_params');

describe(`PUT ${apiUrl}${resourceSuffix}/:id`, () => {
  let dataFromDb;

  before(async () => {
    const res = await request(apiUrl).get(`${resourceSuffix}?limit=${1}`);
    dataFromDb = res.body.d;
  });
  //
  validData.forEach(element => {
    it(element.message, async () => {
      const item = dataFromDb[0];
      const newItem = element.newItem;
      const res = await request(apiUrl)
        .put(`${resourceSuffix}/${item._id}`)
        .send(newItem);

      expect(res.status).to.equal(200);

      expect(res.body)
        .to.have.a.property('code')
        .to.be.a('number')
        .to.equal(200);

      expect(res.body)
        .to.have.a.property('d')
        .to.be.an('object');

      expect(res.body.d)
        .to.have.a.property('_id')
        .to.be.a('string');
      expect(res.body.d)
        .to.have.a.property('createdAt')
        .to.be.a('string');
      expect(res.body.d)
        .to.have.a.property('updatedAt')
        .to.be.a('string');
      Object.keys(newItem).forEach(key => {
        expect(res.body.d).to.have.a.property(key, newItem[key]);
      });
    });
    invalidData.forEach(element => {
      it(element.message(), async () => {
        const id = element.id || dataFromDb[0]._id;
        const item = dataFromDb[0];
        const newItem = element.newItem;
        //
        const res = await request(apiUrl)
          .put(`${resourceSuffix}/${id}`)
          .send(newItem);
        //
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.a.property('code')
          .to.be.a('number')
          .to.equal(element.code);
        //
        expect(res.body)
          .to.have.a.property('message')
          .to.be.a('string');
        expect(res.body)
          .to.have.a.property('errors')
          .to.be.an('object');
      });
    });
  });
});
