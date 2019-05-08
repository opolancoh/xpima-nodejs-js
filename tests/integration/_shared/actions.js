exports.createValidDataForPost = (model, data) => {
  data.forEach(element => {
    element.retornableFields = model.filter(item => {
      return (
        item.selectable === true &&
        element.nonRetornableFields.indexOf(item.name) === -1
      );
    });
  });
};

exports.createValidDataForGetSelect = (model, data) => {
  data.forEach(element => {
    let queryArray = [];
    if (element.query !== '') {
      queryArray = element.query
        .substring(element.query.indexOf('=') + 1, element.query.length)
        .split(',');
    }

    if (queryArray.length === 0) {
      element.retornableFields = model.filter(item => {
        return item.selectable === true;
      });
    } else {
      element.retornableFields = model.filter(item => {
        return (
          item.name === '_id' ||
          (item.selectable === true && queryArray.indexOf(item.name) !== -1)
        );
      });
    }
    element.nonRetornableFields = model.filter(item => {
      return !element.retornableFields.includes(item);
    });
  });
};

exports.createValidDataForGetPagination = (
  data,
  totalCount,
  defaultMaxRowLimit
) => {
  data.forEach(element => {
    let dataLength = element.limit < totalCount ? element.limit : totalCount;
    if (dataLength > defaultMaxRowLimit) dataLength = defaultMaxRowLimit;
    if (element.offset > 0) {
      const diff = totalCount - element.offset;
      if (diff <= 0) dataLength = 0;
      else dataLength = diff > element.limit ? limit : diff;
    }
    element.dataLength = dataLength;
  });
};

exports.createValidDataForPut = (model, data) => {
  data.forEach(element => {
    element.retornableFields = model.filter(item => {
      return item.selectable === true;
    });
    element.nonRetornableFields = model.filter(item => {
      return !element.retornableFields.includes(item);
    });
  });
};
