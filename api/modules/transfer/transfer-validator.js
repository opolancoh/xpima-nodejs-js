const Joi = require('joi');
const _ = require('lodash');

const model = require('./transfer-model');
const baseValidator = require('../_shared/base-validator');
const validationUtils = require('../../../helpers/validation-utils');
const { c400 } = require('../_shared/base-response');
const accountService = require('../account/account-service');

const schema = Joi.object().keys({
  _asNewRecord: Joi.boolean().required(),
  amount: Joi.number()
    .positive()
    .precision(2)
    .when('_asNewRecord', {
      is: true,
      then: Joi.required()
    })
    .label('Amount'),
  fromAccount: Joi.string()
    .regex(validationUtils.objectIdRegExp)
    .when('_asNewRecord', {
      is: true,
      then: Joi.required()
    })
    .label('Source Account'),
  toAccount: Joi.string()
    .regex(validationUtils.objectIdRegExp)
    .when('_asNewRecord', {
      is: true,
      then: Joi.required()
    })
    .label('Destination Account'),
  date: Joi.date()
    .when('_asNewRecord', {
      is: true,
      then: Joi.required()
    })
    .label('Date'),
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
  // Accounts must be not equal
  if (item.fromAccount === item.toAccount) {
    return {
      ...c400,
      errors: {
        toAccount: ['Accounts must be different.']
      }
    };
  }

  // Check if fromAccount exists and has sufficient funds
  const fromAccountResult = await accountService.hasFunds(
    item.fromAccount,
    item.amount
  );
  if (fromAccountResult.errors) {
    return {
      ...c400,
      errors: { fromAccount: fromAccountResult.errors.account }
    };
  }

  // Check if toAccount exists
  const toAccountResult = await accountService.findById(item.toAccount, {
    select: '_id'
  });
  if (toAccountResult.errors) {
    return {
      ...c400,
      errors: { toAccount: toAccountResult.errors.id }
    };
  }

  return { validatedItem };
};

const updateValidation = async (id, item) => {
  /** Business Logic **/
  // Validate not allowed fields
  const notAllowedfields = {};
  if (item.hasOwnProperty('fromAccount'))
    notAllowedfields.fromAccount = [
      `"From Account" is not allowed to be updated.`
    ];
  if (item.hasOwnProperty('toAccount')) {
    notAllowedfields.toAccount = [`"To Account" is not allowed to be updated.`];
  }
  if (item.hasOwnProperty('amount'))
    notAllowedfields.amount = [`"Amount" is not allowed to be updated.`];
  if (Object.keys(notAllowedfields).length > 0)
    return {
      ...c400,
      errors: notAllowedfields
    };

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
