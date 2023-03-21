const { verifyToken } = require('../auth/authFunctions');

const { User } = require('../models');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const decoded = verifyToken(token);

    const hasEmail = await User.findOne({ where: { email: decoded.data } });

    if (!hasEmail) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    req.email = hasEmail;

    next();
  } catch (err) {
    res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = validateToken;
