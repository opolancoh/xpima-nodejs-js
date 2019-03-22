const Joi = require('joi');

const validationUtils = require('../../helpers/validation-utils');

exports.validateId = (id) => {
    try {
        const isObjectId = validationUtils.isObjectId(id);

        if (!isObjectId)
            return {
                status: 'failure',
                code: 400,
                message: 'Invalid request data.',
                errors: [{
                    field: "id",
                    message: `Id '${id}' is not valid.`
                }]
            };
    } catch (e) {
        throw new Error(e);
    }
};

exports.validateItem = (item, schema) => {
    try {
        const result = Joi.validate(item, schema, {
            abortEarly: false
        });

        if (result && result.error) {

            let errors = [];
            result.error.details.forEach(element => {
                errors.push({
                    field: element.context.key,
                    message: element.message
                });
            });

            return {
                message: 'Invalid request data.',
                errors
            };
        }
    } catch (e) {
        throw new Error(e);
    }
};