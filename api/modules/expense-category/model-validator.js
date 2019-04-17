const Joi = require('joi');
const _ = require('lodash');

const model = require('./model');
const baseValidator = require('../_shared/base-validator');

const schema = Joi.object().keys({
  isNew: Joi.boolean().required(),
  name: Joi.string()
    .trim()
    .max(30)
    .when('isNew', {
      is: true,
      then: Joi.required()
    })
    .label('Name'),
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
      status: 400,
      message: 'Invalid request data.',
      errors: validationIdResult.errors
    };
};

const createValidation = async item => {
  /** Input Validation **/
  item.isNew = true;
  const { validatedItem, errors } = baseValidator.validateSchema(item, schema);
  delete validatedItem.isNew;
  if (errors) return { status: 400, message: 'Invalid request data.', errors };

  /** Business Logic **/
  // Check if name is duplicated
  if (await nameAlreadyExists(item.name)) {
    return {
      status: 409,
      message: 'Item already exists. create',
      errors: {
        name: [`"${item.name}" already exists.`]
      }
    };
  }

  return { validatedItem };
};

const updateValidation = async (id, item) => {
  /** Input Validation **/
  // Validate id
  const validationIdResult = baseValidator.validateId(id);
  if (validationIdResult)
    return {
      status: 400,
      message: 'Invalid request data.',
      errors: validationIdResult.errors
    };
  // Validate if item is empty
  const isEmpty = _.isEmpty(item);
  if (isEmpty)
    return {
      status: 400,
      message: 'Invalid request data.',
      errors: {
        _: [`You must provide at least one field to be updated.`]
      }
    };
  // Validate item
  item.isNew = false;
  const { validatedItem, errors } = baseValidator.validateSchema(item, schema);
  delete validatedItem.isNew;
  if (errors) return { status: 400, message: 'Invalid request data.', errors };

  /** Business Logic **/
  // Check if name is duplicated
  if (item.name) {
    if (await nameAlreadyExists(item.name, id)) {
      return {
        status: 409,
        message: 'Item already exists. uodate',
        errors: {
          name: [`"${item.name}" already exists.`]
        }
      };
    }
  }

  return { validatedItem };
};

const deleteValidation = id => {
  // Validate id
  const validationIdResult = baseValidator.validateId(id);
  if (validationIdResult)
    return {
      status: 400,
      message: 'Invalid request data.',
      errors: validationIdResult.errors
    };
};

const nameAlreadyExists = async (name, id) => {
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
  deleteValidation
};
