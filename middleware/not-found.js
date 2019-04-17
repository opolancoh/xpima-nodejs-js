var logger = require('../helpers/logger');

module.exports = function(req, res, next) {
  //console.log('An exception has been thrown:', ex);
  const message = `The requested url '${req.url}' was Not Found.`;
  logger.warn(message);
  res.status(200).send({
    status: 404,
    message: message
  });
};
