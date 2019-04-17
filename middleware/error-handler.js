const logger = require('../helpers/logger');
const logService = require('../api/modules/log/service');

const logErrorToDb = async item => {
  try {
    const result = await logService.create(item);
    if (result.status !== 201) logger.error(item.description);
    else console.log(`#LoggedErrorToDB ${item.description}`);
  } catch (error) {
    console.log('#NotLoggedErrorToDB', error);
    logger.error(`#NotLoggedErrorToDB ${error}`);
    logger.error(item.description);
  }
};

const errorHandler = function(err, req, res, next) {
  const item = {
    type: 'error',
    timestamp: new Date(),
    description: `#Exception ${err}`
  };
  logger.error(item.description);
  logErrorToDb(item);
  res.status(200).send({
    status: 500,
    message: 'Internal Server Error.'
  });
};

module.exports = { errorHandler, logErrorToDb };
