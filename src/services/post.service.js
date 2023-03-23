const { BlogPost, PostCategory, User } = require('../models');
const { verifyCreatePost, verifyPostFields } = require('./validations/validationCreatePost');

const findIdUser = async (email) => {
  const { id } = await User.findOne({ where: { email } });
  return id;
};

const addPost = async ({ title, content, userId, categoryIds }) => {
  const errorObj = verifyPostFields({ title, content, categoryIds });
  if (errorObj.type) return errorObj;
  const errorId = await verifyCreatePost(categoryIds);
  if (errorId.type) return errorId;
  const post = await BlogPost.create({ title, content, userId, published: new Date(), updated: new Date() });
  const categories = categoryIds
    .map(async (category) => PostCategory.create({ postId: post.id, categoryId: category }));
  Promise.all(categories);
  return { type: null, message: post };
};

module.exports = {
  findIdUser,
  addPost,
};
