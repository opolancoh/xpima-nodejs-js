const model = require('./user-model');
const modelValidator = require('./user-validator');
const baseService = require('../_shared/base-service');
const validationUtils = require('../../../helpers/validation-utils');
const { c400, c404 } = require('../_shared/base-response');

model.validator = modelValidator;
model.filterableFields = ['name', 'email'];
model.nonSelectableFields = ['password'];

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

/* 
  @email='oscar.polanco@gmail.com'
  @select='name occupation'
*/
service.findByEmail = async (email, select = '') => {
  const isEmail = validationUtils.isEmail(email);
  if (!isEmail)
    return {
      ...c400,
      errors: {
        email: [`Email "${email}" is not valid.`]
      }
    };

  const itemFound = await model.findOne(
    {
      email: email
    },
    select
  );
  // If item was not found
  if (!itemFound)
    return {
      ...c404,
      errors: {
        email: [`The user account was not found.`]
      }
    };
  else
    return {
      code: 200,
      d: itemFound
    };
};

module.exports = service;
