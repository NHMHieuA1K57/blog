const express = require('express');
const PostController = require('../controllers/post.controller'); 
const upload = require('../config/upload');

const router = express.Router();

router.post('/addPost', upload.array('images', 5), PostController.createPost);

module.exports = router;