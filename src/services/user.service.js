const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  return user;
};

const deleteProfile = async (email) => {
  const user = await User.findOne({ where: { email } });
  await user.destroy();
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteProfile,
};
