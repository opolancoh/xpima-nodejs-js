const model = require('./model');

const modelValidator = require('./model-validator');
const baseService = require('../_shared/base-service');

model.validator = modelValidator;
const service = {};

service.find = async request => {
  return await baseService.find(request, model, ['type']);
};

service.findById = async (id, query) => {
  return await baseService.findById(id, query, model);
};

service.create = async body => {
  return await baseService.create(body, model);
};

module.exports = service;
