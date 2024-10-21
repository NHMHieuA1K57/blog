const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [5000, "Title cannot exceed 5000 characters"]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  images: [String],
  
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "Author is required"],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
},{
  timestamps: true,
  versionKey: false
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;