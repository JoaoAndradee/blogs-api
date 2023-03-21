const { verifyToken } = require('../auth/authFunctions');

const { User } = require('../models');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = verifyToken(token);

    const hasEmail = await User.findOne({ where: { email: decoded.data } });

    req.email = hasEmail;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;
