const logger = require('../helpers/logger');
const { logErrorToDb } = require('./error-handler');

module.exports = function(req, res, next) {
  const item = {
    type: 'warn',
    timestamp: new Date(),
    description: (description = `#NotFound The requested url '${
      req.url
    }' was Not Found.`)
  };
  logger.warn(item.description);
  logErrorToDb(item);
  res.status(200).send({
    status: 404,
    message: item.description
  });
};
