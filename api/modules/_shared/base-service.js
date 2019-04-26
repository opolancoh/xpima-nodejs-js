const transformationUtils = require('../../../helpers/transformation-utils');
const { c404 } = require('../_shared/base-response');

const baseService = {};

baseService.find = async (request, model) => {
  const {
    limit,
    offset,
    sort,
    select,
    filter
  } = transformationUtils.getQueryParams(
    request.query,
    model.schema.paths,
    model.filterableFields
  );

  const _meta = {
    limit,
    offset
  };

  const query = model.find(filter);

  const data = await query
    .skip(offset)
    .limit(limit)
    .sort(sort)
    .select(select)
    .exec();

  // set totalCount
  if (request.headers['x-request-count-total'] === 'true') {
    if (data.length > 0) {
      _meta.totalCount = await model
        .find(filter)
        .countDocuments()
        .exec();
    } else _meta.totalCount = 0;
  }

  // Delete fields that are not returnable
  if (model.nonSelectableFields)
    deleteNonSelectableFieldsFromArray(data, model.nonSelectableFields);

  return {
    code: 200,
    _meta,
    d: data
  };
};

baseService.findById = async (id, queryString, model) => {
  // Input and business validation
  const validationResult = await model.validator.findByIdValidation(id);
  if (validationResult) return validationResult;

  const { select } = transformationUtils.getQueryParams(
    queryString,
    model.schema.paths
  );

  const query = model.findById(id).select(select);

  const itemFound = await query.exec();
  if (itemFound) {
    // Delete fields that are not returnable
    if (model.nonSelectableFields)
      deleteNonSelectableFieldsFromObject(itemFound, model.nonSelectableFields);
    return {
      code: 200,
      d: itemFound
    };
  } else
    return {
      ...c404,
      errors: {
        id: [
          `The specified item Id '${id}' was not found, or you do not have permission to access it.`
        ]
      }
    };
};

baseService.create = async (body, model) => {
  // Input and business validation
  const validationResult = await model.validator.createValidation(body);
  if (validationResult.errors) return validationResult;

  const item = validationResult.validatedItem;

  // Create
  const now = new Date();
  item.createdAt = now;
  item.updatedAt = now;
  let itemCreated = await model.create(item);

  // Delete fields that are not returnable
  if (model.nonSelectableFields)
    deleteNonSelectableFieldsFromObject(itemCreated, model.nonSelectableFields);

  return {
    code: 201,
    d: itemCreated
  };
};

baseService.update = async (id, body, model) => {
  // Input and business validation
  const validationResult = await model.validator.updateValidation(id, body);
  if (validationResult.errors) return validationResult;

  const item = validationResult.validatedItem;

  // Update
  item.updatedAt = new Date();
  const itemUpdated = await model.findOneAndUpdate(
    {
      _id: id
    },
    item,
    {
      new: true
    }
  );

  if (itemUpdated) {
    // Delete fields that are not returnable
    if (model.nonSelectableFields)
      deleteNonSelectableFieldsFromObject(
        itemUpdated,
        model.nonSelectableFields
      );
    return {
      code: 200,
      d: itemUpdated
    };
  } else
    return {
      ...c404,
      errors: {
        id: [
          `The specified item Id '${id}' was not found, or you do not have permission to access it.`
        ]
      }
    };
};

baseService.delete = async (id, model) => {
  // Input and business validation
  const validationResult = await model.validator.deleteValidation(id);
  if (validationResult) return validationResult;

  // Delete
  const itemDeleted = await model.findOneAndDelete({
    _id: id
  });
  if (itemDeleted)
    return {
      code: 200
    };
  else
    return {
      ...c404,
      errors: {
        id: [
          `The specified item Id '${id}' was not found, or you do not have permission to access it.`
        ]
      }
    };
};

/*const getSelectableFields = (select, nonSelectableFields) => {
  let selectableFields = select;
  if (nonSelectableFields) {
    const selectFiltered = select.filter(function(e) {
      return this.indexOf(e) < 0;
    }, nonSelectableFields);

    selectableFields = selectFiltered.concat(
      nonSelectableFields.map(item => {
        return '-' + item;
      })
    );
  }
  return selectableFields;
};*/

const deleteNonSelectableFieldsFromObject = (obj, nonSelectableFields) => {
  nonSelectableFields.forEach(element => delete obj._doc[element]);
};

const deleteNonSelectableFieldsFromArray = (arr, nonSelectableFields) => {
  arr.forEach(item => {
    nonSelectableFields.forEach(element => delete item._doc[element]);
  });
};

module.exports = baseService;
