const utils = {};

utils.objectIdRegExp = /^[0-9a-fA-F]{24}$/;
utils.integerGreaterThanZeroRegExp = /^[1-9]\d*$/;
utils.integerGreaterOrEqualThanZeroRegExp = /^\d+$/; // \d equivalent to [0-9]
utils.urlRegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
utils.alphanumericSpecialRegExp = /^(?=.*[a-zA-Z0-9 _-])/; // Allows alphanumeric, space, hyphen, underscore, at least one character
utils.emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 

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

utils.isEmail = value => {
  if (typeof value === 'undefined') return false;
  return utils.emailRegExp.test(value);
};

module.exports = utils;
