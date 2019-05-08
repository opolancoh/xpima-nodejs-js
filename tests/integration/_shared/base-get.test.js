const request = require('supertest');
const expect = require('chai').expect;

const { apiUrl } = require('../_shared/params');

exports.run = ({ resourceSuffix, paginationData, selectData, totalCount }) => {
  describe(`GET ${apiUrl}${resourceSuffix}`, () => {
    // Pagination
    paginationData.forEach(element => {
      const query = element.query;
      it(`Code 200: [pagination] should GET ${
        element.dataLength
      } items when QUERY is '${query}'`, async () => {
        const res = await request(apiUrl).get(
          `${resourceSuffix}?${element.query}`
        );

        expect(res.status).to.equal(200);

        expect(res.body)
          .to.have.a.property('code')
          .to.be.a('number')
          .to.equal(200);

        expect(res.body)
          .to.have.a.property('_meta')
          .to.be.an('object');

        expect(res.body._meta)
          .to.have.a.property('limit')
          .to.be.a('number')
          .to.equal(element.limit);
        expect(res.body._meta)
          .to.have.a.property('offset')
          .to.be.a('number')
          .to.equal(element.offset);

        expect(res.body._meta).to.not.have.a.property('totalCount');

        expect(res.body)
          .to.have.a.property('d')
          .to.be.an('array')
          .to.have.length(element.dataLength);
      });
    });
    // TotalCount
    it(`Code 200: [pagination] should GET _meta.totalCount when HEADER has a 'x-request-total-count' property`, async () => {
      const res = await request(apiUrl)
        .get(`${resourceSuffix}`)
        .set('x-request-total-count', 'true');

      expect(res.status).to.equal(200);

      expect(res.body)
        .to.have.a.property('_meta')
        .to.have.a.property('totalCount')
        .to.be.a('number')
        .to.equal(totalCount);
    });
    // Select
    selectData.forEach(element => {
      const query = element.query;
      const url = `${resourceSuffix}?${query}&limit=1`;
      it(`Code 200: [select] should GET items when QUERY is '${query}'`, async () => {
        const res = await request(apiUrl).get(url);

        expect(res.status).to.equal(200);

        expect(res.body)
          .to.have.a.property('code')
          .to.be.a('number')
          .to.equal(200);
        expect(res.body)
          .to.have.a.property('d')
          .to.be.an('array');

        expect(res.body.d[0])
          .to.have.a.property('_id')
          .to.be.a('string');

        element.retornableFields.forEach(field => {
          expect(res.body.d[0])
            .to.have.a.property(field.name)
            .to.be.a(field.type);
        });
        element.nonRetornableFields.forEach(field => {
          expect(res.body.d[0]).to.not.have.a.property(field.name);
        });
      });
    });
  });
};
