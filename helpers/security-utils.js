const bcrypt = require('bcrypt');

exports.getSalt = async () => {
  return await bcrypt.genSalt(8);
};

exports.getHashed = async (text, salt = '') => {
  return await bcrypt.hash(text, salt);
};
