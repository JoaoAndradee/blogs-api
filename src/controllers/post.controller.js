const { verifyToken } = require('../auth/authFunctions');
const {
  addPost,
  findIdUser,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../services/post.service');
const { mapError } = require('../utils/errorMap');

const getInternalError = (err) => ({ message: 'Erro interno', error: err.message });

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
    return res.status(500).json(getInternalError(err));
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const allPosts = await getPosts();
    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(500).json(getInternalError(err));
  }
};

const getPostId = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await getPostById(id);
    if (type) return res.status(mapError(type)).json({ message });
    return res.status(200).json(message);
  } catch (err) {
    return res.status(500).json(getInternalError(err));
  }
};

const updatePostId = async (req, res) => {
  try {
    const { id: idPost } = req.params;
    const { title, content } = req.body;
    const token = req.headers.authorization;
    const { data: emailUser } = verifyToken(token);
    const { type, message } = await updatePost({ idPost, emailUser, title, content });
    if (type) return res.status(mapError(type)).json({ message });
    return res.status(200).json(message);
  } catch (err) {
    return res.status(500).json(getInternalError(err));
  }
};

const deletePostId = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const { data: emailUser } = verifyToken(token);
    const { type, message } = await deletePost({ emailUser, id });
    if (type) return res.status(mapError(type)).json({ message });
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json(getInternalError(err));
  }
};

module.exports = {
  post,
  getAllPosts,
  getPostId,
  updatePostId,
  deletePostId,
};
