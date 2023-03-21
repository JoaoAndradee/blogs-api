const { userService } = require('../services');
const { verifyCreateUser } = require('../services/validations/validationCreateUser');
const { verifyLogin } = require('../services/validations/validationInputValues');
const { verifyUserExist } = require('../services/validations/validationUserId');
const { mapError } = require('../utils/errorMap');

const login = async (req, res) => {
  try {
    const { type, message } = await verifyLogin(req.body);

    if (type === 200) {
      return res.status(200).json({ token: message });
    }
    return res.status(type).json({ message });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const createUser = async (req, res) => {
  const { type, message } = await verifyCreateUser(req.body);

  try {
    if (type === 201) {
      await userService.createUser(req.body);
      return res.status(type).json({ token: message });
    }

    return res.status(mapError(type)).json({ message });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const result = await userService.getAllUsers();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const { type, message } = await verifyUserExist(id);

    if (type) return res.status(type).json({ message });

    return res.status(200).json([message]);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  login,
  createUser,
  getAllUsers,
  getUserById,
};
