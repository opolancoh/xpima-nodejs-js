const Joi = require('joi');
const _ = require('lodash');

const model = require('./expense-model');
const baseValidator = require('../_shared/base-validator');
const validationUtils = require('../../../helpers/validation-utils');
const { c400, c409 } = require('../_shared/base-response');
const accountService = require('../account/account-service');
const categoryService = require('../expense-category/expense-category-service');

const schema = Joi.object()
  .keys({
    _asNewRecord: Joi.boolean().required(),
    amount: Joi.number()
      .positive()
      .precision(2)
      .when('_asNewRecord', {
        is: true,
        then: Joi.required()
      })
      .label('Amount'),
    account: Joi.string()
      .regex(validationUtils.objectIdRegExp)
      .when('_asNewRecord', {
        is: true,
        then: Joi.required()
      })
      .label('Account'),
    date: Joi.date()
      .when('_asNewRecord', {
        is: true,
        then: Joi.required()
      })
      .label('Date'),
    category: Joi.string()
      .regex(validationUtils.objectIdRegExp)
      .when('_asNewRecord', {
        is: true,
        then: Joi.required()
      })
      .label('Category'),
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
  // Check if Account and Category exists
  const accountResult = await accountService.findById(item.account, {
    select: '_id,totalRevenue,totalExpenses'
  });
  if (accountResult.errors) {
    return {
      ...c400,
      errors: { account: accountResult.errors.id }
    };
  }
  const categoryResult = await categoryService.findById(item.category, {
    select: '_id'
  });
  if (categoryResult.errors)
    return {
      ...c400,
      errors: { category: categoryResult.errors.id }
    };
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

module.exports = {
  findByIdValidation,
  createValidation,
  updateValidation,
  deleteValidation,
  validateSchema: baseValidator.validateSchema
};
