const { User } = require('../../models');

const findEmail = (email) => User.findOne({ where: { email } });

const verifyLogin = async (loginObj) => {
  const { email, password } = loginObj;
  if (!email || !password) {
    return { type: 'INVALID_FORMAT', message: 'Some required fields are missing' };
  }
  const result = await findEmail(email);
  if (result) return { type: 'INVALID_FORMAT', message: 'Invalid fields' };
  return { type: null, message: '' };
};

module.exports = {
  verifyLogin,
};
