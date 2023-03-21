const { createToken } = require('../../auth/authFunctions');
const { User } = require('../../models');
const { loginSchema } = require('./schema');

const findEmail = (email) => User.findOne({ where: { email } });

const verifyLogin = async (user) => {
  const { error } = loginSchema.validate(user);
  if (error) return { type: 400, message: 'Some required fields are missing' };
  const hasUser = await findEmail(user.email);
  if (!hasUser) return { type: 400, message: 'Invalid fields' };
  const token = createToken(user.email);
  return { type: 200, message: token };
};

module.exports = {
  verifyLogin,
  findEmail,
};
