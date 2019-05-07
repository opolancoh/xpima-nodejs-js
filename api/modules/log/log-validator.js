const Joi = require('joi');
const _ = require('lodash');

const baseValidator = require('../_shared/base-validator');
const { c400 } = require('../_shared/base-response');

const schema = Joi.object().keys({
  level: Joi.string()
    .required()
    .label('Level'),
  timestamp: Joi.date()
    .required()
    .label('Timestamp'),
  description: Joi.string()
    .required()
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
  const { validatedItem, errors } = baseValidator.validateSchema(item, schema);
  if (errors) return { ...c400, errors };

  /** Business Logic **/

  return { validatedItem };
};

module.exports = {
  findByIdValidation,
  createValidation,
  validateSchema: baseValidator.validateSchema
};
