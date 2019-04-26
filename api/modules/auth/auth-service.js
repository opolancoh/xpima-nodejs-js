const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const userService = require('../user/user-service');

const service = {};

service.signup = async item => {
  return await userService.create(item);
};

service.login = async credentials => {
  if (!credentials.email || !credentials.password)
    return { code: 400, message: 'Invalid email or password.' };

  // Find a user with an email
  const userResult = await userService.findByEmail(
    credentials.email,
    '_id name password'
  );
  if (userResult.errors) {
    if (userResult.code === 404)
      return { code: 400, message: 'Invalid email or password.' };
    return userResult;
  }

  const validPassword = await bcrypt.compare(
    credentials.password,
    userResult.d.password
  );
  if (!validPassword)
    return { code: 400, message: 'Invalid email or password.' };

  const token = jwt.sign(
    { userId: userResult.d._id, userName: userResult.d.name },
    config.get('secrets.jwtPrivateKey'),
    {
      expiresIn: 86400 // expires in 24 hours
    }
  );
  return { code: 200, d: { token } };
};

module.exports = service;
