const config = require('config');

const validationUtils = require('../helpers/validation-utils');

const utils = {};

utils.getQueryParams = (query, modelFields, validFields) => {
  let params = {};
  // set limit
  // limit=5
  params.limit = config.get('app.items.limit');
  if (query.limit && validationUtils.isIntegerGreaterThanZero(query.limit)) {
    const limitParsed = query.limit * 1;
    if (limitParsed < config.get('app.items.limitMin'))
      params.limit = config.get('app.items.limitMin');
    else
      params.limit =
        limitParsed > config.get('app.items.limitMax')
          ? config.get('app.items.limitMax')
          : limitParsed;
  }
  // set offset
  // offset=10
  params.offset = 0;
  if (query.offset && validationUtils.isIntegerGreaterThanZero(query.offset)) {
    params.offset = query.offset * 1;
  }
  // set sort
  // sort=name,-updatedAt
  params.sort = {};
  if (modelFields && query.sort) {
    query.sort.split(',').forEach(element => {
      let propName = element;
      let isAsc = true;

      const sortOrder = element.substring(0, 1);
      if (sortOrder === '-' || sortOrder === ' ' || sortOrder === '+') {
        propName = element.substring(1, element.length);
        if (sortOrder === '-') isAsc = false;
      }

      if (modelFields.hasOwnProperty(propName)) {
        params.sort[propName] = isAsc ? 1 : -1;
      }
    });
  }
  // set select
  // select=name,updatedAt
  params.select = [];
  if (modelFields && query.select) {
    query.select.split(',').forEach(element => {
      if (modelFields.hasOwnProperty(element)) params.select.push(element);
    });
  }
  // set filter
  // search=name:in|description:desc
  params.filter = {};
  if (validFields.filter && query.search) {
    query.search.split('|').forEach(element => {
      const index = element.indexOf(':');
      if (index !== -1) {
        const propName = element.substring(0, index);
        if (validFields.filter.indexOf(propName) !== -1) {
          const searchText = element.substring(index + 1, element.length);
          params.filter[propName] = new RegExp(searchText, 'i');
        }
      }
    });
  }
  // set populate
  // populate=category:name,updatedAt|account:name
  // [{ path: 'category', select: 'name createdAt' },{ path: 'account', select: 'name' }]
  params.populate = [];
  if (validFields.populate && query.populate) {
    query.populate.split('|').forEach(element => {
      const colonIndex = element.indexOf(':');
      if (colonIndex !== -1) {
        const propName = element.substring(0, colonIndex);
        if (validFields.populate.indexOf(propName) !== -1) {
          const listFields = element.substring(colonIndex + 1, element.length);
          const fields = [];
          listFields.split(',').forEach(item => {
            fields.push(item);
          });
          if (fields.length > 0)
            params.populate.push({ path: propName, select: fields.join(' ') });
        }
      }
    });
  }

  return params;
};

module.exports = utils;
