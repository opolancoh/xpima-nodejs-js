const model = require('./transfer-model');
const modelValidator = require('./transfer-validator');
const baseService = require('../_shared/base-service');
const accountService = require('../account/account-service');

model._validator = modelValidator;
model._validFields = {
  filter: ['name', 'description'],
  populate: ['account', 'category']
};

const service = {};

service.find = async request => {
  return await baseService.find(request, model);
};

service.findById = async (id, query) => {
  return await baseService.findById(id, query, model);
};

service.create = async body => {
  const createResult = await baseService.create(body, model);
  if (createResult.errors) return createResult;
  // Update fromAccount balance
  const fromAccountResult = await accountService.updateBalance({
    id: body.fromAccount,
    amount: -createResult.d.amount
  });
  if (fromAccountResult.errors) return fromAccountResult;
  // Update toAccount balance
  const toAccountResult = await accountService.updateBalance({
    id: body.toAccount,
    amount: createResult.d.amount
  });
  if (toAccountResult.errors) return toAccountResult;

  return {
    code: 201,
    d: createResult.d
  };
};

service.update = async (id, body) => {
  return await baseService.update(id, body, model);
};

service.delete = async id => {
  const deleteResult = await baseService.delete(id, model, {
    select: 'fromAccount toAccount amount'
  });
  if (deleteResult.errors) return deleteResult;

  // Update fromAccount balance
  const fromAccountResult = await accountService.updateBalance({
    id: deleteResult.d.fromAccount,
    amount: deleteResult.d.amount
  });
  if (fromAccountResult.errors) return fromAccountResult;
  
  // Update toAccount balance
  const toAccountResult = await accountService.updateBalance({
    id: deleteResult.d.toAccount,
    amount: -deleteResult.d.amount
  });
  if (toAccountResult.errors) return toAccountResult;

  return {
    code: 200
  };
};

module.exports = service;
