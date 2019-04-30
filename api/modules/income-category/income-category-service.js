const model = require('./income-category-model');
const modelValidator = require('./income-category-validator');
const baseService = require('../_shared/base-service');

model.validator = modelValidator;
model.filterableFields = ['name', 'description'];

const service = {};

service.find = async request => {
  return await baseService.find(request, model);
};

service.findById = async (id, query) => {
  return await baseService.findById(id, query, model);
};

service.create = async body => {
  return await baseService.create(body, model);
};

service.update = async (id, body) => {
  return await baseService.update(id, body, model);
};

service.delete = async id => {
  return await baseService.delete(id, model);
};

module.exports = service;
