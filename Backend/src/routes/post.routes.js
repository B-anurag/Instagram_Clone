const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controller')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require('../middlewares/auth.middleware');

/**
 * post/api/posts [protected]
 */
 // /api/posts/
postRouter.post('/',upload.single('image'), identifyUser , postController.createPostController);     

//api/posts/ [protected]
postRouter.get("/", identifyUser, postController.getPostController);

//api/posts/details/:postId
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController);

/**
 * @route POST /api/posts/like/:postId
 * @description like a post with id provided in the request params.  
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController);

module.exports = postRouter;