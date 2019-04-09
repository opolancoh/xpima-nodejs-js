const request = require('supertest');
const expect = require('chai').expect;

const { validData, invalidData } = require('./data/delete-data');
const { apiUrl, resourceSuffix } = require('./_params');

describe(`DELETE ${apiUrl}${resourceSuffix}/:id`, () => {
  let dataFromDb;

  before(async () => {
    const res = await request(apiUrl).get(`${resourceSuffix}?limit=${1}`);
    dataFromDb = res.body.d;
  });
  //
  validData.forEach(element => {
    it(element.message, async () => {
      const id = element.id || dataFromDb[0]._id;
      //
      const res = await request(apiUrl).delete(`${resourceSuffix}/${id}`);
      //
      expect(res.status).to.equal(200);
      expect(res.body)
        .to.have.a.property('status')
        .to.be.a('string')
        .to.equal('success');
      expect(res.body)
        .to.have.a.property('code')
        .to.be.a('number')
        .to.equal(200);
      //
      expect(res.body)
        .to.have.a.property('message')
        .to.be.a('string');
    });
    invalidData.forEach(element => {
      it(element.message(), async () => {
        const id = element.id || dataFromDb[0]._id;
        const newItem = element.newItem;
        //
        const res = await request(apiUrl)
          .put(`${resourceSuffix}/${id}`)
          .send(newItem);
        //
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.a.property('status')
          .to.be.a('string')
          .to.equal(element.status);
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
