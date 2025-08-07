const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const isAdmin = require('../middleware/adminMiddleware.js');

router.post('/', isAdmin, postController.createPost);
router.put('/:id', isAdmin, postController.updatePost);
router.delete('/:id', isAdmin, postController.deletePost);
router.get('/', postController.getAllPosts); // no admin required here
router.get('/:id', postController.getPostDetails); // no admin required here

module.exports = router;
