const model = require('./expense-model');
const modelValidator = require('./expense-validator');
const baseService = require('../_shared/base-service');
const accountService = require('../account/account-service');
const { c400, c404 } = require('../_shared/base-response');

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

  const updateBalanceResult = await accountService.updateBalance({
    id: createResult.d.account,
    amount: -createResult.d.amount
  });
  if (updateBalanceResult.errors) return updateBalanceResult;

  return {
    code: 201,
    d: createResult.d
  };
};

service.update = async (id, body) => {
  // Input and business validation
  const validationResult = await model._validator.updateValidation(id, body);
  if (validationResult.errors) return validationResult;

  const item = validationResult.validatedItem;

  // Update
  item.updatedAt = new Date();
  const itemUpdated = await model.findOneAndUpdate(
    {
      _id: id
    },
    item,
    {
      new: true
    }
  );

  if (itemUpdated) {
    // Delete fields that are not returnable
    if (model._validFields.nonReturnable) {
      deleteNonReturnableFieldsFromObject(
        itemUpdated,
        model._validFields.nonReturnable
      );
    }
    return {
      code: 200,
      d: itemUpdated
    };
  } else
    return {
      ...c404,
      errors: {
        id: [
          `The specified item Id '${id}' was not found, or you do not have permission to access it.`
        ]
      }
    };
};

service.delete = async id => {
  // Input and business validation
  const validationResult = await model._validator.deleteValidation(id);
  if (validationResult) return validationResult;

  // Get amount and accountId
  const expenseResult = await service.findById(id, {
    select: 'amount,account'
  });
  if (expenseResult.errors) return expenseResult;

  // Delete
  const itemDeleted = await model.findOneAndDelete({
    _id: id
  });
  if (itemDeleted) {
    // Update balance
    const updateBalanceResult = await accountService.updateBalance({
      id: expenseResult.d.account,
      amount: expenseResult.d.amount
    });
    if (updateBalanceResult.errors) return updateBalanceResult;
    return {
      code: 200
    };
  } else
    return {
      ...c404,
      errors: {
        id: [
          `The specified item Id '${id}' was not found, or you do not have permission to access it.`
        ]
      }
    };
};

module.exports = service;
