const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(200).send({
      code: 401,
      message: 'Unauthorized. No token provided.'
    });
  }

  try {
    const tokenDecoded = jwt.verify(token, config.get('secrets.jwtPrivateKey'));
    req._authInfo = tokenDecoded;
    next();
  } catch (ex) {
    res.status(200).send({
      code: 400,
      message: 'Unauthorized. Invalid token.'
    });
  }
};
