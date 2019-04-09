const config = require('config');
const _ = require('lodash');
const Joi = require('joi');

const validationUtils = require('../../helpers/validation-utils');
const baseService = require('../_shared/base-service');
const model = require('./expense-category-model');

const modelNameSingular = 'Expense Category';
const modelNamePlural = 'Expense Categories';

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

const service = {};

service.find = async request => {
  try {
    const params = request.query;
    // set limit
    // limit=5
    let limit = config.get('app.items.limit');
    if (
      params.limit &&
      validationUtils.isIntegerGreaterThanZero(params.limit)
    ) {
      const limitParsed = params.limit * 1;
      if (limitParsed < config.get('app.items.limitMin'))
        limit = config.get('app.items.limitMin');
      else
        limit =
          limitParsed > config.get('app.items.limitMax')
            ? config.get('app.items.limitMax')
            : limitParsed;
    }
    // set offset
    // offset=10
    let offset = 0;
    if (
      params.offset &&
      validationUtils.isIntegerGreaterThanZero(params.offset)
    ) {
      offset = params.offset * 1;
    }
    // set sort
    // sort=name,-updatedAt
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
    // select=name,updatedAt
    let selectAggregation = '';
    if (params.select) {
      params.select.split(',').forEach(element => {
        if (model.schema.paths.hasOwnProperty(element))
          selectAggregation += ` ${element}`;
      });
    }
    // set filter
    // search=name:in|description:desc
    let filterAggregation = {};
    if (params.search) {
      console.log(params.search);
      const filterableColumns = ['name', 'description'];
      params.search.split('|').forEach(element => {
        const index = element.indexOf(':');
        if (index !== -1) {
          const propName = element.substring(0, index);
          const searchText = element.substring(index + 1, element.length);
          if (filterableColumns.indexOf(propName) !== -1) {
            filterAggregation[propName] = new RegExp(searchText, 'i');
          }
        }
      });
    }

    const _meta = {
      limit,
      offset
    };

    const query = model.find(filterAggregation);

    const data = await query
      .skip(offset)
      .limit(limit)
      .sort(sortAggregation)
      .select(selectAggregation)
      .exec();

    // set totalCount
    if (request.headers['x-request-count-total'] === 'true') {
      if (data.length > 0) {
        _meta.totalCount = await model
          .find(filterAggregation)
          .countDocuments()
          .exec();
      } else _meta.totalCount = 0;
    }

    return {
      status: 'success',
      code: 200,
      _meta,
      d: data
    };
  } catch (ex) {
    console.log('An exception has been thrown:', ex);
    return {
      status: 'error',
      code: 500,
      message: `There was a problem trying to get '${modelNamePlural}'`
    };
  }
};

service.findById = async (id, params) => {
  try {
    // validate id
    const validationIdResult = baseService.validateId(id);
    if (validationIdResult)
      return {
        status: validationIdResult.status,
        code: validationIdResult.code,
        message: validationIdResult.message,
        errors: validationIdResult.errors
      };

    // set select
    let selectAggregation = '';
    if (params.select) {
      params.select.split(',').forEach(element => {
        if (model.schema.paths.hasOwnProperty(element))
          selectAggregation += ` ${element}`;
      });
    }

    const query = model.findById(id).select(selectAggregation);

    const itemFound = await query.exec();
    if (itemFound)
      return {
        status: 'success',
        code: 200,
        d: itemFound
      };
    else
      return {
        status: 'failure',
        code: 404,
        message: `The requested item was Not Found.`,
        errors: {
          id: [
            `The specified item Id '${id}' was not found, or you do not have permission to access it.`
          ]
        }
      };
  } catch (ex) {
    console.log('An exception has been thrown:', ex);
    return {
      status: 'error',
      code: 500,
      message: `There was a problem trying to get an item '${modelNameSingular}' with id '${id}'`
    };
  }
};

service.create = async item => {
  try {
    // validate item
    item.isNew = true;
    const validationResult = baseService.validateItem(item, schema);
    if (validationResult)
      return {
        status: 'failure',
        code: 400,
        message: validationResult.message,
        errors: validationResult.errors
      };

    // check if item is duplicated
    const itemFound = await model.findOne(
      {
        name: item.name
      },
      '_id'
    );
    if (itemFound)
      return {
        status: 'failure',
        message: 'Item already exists.',
        code: 409,
        errors: {
          name: [`"${item.name}" already exists.`]
        }
      };

    // format data structure
    formatItem(item);

    // try to create a new item
    const now = new Date();
    item.createdAt = now;
    item.updatedAt = now;
    delete item.isNew;
    const itemCreated = await model.create(item);

    return {
      status: 'success',
      code: 201,
      d: itemCreated
    };
  } catch (ex) {
    console.log('An exception has been thrown:', ex);
    return {
      status: 'error',
      code: 500,
      message: `There was a problem creating an item of type '${modelNameSingular}'.`
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
        code: validationIdResult.code,
        message: validationIdResult.message,
        errors: validationIdResult.errors
      };

    // validate item
    const isEmpty = _.isEmpty(item);
    if (isEmpty)
      return {
        status: 'failure',
        code: 400,
        message: 'Invalid request data.',
        errors: {
          _: [`You must provide at least one field to be updated.`]
        }
      };

    item.isNew = false;
    const validationResult = baseService.validateItem(item, schema);
    if (validationResult)
      return {
        status: 'failure',
        code: 400,
        message: validationResult.message,
        errors: validationResult.errors
      };

    // format data structure
    formatItem(item);

    // try to update an item
    item.updatedAt = new Date();
    delete item.isNew;
    const itemUpdated = await model.findOneAndUpdate(
      {
        _id: id
      },
      item,
      {
        new: true
      }
    );

    if (itemUpdated)
      return {
        status: 'success',
        code: 200,
        d: itemUpdated
      };
    else
      return {
        status: 'failure',
        code: 404,
        message: `The requested item was Not Found.`,
        errors: {
          id: [
            `The specified item Id '${id}' was not found, or you do not have permission to access it.`
          ]
        }
      };
  } catch (ex) {
    console.error('An exception has been thrown:', ex);
    return {
      status: 'error',
      code: 500,
      message: `There was a problem updating an item of type '${modelNameSingular}'.`
    };
  }
};

service.delete = async id => {
  try {
    // validate id
    const validationIdResult = baseService.validateId(id);
    if (validationIdResult)
      return {
        status: validationIdResult.status,
        code: validationIdResult.code,
        message: validationIdResult.message,
        errors: validationIdResult.errors
      };

    // try to delete an item
    const itemDeleted = await model.findOneAndDelete({
      _id: id
    });
    if (itemDeleted)
      return {
        status: 'success',
        code: 200,
        message: `Item with id '${id}' was deleted successfully.`
      };
    else
      return {
        status: 'failure',
        code: 404,
        message: `The specified item Id '${id}' was not found, or you do not have permission to access it.`
      };
  } catch (ex) {
    console.error('An exception has been thrown:', ex);
    return {
      status: 'error',
      code: 500,
      message: `There was a problem deleting an item with id '${id}'`
    };
  }
};

const formatItem = item => {
  if (item.name) item.name = item.name.trim();
  if (item.description) item.description = item.description.trim();
};

module.exports = service;
