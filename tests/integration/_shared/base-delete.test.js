const request = require('supertest');
const expect = require('chai').expect;

const { apiUrl } = require('../_shared/params');

exports.run = ({ resourceSuffix, validData, invalidData }) => {
  describe(`DELETE ${apiUrl}${resourceSuffix}/:id`, () => {
    let dataFromDb;

    before(async () => {
      const res = await request(apiUrl).get(`${resourceSuffix}?limit=1`);
      dataFromDb = res.body.d;
    });
    //
    validData.forEach(element => {
      it(element.message, async () => {
        const id = dataFromDb[0]._id;
        const res = await request(apiUrl).delete(`${resourceSuffix}/${id}`);

        expect(res.status).to.equal(200);

        expect(res.body)
          .to.have.a.property('code')
          .to.be.a('number')
          .to.equal(200);
      });
    });
    //
    invalidData.forEach(element => {
      it(`Code ${element.code}: ${element.message()}`, async () => {
        const id = element.id || dataFromDb[0]._id;
        const res = await request(apiUrl).delete(`${resourceSuffix}/${id}`);

        expect(res.status).to.equal(200);

        expect(res.body)
          .to.have.a.property('code')
          .to.be.a('number')
          .to.equal(element.code);
        expect(res.body)
          .to.have.a.property('message')
          .to.be.a('string');
        expect(res.body)
          .to.have.a.property('errors')
          .to.be.an('object');
      });
    });
  });
};
