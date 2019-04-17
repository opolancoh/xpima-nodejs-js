const utils = {};

utils.objectIdRegExp = /^[0-9a-fA-F]{24}$/;
utils.integerGreaterThanZeroRegExp = /^[1-9]\d*$/;
utils.integerGreaterOrEqualThanZeroRegExp = /^\d+$/; // \d equivalent to [0-9]
utils.urlRegExp = /((http|https):\/\/)?[A-Za-z0-9\.-]{3,}\.[A-Za-z]{2}/;
utils.alphanumericSpecialRegExp = /^[a-z\d\-_\s]+$/; // Allows alphanumeric, space, hyphen, underscore

utils.isObjectId = value => {
  if (typeof value === 'undefined') return false;
  return utils.objectIdRegExp.test(value);
};

utils.isIntegerGreaterThanZero = value => {
  if (typeof value === 'undefined') return false;
  return utils.integerGreaterThanZeroRegExp.test(value);
};

utils.isIntegerGreaterOrEqualThanZero = value => {
  if (typeof value === 'undefined') return false;
  return utils.integerGreaterOrEqualThanZeroRegExp.test(value);
};

utils.isUrl = value => {
  if (typeof value === 'undefined') return false;
  return utils.urlRegExp.test(value);
};

utils.isAlphanumericSpecial = value => {
  if (typeof value === 'undefined') return false;
  return utils.alphanumericSpecialRegExp.test(value);
};

module.exports = utils;
