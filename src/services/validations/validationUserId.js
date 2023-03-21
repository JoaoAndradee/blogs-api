const { userService } = require('..');

const verifyUserExist = async (id) => {
  const result = await userService.getUserById(id);
  if (!result) return { type: 404, message: 'User does not exist' };
  return { type: null, message: result };
};

module.exports = {
  verifyUserExist,
};
