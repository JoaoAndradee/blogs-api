const { Category } = require('../../models');
const { postSchema } = require('./schema');

const verifyPostFields = (postObj) => {
  const { error } = postSchema.validate(postObj);
  if (error) return { type: 'INVALID_FORMAT', message: 'Some required fields are missing' };
  return { type: null, message: '' };
};

const verifyCreatePost = async (categoryIdsArr) => {
  const categories = await Category.findAll();
  const categoriesIds = categories.map((item) => item.id);
  const validIds = categoryIdsArr.every((id) => categoriesIds.includes(id));
  if (!validIds) return { type: 'INVALID_FORMAT', message: 'one or more "categoryIds" not found' };
  return { type: null, message: '' };
};

module.exports = {
  verifyPostFields,
  verifyCreatePost,
};
