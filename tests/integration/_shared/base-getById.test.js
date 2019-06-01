const request = require('supertest');
const expect = require('chai').expect;

const { apiUrl } = require('../_shared/params');

exports.run = ({ resourceSuffix, validData, invalidData }) => {
  describe(`GET ${apiUrl}${resourceSuffix}/:id`, () => {
    let dataFromDb;

    before(async () => {
      const res = await request(apiUrl).get(
        `${resourceSuffix}?select=_id&limit=1`
      );
      dataFromDb = res.body.d;
    });
    //
    validData.forEach(element => {
      const query = element.query;
      it(`Code 200: should GET an item when query is '${query}'`, async () => {
        const id = dataFromDb[0]._id;
        const path = `${resourceSuffix}/${id}`;
        const res = await request(apiUrl).get(`${path}?${query}`);

        expect(res.status).to.equal(200);

        expect(res.body)
          .to.have.a.property('code')
          .to.be.a('number')
          .to.equal(200);

        expect(res.body)
          .to.have.a.property('d')
          .to.be.an('object');

        element.retornableFields.forEach(field => {
          expect(res.body.d)
            .to.have.a.property(field.name)
            .to.be.a(field.type);
        });
        element.nonRetornableFields.forEach(field => {
          expect(res.body.d).to.not.have.a.property(field.name);
        });
      });
    });
    //
    invalidData.forEach(element => {
      const path = `${resourceSuffix}/${element.id}`;
      it(`Code ${element.code}: ${element.message()}`, async () => {
        const res = await request(apiUrl).get(`${path}`);

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
