const { verifyLogin } = require('../services/validations/validationInputValues');

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

module.exports = {
  login,
};
