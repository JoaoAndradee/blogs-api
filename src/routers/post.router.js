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

module.exports = router;
