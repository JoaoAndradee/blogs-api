const { createUserSchema } = require('./schema');
const { createToken } = require('../../auth/authFunctions');
const { findEmail } = require('./validationInputValues');

const verifyCreateUser = async (user) => {
  const { error } = createUserSchema.validate(user);
  if (error) return { type: 'INVALID_FORMAT', message: error.message };
  const hasEmailRegistered = await findEmail(user.email);
  if (hasEmailRegistered) {
    return { type: 'REGISTERED_FIELD', message: 'User already registered' };
  }
  const token = createToken(user.email);
  return { type: 201, message: token };
};

module.exports = {
  verifyCreateUser,
};
