const model = require('./log-model');
const modelValidator = require('./log-validator');
const baseService = require('../_shared/base-service');

model.validator = modelValidator;
model.filterableFields = ['type'];
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

module.exports = service;
