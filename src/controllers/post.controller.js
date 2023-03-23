const { verifyToken } = require('../auth/authFunctions');
const { addPost, findIdUser, getPosts } = require('../services/post.service');
const { mapError } = require('../utils/errorMap');

const post = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const token = req.headers.authorization;
    const { data } = verifyToken(token);
    const userId = await findIdUser(data);
    const { type, message } = await addPost({ title, content, userId, categoryIds });
    if (type) return res.status(mapError(type)).json({ message });
    res.status(201).json(message);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const allPosts = await getPosts();
    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = {
  post,
  getAllPosts,
};
