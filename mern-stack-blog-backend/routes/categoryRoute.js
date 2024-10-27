const express = require('express');
const CateController = require('../controllers/category.controller'); 


const router = express.Router();

router.post('/addCate', CateController.createCategory);
router.get("/all-cate", CateController.getCategories);
router.delete("/delete-cate/:id", CateController.deleteCategory);
module.exports = router;