const express = require('express');
const CateController = require('../controllers/category.controller'); 


const router = express.Router();

router.post('/addCate', CateController.createCategory);

module.exports = router;