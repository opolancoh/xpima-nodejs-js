const logger = require('../helpers/logger');
const { customErrorHandler } = require('./error-handler');

module.exports = function(req, res, next) {
  const message = `The requested url '${req.url}' was Not Found.`;
  customErrorHandler(Error(`#NotFound ${message}`), 'warn');
  res.status(200).send({
    code: 404,
    message
  });
};
