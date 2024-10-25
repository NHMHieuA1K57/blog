const express = require('express');
const PostController = require('../controllers/post.controller'); 
const { upload } = require('../config/cloudinaryConfig');
const { authorizeAdmin,authenticationToken} = require('../authMiddleware/authenticationToken');

const router = express.Router();

router.post('/addPost',authenticationToken,authorizeAdmin,upload.array('images', 5), PostController.createPost);
router.put('/update-post/:id',authenticationToken,authorizeAdmin,upload.array('images', 5),PostController.updatePost);
router.get('/detail/:id',PostController.detailPost);
router.delete('/delete-post/:id',authenticationToken,authorizeAdmin,PostController.deletePost);
router.get('/all-post',PostController.listPost)

module.exports = router;