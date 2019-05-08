const request = require('supertest');
const expect = require('chai').expect;

const { apiUrl } = require('../_shared/params');

exports.run = ({ resourceSuffix, validData, invalidData }) => {
  describe(`PUT ${apiUrl}${resourceSuffix}/:id`, () => {
    let dataFromDb;

    before(async () => {
      const res = await request(apiUrl).get(
        `${resourceSuffix}?select=_id&limit=1`
      );
      dataFromDb = res.body.d;
    });
    //
    validData.forEach(element => {
      it(`Code 200: ${element.message()}`, async () => {
        const id = dataFromDb[0]._id;
        const path = `${resourceSuffix}/${id}`;
        const newItem = element.body;
        const res = await request(apiUrl)
          .put(path)
          .send(newItem);

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
          expect(res.body.d).to.not.have.a.property(field);
        });
        Object.keys(newItem).forEach(key => {
          expect(res.body.d).to.have.a.property(key, newItem[key]);
        });
      });
    });
    invalidData.forEach(element => {
      it(`Code ${element.code}: ${element.message()}`, async () => {
        const id = element.id ? element.id : dataFromDb[0]._id;
        const newItem = element.body;
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
};
