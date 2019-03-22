const utils = {};

utils.objectIdRegExp = /^[0-9a-fA-F]{24}$/
utils.integerGreaterThanZeroRegExp = /^[1-9]\d*$/;
utils.integerGreaterOrEqualThanZeroRegExp = /^\d+$/; // \d equivalent to [0-9]
utils.urlRegExp = /((http|https):\/\/)?[A-Za-z0-9\.-]{3,}\.[A-Za-z]{2}/;
utils.alphanumericSpecialRegExp = /^[a-z\d\-_\s]+$/; // Allows alphanumeric, space, hyphen, underscore

utils.isObjectId = (id) => {
    return utils.objectIdRegExp.test(id);
};

utils.isIntegerGreaterThanZero = (x) => {
    return utils.integerGreaterThanZeroRegExp.test(x);
};

utils.isIntegerGreaterOrEqualThanZero = (x) => {
    return utils.integerGreaterOrEqualThanZeroRegExp.test(x);
};

utils.isUrl = (x) => {
    return utils.urlRegExp.test(x);
};

utils.isAlphanumericSpecial = (x) => {
    return utils.alphanumericSpecialRegExp.test(x);
};

module.exports = utils;