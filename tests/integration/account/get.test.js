const request = require('supertest');
const expect = require('chai').expect;

const paginationData = require('./data/get-pagination-data');
const selectData = require('./data/get-select-data');
const totalCount = require('./data/post-valid-data').length;
const { apiUrl, resourceSuffix } = require('./_params');

describe(`GET ${apiUrl}${resourceSuffix}`, () => {
  // Pagination
  paginationData.forEach(item => {
    it(`Code 200: [pagination] should GET ${
      item.dataLength
    } items when request is ${resourceSuffix}${item.query}`, async () => {
      const res = await request(apiUrl).get(`${resourceSuffix}${item.query}`);

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
        .to.equal(item.limit);
      expect(res.body._meta)
        .to.have.a.property('offset')
        .to.be.a('number')
        .to.equal(item.offset);

      expect(res.body._meta).to.not.have.a.property('totalCount');

      expect(res.body)
        .to.have.a.property('d')
        .to.be.an('array')
        .to.have.length(item.dataLength);
    });
  });
  // CountTotal
  it(`Code 200: [pagination] should GET _meta.totalCount property when request adds a 'x-request-total-count' header`, async () => {
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
  selectData.forEach(item => {
    const url = `${resourceSuffix}?${item.query}&limit=1`;
    it(`Code 200: [select] should GET items when request is ${url}`, async () => {
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

      item.shouldHaveFields.forEach(field => {
        expect(res.body.d[0])
          .to.have.a.property(field.name)
          .to.be.a(field.type);
      });

      item.shouldNotHaveFields.forEach(field => {
        expect(res.body.d[0]).to.not.have.a.property(field);
      });
    });
  });
});
