const request = require('supertest');
const expect = require('chai').expect;

const paginationData = require('./data/get-pagination-data');
const countTotal = require('./data/post-valid-data').length;
const { apiUrl, resourceSuffix } = require('./_params');

describe(`GET ${apiUrl}${resourceSuffix}`, () => {
  paginationData.forEach(item => {
    it(`Code 200: should GET ${
      item.dataLength
    } items when request is ${resourceSuffix}${item.query}`, async () => {
      const res = await request(apiUrl).get(`${resourceSuffix}${item.query}`);

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
        .to.have.a.property('_meta')
        .to.be.an('object');
      expect(res.body)
        .to.have.a.property('_meta')
        .to.have.a.property('limit')
        .to.be.a('number')
        .to.equal(item.limit);
      expect(res.body)
        .to.have.a.property('_meta')
        .to.have.a.property('offset')
        .to.be.a('number')
        .to.equal(item.offset);
      expect(res.body)
        .to.have.a.property('_meta')
        .to.not.have.a.property('countTotal');

      expect(res.body)
        .to.have.a.property('d')
        .to.be.an('array')
        .to.have.length(item.dataLength);
    });
  });
  // Test countTotal
  it(`Code 200: should GET _meta.totalCount property when request adds a 'x-request-count-total' header`, async () => {
    const res = await request(apiUrl)
      .get(`${resourceSuffix}`)
      .set('x-request-count-total', 'true');

    expect(res.status).to.equal(200);

    expect(res.body)
      .to.have.a.property('_meta')
      .to.have.a.property('totalCount')
      .to.be.a('number')
      .to.equal(countTotal);
  });
});
