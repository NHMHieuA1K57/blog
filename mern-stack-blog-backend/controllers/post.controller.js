const cloudinary = require('../Config/cloudinaryConfig');
const Post = require('../models/post.model');
const Category = require('../models/category.model'); // Đảm bảo đã import model Category

async function createPost(req, res, next) {
  const { title, content, category ,author} = req.body;

  if (!title || !content || !category || !author) {
    return res.status(400).json({ message: "Vui lòng nhập tất cả các trường bắt buộc" });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Không có file ảnh nào được upload.' });
  }

  try {
    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              return reject(new Error('Lỗi khi upload ảnh lên Cloudinary'));
            }
            resolve(result.secure_url);
          }
        );
        uploadStream.end(file.buffer);
      });
    });

    const images = await Promise.all(uploadPromises);

    // Tìm danh mục theo ID
    const categoryData = await Category.findById(category);
    if (!categoryData) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }

    // Tạo bài viết mới
    const newPost = new Post({
      title,
      category: categoryData._id, 
      content,
      images: images,
      author: author,
    });

    await newPost.save();

    res.status(201).json({
      message: 'Tạo bài viết thành công',
      post: {
        id: newPost._id,
        title: newPost.title,
        caption: newPost.caption,
        content: newPost.content,
        images: newPost.images,
        category: {
          id: categoryData._id,
          name: categoryData.name,
        },
        author: {
          id: newPost.author
        },
        createdAt: newPost.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updatePost(req, res, next) {
  const { title, caption, content, category } = req.body;
  const postId = req.params.postId;

  if (!title || !caption || !content || !category) {
    return res.status(400).json({ message: "Vui lòng nhập tất cả các trường" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Bạn không có quyền cập nhật bài viết này" });
    }


    post.title = title;
    post.caption = caption;
    post.content = content;
    post.category = category;


    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) {
                return reject(new Error('Lỗi khi upload ảnh lên Cloudinary'));
              }
              resolve(result.secure_url);
            }
          );
          uploadStream.end(file.buffer);
        });
      });
      const images = await Promise.all(uploadPromises);
      post.images = images;
    }

    await post.save();
    res.status(200).json({ message: "Cập nhật bài viết thành công", post });
  } catch (error) {
    next(error);
  }
}


async function deletePost(req, res, next) {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Bạn không có quyền xóa bài viết này" });
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Xóa bài viết thành công" });
  } catch (error) {
    next(error);
  }
}

async function getPostById(req, res, next) {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId)
      .populate("author", "name email")
      .populate("category", "name")
      .populate("comments");

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
}


async function listPosts(req, res, next) {
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
  getPostById,
  listPosts,
};
module.exports = PostController;
