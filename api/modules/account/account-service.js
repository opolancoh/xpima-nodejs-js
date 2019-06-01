const model = require('./account-model');
const modelValidator = require('./account-validator');
const baseService = require('../_shared/base-service');
const { c400, c404 } = require('../_shared/base-response');

model._validator = modelValidator;
model._validFields = { filter: ['name', 'description'] };

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

// Check if an account has sufficient funds
service.hasFunds = async (id, amount) => {
  const accountResult = await service.findById(id, {
    select: '_id,balance'
  });
  if (accountResult.errors) {
    return {
      ...c400,
      errors: { account: accountResult.errors.id }
    };
  }

  // Check if account has sufficient funds
  if (accountResult.d.balance < amount) {
    return {
      ...c400,
      errors: { account: ['Insufficient funds.'] }
    };
  }

  return {
    code: 200
  };
};

// Check if the new balance doesn't overflow the limit 9007199254740991
service.checkMaximumBalance = async (id, amount) => {
  const accountResult = await service.findById(id, {
    select: '_id,balance'
  });
  if (accountResult.errors) {
    return {
      ...c400,
      errors: { account: accountResult.errors.id }
    };
  }

  if (accountResult.d.balance + amount > 9007199254740991) {
    return {
      ...c400,
      errors: {
        account: ['New balance must be not greater than 9007199254740991']
      }
    };
  }

  return {
    code: 200
  };
};

// This action does not need to be validated, it's not exposed to the outside
service.updateBalance = async ({ id, amount }) => {
  const fieldsToUpdate = { balance: amount };

  const itemUpdated = await model.findOneAndUpdate(
    {
      _id: id
    },
    {
      $inc: fieldsToUpdate
    },
    {
      fields: { _id: 1 }
    }
  );

  if (itemUpdated) {
    return {
      code: 200
    };
  } else
    return {
      ...c404,
      errors: {
        account: [
          `The specified item Id '${id}' was not found, or you do not have permission to access it.`
        ]
      }
    };
};

module.exports = service;
