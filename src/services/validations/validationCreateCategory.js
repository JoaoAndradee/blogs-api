const { createCategorySchema } = require('./schema');

const validateCategory = (Category) => {
  const { error } = createCategorySchema.validate(Category);
  if (error) return { type: 'INVALID_FORMAT', message: error.message };
  return { type: null, message: '' };
};

module.exports = {
  validateCategory,
};
