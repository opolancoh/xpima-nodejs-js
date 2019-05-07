const model = require('./account-model');
const modelValidator = require('./account-validator');
const baseService = require('../_shared/base-service');
const { c404 } = require('../_shared/base-response');

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
// This action does not need to be validated, it's not exposed to the outside
service.updateBalance = async ({ id, income, expenditure }) => {
  const fieldsToUpdate = {};
  if (income && income !== 0) fieldsToUpdate.totalRevenue = income;
  if (expenditure && expenditure !== 0)
    fieldsToUpdate.totalExpenses = expenditure;
  if (Object.keys(fieldsToUpdate).length !== 0) {
    fieldsToUpdate.balance =
      (income ? income : 0) - (expenditure ? expenditure : 0);

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
  } else return { code: 304 };
};

module.exports = service;
