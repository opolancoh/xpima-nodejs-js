const Joi = require('joi');
const _ = require('lodash');

const model = require('./user-model');
const baseValidator = require('../_shared/base-validator');
const validationUtils = require('../../../helpers/validation-utils');
const { c400, c409 } = require('../_shared/base-response');
const { getSalt, getHashed } = require('../../../helpers/security-utils');

const schema = Joi.object().keys({
  _asNewRecord: Joi.boolean().required(),
  name: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .when('_asNewRecord', {
      is: true,
      then: Joi.required()
    })
    .label('Name'),
  email: Joi.string()
    .regex(validationUtils.emailRegExp)
    .max(60)
    .when('_asNewRecord', {
      is: true,
      then: Joi.required()
    })
    .label('Email'),
  password: Joi.string()
    .trim()
    .min(6)
    .max(60)
    .when('_asNewRecord', {
      is: true,
      then: Joi.required()
    })
    .label('Password')
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
  // Check if item is duplicated
  if (await itemAlreadyExists(item.email)) {
    return {
      ...c409,
      errors: {
        email: [`"${item.email}" already exists.`]
      }
    };
  }
  // Hash password
  const salt = await getSalt();
  const hashed = await getHashed(validatedItem.password, salt);
  validatedItem.password = hashed;

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
  // Check if item is duplicated
  if (validatedItem.email) {
    if (await itemAlreadyExists(validatedItem.email, id)) {
      return {
        ...c409,
        errors: {
          email: [`"${validatedItem.email}" already exists.`]
        }
      };
    }
  }
  // Hash password
  if (validatedItem.password) {
    const salt = await getSalt();
    const hashed = await getHashed(validatedItem.password, salt);
    validatedItem.password = hashed;
  }

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

const itemAlreadyExists = async (email, id) => {
  const itemFound = await model.findOne(
    {
      email: email
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
