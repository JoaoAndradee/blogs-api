const { BlogPost, PostCategory, User, Category } = require('../models');
const { verifyCreatePost, verifyPostFields } = require('./validations/validationCreatePost');
const { verifyUpdatePost } = require('./validations/validationUpdatePost');

const findIdUser = async (email) => {
  const { id } = await User.findOne({ where: { email } });
  return id;
};

const addPost = async ({ title, content, userId, categoryIds }) => {
  const errorObj = verifyPostFields({ title, content, categoryIds });
  if (errorObj.type) return errorObj;
  const errorId = await verifyCreatePost(categoryIds);
  if (errorId.type) return errorId;
  const post = await BlogPost
    .create({ title, content, userId, published: new Date(), updated: new Date() });
  const categories = categoryIds
    .map(async (category) => PostCategory.create({ postId: post.id, categoryId: category }));
  Promise.all(categories);
  return { type: null, message: post };
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
      },
    ],
  });

  return posts;
};

const getPostById = async (id) => {
  const posts = await getPosts();
  const postId = posts.find((post) => post.dataValues.id === Number(id));
  if (!postId) return { type: 'INVALID_FIELD', message: 'Post does not exist' };
  return { type: null, message: postId };
};

const updatePost = async ({ idPost, emailUser, title, content }) => {
  const errorFormat = verifyUpdatePost({ title, content });
  if (errorFormat.type) return errorFormat;
  const { message: { dataValues: { user: { email } } } } = await getPostById(idPost);
  if (email !== emailUser) return { type: 'INVALID_TOKEN', message: 'Unauthorized user' };
  const post = await BlogPost.findOne({ where: { id: idPost } });
  await post.update({ title, content });
  const { message } = await getPostById(idPost);
  return { type: null, message };
};

const deletePost = async ({ emailUser, id }) => {
  const posts = await getPosts();
  const postId = posts.find((post) => post.dataValues.id === Number(id));
  if (!postId) return { type: 'INVALID_FIELD', message: 'Post does not exist' };
  const { message: { dataValues: { user: { email } } } } = await getPostById(id);
  if (email !== emailUser) return { type: 'INVALID_TOKEN', message: 'Unauthorized user' };
  const post = await BlogPost.findOne({ where: { id } });
  await post.destroy();
  return { type: null, message: '' };
};

module.exports = {
  findIdUser,
  addPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
