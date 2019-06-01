const request = require('supertest');
const expect = require('chai').expect;

const { apiUrl } = require('./params');

exports.run = ({ resourceSuffix, validData, invalidData, propName }) => {
  describe(`POST ${apiUrl}${resourceSuffix}`, () => {
    before(async () => {});
    //
    validData.forEach(element => {
      it(`Code 201: should CREATE an item when data is valid. ${propName}: '${
        element.body[propName]
      }'`, async () => {
        const res = await request(apiUrl)
          .post(resourceSuffix)
          .send(element.body);

        expect(res.status).to.equal(200);

        expect(res.body)
          .to.have.a.property('code')
          .to.be.a('number')
          .to.equal(201);

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
      });
    });
    //
    invalidData.forEach(element => {
      it(`Code ${element.code}: ${element.message()}`, async () => {
        const res = await request(apiUrl)
          .post(resourceSuffix)
          .send(element.body);

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
