const Joi = require('joi');

const validationUtils = require('../../../helpers/validation-utils');

exports.validateId = id => {
  const isObjectId = validationUtils.isObjectId(id);

  if (!isObjectId)
    return {
      errors: {
        id: [`Id '${id}' is not valid.`]
      }
    };
};

exports.validateSchema = (item, schema, asRequired) => {
  let errors;
  if (typeof asRequired === 'boolean') item._asNewRecord = asRequired;
  const result = Joi.validate(item, schema, {
    abortEarly: false
  });
  delete item._asNewRecord;

  if (result.error) {
    errors = {};
    result.error.details.forEach(element => {
      if (!errors.hasOwnProperty(element.context.key))
        errors[element.context.key] = [];
      errors[element.context.key].push(element.message);
    });
  }
  return { validatedItem: result.value, errors };
};
