const Joi = require('joi');
const _ = require('lodash');

const model = require('./account-model');
const baseValidator = require('../_shared/base-validator');
const { c400, c409 } = require('../_shared/base-response');

const schema = Joi.object().keys({
  _asNewRecord: Joi.boolean().required(),
  name: Joi.string()
    .trim()
    .max(30)
    .when('_asNewRecord', {
      is: true,
      then: Joi.required()
    })
    .label('Name'),
  type: Joi.string()
    .valid('cash', 'creditCard', 'bankAccount')
    .when('_asNewRecord', {
      is: true,
      then: Joi.required()
    })
    .label('Type'),
  balance: Joi.number()
    .min(0)
    .precision(2)
    .default(0)
    .label('Balance'),
  description: Joi.string()
    .trim()
    .max(255)
    .label('Description')
});

const findByIdValidation = id => {
  // Validate id
  const validationIdResult = baseValidator.validateId(id);
  if (validationIdResult)
    return {
      ...c400,
      errors: validationIdResult.errors
    };
};

const createValidation = async item => {
  /** Input Validation **/
  const { validatedItem, errors } = baseValidator.validateSchema(
    item,
    schema,
    true
  );
  if (errors) return { ...c400, errors };

  /** Business Logic **/
  // Check if name is duplicated
  if (await itemAlreadyExists(validatedItem.name)) {
    return {
      ...c409,
      errors: {
        name: [`"${validatedItem.name}" already exists.`]
      }
    };
  }
  validatedItem.totalRevenue = 0;
  validatedItem.totalExpenses = 0;

  return { validatedItem };
};

const updateValidation = async (id, item) => {
  /** Input Validation **/
  // Validate id
  const validationIdResult = baseValidator.validateId(id);
  if (validationIdResult)
    return {
      ...c400,
      errors: validationIdResult.errors
    };
  // Validate if item is empty
  const isEmpty = _.isEmpty(item);
  if (isEmpty)
    return {
      ...c400,
      errors: {
        _: [`You must provide at least one field to be updated.`]
      }
    };
  // Validate item
  const { validatedItem, errors } = baseValidator.validateSchema(
    item,
    schema,
    false
  );
  if (errors) return { ...c400, errors };

  /** Business Logic **/
  // Check if balance exists
  if (item.balance) {
    return {
      ...c400,
      errors: {
        balance: [`Balance is not allowed to be updated.`]
      }
    };
  }
  // Check if name is duplicated
  if (item.name) {
    if (await itemAlreadyExists(item.name, id)) {
      return {
        ...c400,
        errors: {
          name: [`"${item.name}" already exists.`]
        }
      };
    }
  }

  delete validatedItem.balance;

  return { validatedItem };
};

const deleteValidation = id => {
  // Validate id
  const validationIdResult = baseValidator.validateId(id);
  if (validationIdResult)
    return {
      ...c400,
      errors: validationIdResult.errors
    };
};

const itemAlreadyExists = async (name, id) => {
  const itemFound = await model.findOne(
    {
      name: name
    },
    '_id'
  );
  // If item was not found
  if (!itemFound) return false;
  // If item was found and id is undefined (Create Item)
  if (!id) return true;
  // If item was found and id has a value (Update Item)
  if (id === itemFound._id.toString()) return false;
  else return true;
};

module.exports = {
  findByIdValidation,
  createValidation,
  updateValidation,
  deleteValidation,
  validateSchema: baseValidator.validateSchema
};
