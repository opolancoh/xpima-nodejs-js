const request = require('supertest');
const expect = require('chai').expect;

const validData = require('./data/put-valid-data');
const invalidData = require('./data/put-invalid-data');
const { apiUrl } = require('../_shared/params');
const { resourceSuffix } = require('./_params');

const { resourceSuffix: accountResourceSuffix } = require('../account/_params');
const {
  resourceSuffix: categoryResourceSuffix
} = require('../expense-category/_params');

describe(`PUT ${apiUrl}${resourceSuffix}/:id`, () => {
  let dataFromDb = {};

  before(async () => {
    // item to update
    dataFromDb.item = {};
    const itemResponse = await request(apiUrl).get(
      `${resourceSuffix}?select=_id&limit=${1}`
    );
    dataFromDb.item.d = itemResponse.body.d[0];
    // accounts
    dataFromDb.accounts = {};
    const accountsResponse = await request(apiUrl).get(
      `${accountResourceSuffix}?select=_id`
    );
    dataFromDb.accounts.d = accountsResponse.body.d;
    dataFromDb.accounts.totalCount = dataFromDb.accounts.d.length;
    // categories
    dataFromDb.categories = {};
    const categoriesResponse = await request(apiUrl).get(
      `${categoryResourceSuffix}?select=_id`
    );
    dataFromDb.categories.d = categoriesResponse.body.d;
    dataFromDb.categories.totalCount = dataFromDb.categories.d.length;
  });
  //
  validData.forEach(element => {
    it(`Code 200: ${element.message()}`, async () => {
      if (element.body.account && element.body.account === 'setValidValue') {
        element.body.account =
          dataFromDb.accounts.d[
            Math.floor(Math.random() * dataFromDb.accounts.totalCount)
          ]._id;
      }
      if (element.body.category && element.body.category === 'setValidValue') {
        element.body.category =
          dataFromDb.categories.d[
            Math.floor(Math.random() * dataFromDb.categories.totalCount)
          ]._id;
      }
      //
      const id = dataFromDb.item.d._id;
      const newItem = element.body;
      const res = await request(apiUrl)
        .put(`${resourceSuffix}/${id}`)
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
    invalidData.forEach(element => {
      it(`Code ${element.code}: ${element.message}`, async () => {
        if (element.body.account && element.body.account === 'setValidValue') {
          element.body.account =
            dataFromDb.accounts.d[
              Math.floor(Math.random() * dataFromDb.accounts.totalCount)
            ]._id;
        }
        if (
          element.body.category &&
          element.body.category === 'setValidValue'
        ) {
          element.body.category =
            dataFromDb.categories.d[
              Math.floor(Math.random() * dataFromDb.categories.totalCount)
            ]._id;
        }
        //
        const id = element.id ? element.id : dataFromDb.item.d_id;
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
});
