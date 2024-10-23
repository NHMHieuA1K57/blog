const {uploadToCloudinary} = require('../config/cloudinaryConfig');
const Post = require('../models/post.model');
const Category = require('../models/category.model');

async function createPost(req, res, next) {
  console.log(req.user);  
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ message: "Vui lòng nhập tất cả các trường bắt buộc" });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Không có file ảnh nào được upload.' });
  }

  try {
    const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer, 'SDN302'));
    const images = await Promise.all(uploadPromises);

    const categoryData = await Category.findById(category);
    if (!categoryData) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }
    console.log('Author ID:', req.user._id);
    const newPost = new Post({
      title,
      category: categoryData._id,
      content,
      images,
      author: req.user._id,  // Đảm bảo giá trị này tồn tại
    });

    await newPost.save();  
    res.status(201).json({
      message: 'Tạo bài viết thành công',
      post: {
        id: newPost._id,
        title: newPost.title,
        content: newPost.content,
        images: newPost.images,
        category: {
          id: categoryData._id,
          name: categoryData.name,
        },
        author: {
          id: req.user._id, 
          name: req.user.name, 
        },
        createdAt: newPost.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updatePost(req, res, next) {
  const { title, content, category } = req.body;
  const postId = req.params.id;

  if (!title || !content || !category) {
    return res.status(400).json({ message: "Please fill in all required fields" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    let images = post.images;
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer, 'SDN302'));
      images = await Promise.all(uploadPromises);
    }

    const categoryData = await Category.findById(category);
    if (!categoryData) {
      return res.status(404).json({ message: "Category not found." });
    }
    post.title = title;
    post.content = content;
    post.category = categoryData._id;
    post.images = images;
    post.updatedAt = Date.now();

    await post.save();

    res.status(200).json({
      message: 'Post updated successfully',
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        images: post.images,
        category: {
          id: categoryData._id,
          name: categoryData.name,
        },
        author: {
          id: post.author,
          name: req.user.name, 
        },
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
}


const deletePost = async (req, res) => {
  const { id } = req.params; 

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết để xóa" });
    }

    res.status(200).json({ message: "Bài viết đã được xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa bài viết", error: error.message });
  }
};

async function detailPost(req, res, next) {
  const { id } = req.params; 
  try {
    const post = await Post.findById(id)
      .populate("author", "name email")
      .populate("category", "name")
      .populate("comments");

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    res.status(200).json({
      message: "Chi tiết bài viết",
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        category: post.category.name,
        images: post.images,
        comments: post.comments
      }
    });
  } catch (error) {
    next(error);
  }
}


async function listPost(req, res, next) {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .populate("category", "name")
      .populate("comments")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}


const PostController =
{
  createPost,
  updatePost,
  deletePost,
  detailPost,
  listPost,
};
module.exports = PostController;
