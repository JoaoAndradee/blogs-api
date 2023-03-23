const express = require('express');
const { postController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  validateToken,
  postController.post,
);

router.get(
  '/',
  validateToken,
  postController.getAllPosts,
);

router.get(
  '/:id',
  validateToken,
  postController.getPostId,
);

router.put(
  '/:id',
  validateToken,
  postController.updatePostId,
);

router.delete(
  '/:id',
  validateToken,
  postController.deletePostId,
);

module.exports = router;
