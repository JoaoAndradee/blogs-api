const { postUpdateSchema } = require('./schema');

const verifyUpdatePost = (updateObj) => {
  const { error } = postUpdateSchema.validate(updateObj);
  if (error) return { type: 'INVALID_FORMAT', message: 'Some required fields are missing' };
  return { type: null, message: '' };
};

module.exports = {
  verifyUpdatePost,
};
