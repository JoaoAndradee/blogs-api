const { createToken } = require('../auth/authFunctions');

const { User } = require('../models');
const { verifyLogin } = require('./validations/validationInputValues');

const login = async (objLogin) => {
  const { email, password } = objLogin;
  const error = await verifyLogin(objLogin);
  if (error.type) return error;
  const user = await User.create({ email, password });
  const { password: _password, ...userWithoutPassword } = user.dataValues;
  const token = createToken(userWithoutPassword);
  return { type: null, message: token };
};

module.exports = {
  login,
};
