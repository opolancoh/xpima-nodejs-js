const logger = require('../helpers/logger');
const logService = require('../api/modules/log/log-service');
const { c500 } = require('../api/modules/_shared/base-response');

const logToDb = async item => {
  try {
    const result = await logService.create(item);
    if (result.code !== 201) {
      logger.error(`#LogToDbError ${item.description}`);
    }
  } catch (ex) {
    console.log('#LogToDbException', ex);
    logger.error(`#LogToDbException ${ex}`);
    logger.error(item.description);
  }
};

const systemErrorHandler = function(err, req, res, next) {
  customErrorHandler(err, 'error');
  res.status(200).send({
    ...c500
  });
};

const customErrorHandler = function(err, level) {
  //console.log('stack', err.stack);
  const errorLevel = level || 'error';
  const errorDescription = `#Exception ${err.stack}`;
  const item = {
    level: errorLevel,
    timestamp: new Date(),
    description: errorDescription
  };
  logger.log(errorLevel, errorDescription);
  logToDb(item);
};

module.exports = { systemErrorHandler, customErrorHandler };
