const config = require('config');
const _ = require('lodash');
const Joi = require('joi');

const validationUtils = require('../../helpers/validation-utils');
const baseService = require('../_shared/base-service');
const baseModel = require('../_shared/base-model');
const model = require('./expense-model');

const modelNameSingular = 'Expense';
const modelNamePlural = 'Expenses';

const schema = Joi.object().keys({
    isNew: Joi.boolean().required(),
    amount: Joi.number().positive().precision(2).when('isNew', {
        is: true,
        then: Joi.required()
    }),
    date: Joi.date().iso().when('isNew', {
        is: true,
        then: Joi.required()
    }),
    description: Joi.string().trim().min(2).max(255),
    paymentType: Joi.string().trim().valid(['cash', 'bank']).insensitive().lowercase().when('isNew', {
        is: true,
        then: Joi.required()
    }),
    category: Joi.string().regex(validationUtils.objectIdRegExp)
});

const service = {};

service.find = async (params) => {
    try {
        // set limit
        let limit = config.get('app.items.limit');
        if (params.limit && validationUtils.isIntegerGreaterThanZero(params.limit)) {
            const limitParsed = params.limit * 1;
            if (limitParsed < config.get('app.items.limitMin'))
                limit = config.get('app.items.limitMin');
            else
                limit = limitParsed > config.get('app.items.limitMax') ? config.get('app.items.limitMax') : limitParsed;
        }
        // set offset
        let offset = 0;
        if (params.offset && validationUtils.isIntegerGreaterThanZero(params.offset)) {
            offset = params.offset * 1;
        }
        // set sort
        let sortAggregation = {};
        if (params.sort) {
            params.sort.split(',').forEach(element => {
                let propName = element;
                let isAsc = true;

                const sortOrder = element.substring(0, 1);
                if (sortOrder === '-' || sortOrder === ' ' || sortOrder === '+') {
                    propName = element.substring(1, element.length);
                    if (sortOrder === '-') isAsc = false;
                }

                if (model.schema.paths.hasOwnProperty(propName)) {
                    sortAggregation[propName] = isAsc ? 1 : -1;
                }
            });
        }
        // set select
        let selectAggregation = '';
        if (params.select) {
            params.select.split(',').forEach(element => {
                if (model.schema.paths.hasOwnProperty(element))
                    selectAggregation += ` ${element}`;
            });
        }
        // set filter
        let filterAggregation = {};
        /*if (params.q) {
            params.q.split(',').forEach(element => {
                if (model.schema.paths.hasOwnProperty(element))
                filterAggregation += ` ${element}`;
            });
        }*/

        const _meta = {
            offset,
            limit
        };

        const query = model
            .find(filterAggregation)
            .skip(offset)
            .limit(limit)
            .populate('category', 'name')
            .sort(sortAggregation)
            .select(selectAggregation);

        const data = await query.exec();

        // set totalCount
        if (params.limit || params.offset) {
            if (data.length > 0)
                _meta.totalCount = await model.find(filterAggregation).countDocuments().exec();
            else
                _meta.totalCount = 0;
        }

        return {
            status: 'success',
            response: {
                _meta,
                data
            }
        };
    } catch (ex) {
        console.log('An exception has been thrown:', ex);
        return {
            status: 'error',
            message: `There was a problem trying to get '${modelNamePlural}'`
        };
    }
};

service.findById = async (id) => {
    try {
        // validate id
        const validationIdResult = baseService.validateId(id);
        if (validationIdResult)
            return {
                status: validationIdResult.status,
                response: {
                    message: validationIdResult.message,
                    errors: validationIdResult.errors
                }
            };

        const itemFound = await model.findById(id).populate('category', 'name');
        if (itemFound)
            return {
                status: 'success',
                response: itemFound
            };
        else return {
            status: 'not-found',
            response: {
                message: `Item with id '${id}' was not found, or you do not have permission to access it.`
            }
        };
    } catch (ex) {
        console.log('An exception has been thrown:', ex);
        return {
            status: 'error',
            response: {
                message: `There was a problem trying to get an item '${modelNameSingular}' with id '${id}'`
            }
        };
    }
};

service.create = async (item) => {
    try {
        // validate item
        item.isNew = true;
        const validationResult = baseService.validateItem(item, schema);
        if (validationResult)
            return {
                status: 'item-not-valid',
                response: {
                    message: validationResult.message,
                    errors: validationResult.errors
                }
            };

        // format data structure
        formatItem(item);

        // try to create a new item
        const now = new Date();
        item.createdAt = now;
        item.updatedAt = now;

        if (item.category) {
            item.category = baseModel.parseObjectId(item.category);
        }

        delete item.isNew;
        const itemCreated = await model.create(item);

        return {
            status: 'success',
            response: itemCreated
        };
    } catch (ex) {
        console.log('An exception has been thrown:', ex);
        return {
            status: 'error',
            response: {
                message: `There was a problem creating an item of type '${modelNameSingular}'.`
            }
        };
    }
};

service.update = async (id, item) => {
    try {
        // validate id
        const validationIdResult = baseService.validateId(id);
        if (validationIdResult)
            return {
                status: validationIdResult.status,
                response: {
                    message: validationIdResult.message,
                    errors: validationIdResult.errors
                }
            };

        // validate item
        const isEmpty = _.isEmpty(item);
        if (isEmpty)
            return {
                status: 'item-not-valid',
                response: {
                    message: 'Invalid request data.',
                    errors: [{
                        field: "",
                        message: `You must provide at least one filed to be updated.`
                    }]
                }
            };

        item.isNew = false;
        const validationResult = baseService.validateItem(item, schema);
        if (validationResult)
            return {
                status: 'item-not-valid',
                response: {
                    message: validationResult.message,
                    errors: validationResult.errors
                }
            };

        // format data structure
        formatItem(item);

        // try to update an item
        item.updatedAt = new Date();
        delete item.isNew;
        const itemUpdated = await model.findOneAndUpdate({
            _id: id
        }, item, {
            new: true
        }).populate('category', 'name');

        if (itemUpdated)
            return {
                status: 'success',
                response: itemUpdated
            };
        else return {
            status: 'not-found',
            response: {
                message: `Item with id '${id}' was not found, or you do not have permission to access it.`
            }
        };
    } catch (ex) {
        console.error('An exception has been thrown:', ex);
        return {
            status: 'error',
            response: {
                message: `There was a problem updating an item of type '${modelNameSingular}'.`
            }
        };
    }
};

service.delete = async (id) => {
    try {
        // validate id
        const validationIdResult = baseService.validateId(id);
        if (validationIdResult)
            return {
                status: validationIdResult.status,
                response: {
                    message: validationIdResult.message,
                    errors: validationIdResult.errors
                }
            };

        // try to delete an item
        const itemDeleted = await model.findOneAndDelete({
            _id: id
        });
        if (itemDeleted)
            return {
                status: 'success',
                response: {
                    message: `Item with id '${id}' was deleted successfully.`
                }
            };
        else return {
            status: 'not-found',
            response: {
                message: `Item with id '${id}' was not found, or you do not have permission to access it.`
            }
        };
    } catch (ex) {
        console.error('An exception has been thrown:', ex);
        return {
            status: 'error',
            response: {
                message: `There was a problem deleting an item with id '${id}'`
            }
        };
    }
};

const formatItem = (item) => {
    if (item.description)
        item.description = item.description.trim();
    if (item.paymentType)
        item.paymentType = _.capitalize(item.paymentType.trim());
}

module.exports = service;