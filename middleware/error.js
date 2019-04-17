var logger = require('../helpers/logger');

module.exports = function(err, req, res, next) {
  console.log(`#Exception ${err}`);
  logger.error(`#Exception #${err.name} ${err.message}`);
  res.status(200).send({
    status: 'error',
    code: 500,
    message: 'Internal Server Error.'
  });
};
