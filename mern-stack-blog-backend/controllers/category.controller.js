const Category = require("../models/category.model"); 

async function createCategory(req, res, next) {
    const { name, description } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: "Vui lòng nhập tên danh mục" });
    }
    try {
      const newCategory = new Category({ name, description });
      await newCategory.save();
      res.status(201).json({ message: "Tạo danh mục thành công", category: newCategory });
    } catch (error) {
      next(error);
    }
  }


  const CateController = {
    createCategory
  };
  module.exports = CateController;