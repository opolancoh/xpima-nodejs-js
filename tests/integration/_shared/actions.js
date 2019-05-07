exports.createValidDataForPost = (model, baseData) => {
  baseData.forEach(element => {
    element.retornableFields = model.filter(item => {
      return (
        item.selectable === true &&
        element.nonRetornableFields.indexOf(item.name) === -1
      );
    });
  });
  return baseData;
};

exports.createValidDataForGetSelect = (model, baseData) => {
  baseData.forEach(element => {
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
  return baseData;
};

exports.createValidDataForPut = (model, baseData) => {
  baseData.forEach(element => {
    element.retornableFields = model.filter(item => {
      return item.selectable === true;
    });
    element.nonRetornableFields = model.filter(item => {
      return !element.retornableFields.includes(item);
    });
  });
  return baseData;
};
