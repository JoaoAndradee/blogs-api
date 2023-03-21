const { userService } = require('../services');
const errorMap = require('../utils/errorMap');

const login = async (req, res) => {
  try {
  const { type, message } = await userService.login(req.body);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  console.log('PASSOU DO IF');
  return res.status(200).json({ token: message });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  login,
};
