const errorMap = {
  INVALID_TOKEN: 401,
  INVALID_FORMAT: 400,
  REGISTERED_FIELD: 409,
  INVALID_FIELD: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
