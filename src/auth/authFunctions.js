const jwt = require('jsonwebtoken');

const secret = 'Batatinha';

const JWT_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '300min',
};

const createToken = (data) => jwt.sign({ data }, secret, JWT_CONFIG);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = {
  createToken,
  verifyToken,
};
