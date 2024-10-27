const { create } = require("../models/account.model");
const Category = require("../models/category.model");

async function createCategory(req, res, next) {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Vui lòng nhập tên danh mục" });
  }
  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json({
      message: "Tạo danh mục thành công",
      category: {
        newCategory,
        createdAt: newCategory.createdAt,
      },
    });
  } catch (error) {
    next({
      message: error.message,
    });
  }
}

async function getCategories(req, res, next) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next({
      message: error.message,
    });
  }
}

async function deleteCategory(req, res, next) {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Cannot find category" });
    }
    res.status(200).json({ message: "Delete category successfully" });
  } catch (error) {
    next({
      message: error.message,
    });
  }
}

const CateController = {
  createCategory,
  getCategories,
  deleteCategory,
};

module.exports = CateController;
