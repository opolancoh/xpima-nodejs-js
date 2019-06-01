const { customErrorHandler } = require('./error-handler');

module.exports = function(req, res, next) {
  const message = `The requested URL '${
    req.url
  }' was not found on this server.`;
  customErrorHandler(Error(`#NotFound ${message}`), 'warn');
  res.status(200).send({
    code: 404,
    message,
    errors: {
      url: [req.url]
    }
  });
};
