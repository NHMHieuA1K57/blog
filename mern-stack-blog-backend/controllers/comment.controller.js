const Comment = require('../models/comment.model');
const Post = require('../models/post.model');

// Add a new comment
async function addComment(req, res, next) {
    const { postId, content, parent, replyOnUser } = req.body;
    const userId = req.user.id; // Get the user ID from the authenticated request

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = new Comment({
            post: postId,
            account: userId,
            content,
            parent: parent || null, // If parent comment is provided, use it, otherwise it's null
            replyOnUser: replyOnUser || null, // Same for replyOnUser
        });

        await newComment.save();

        // Optionally: Add comment to post's comment array
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({
            message: "Comment added successfully",
            data: newComment,
        });
    } catch (err) {
        next(err);
    }
}

// Update a comment
async function updateComment(req, res, next) {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.account.toString() !== userId) {
            return res.status(403).json({ message: "You are not allowed to update this comment" });
        }

        comment.content = content;
        await comment.save();

        res.status(200).json({ message: "Comment updated successfully", data: comment });
    } catch (err) {
        next(err);
    }
}

// Delete a comment
async function deleteComment(req, res, next) {
    const { commentId } = req.params;
    const userId = req.user.id;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.account.toString() !== userId) {
            return res.status(403).json({ message: "You are not allowed to delete this comment" });
        }

        await comment.deleteOne();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        next(err);
    }
}

// Report a comment
async function reportComment(req, res, next) {
    const { commentId } = req.params;
    const userId = req.user.id; // Get the user ID from the authenticated request

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check if the user has already reported this comment
        if (comment.reported_by.includes(userId)) {
            return res.status(400).json({ message: "You have already reported this comment" });
        }

        // Add user ID to reported_by array
        comment.reported_by.push(userId);
        await comment.save();

        res.status(200).json({ message: "Comment reported successfully" });
    } catch (err) {
        next(err);
    }
}

// Get replies of a comment
async function getReplies(req, res, next) {
    const { commentId } = req.params;

    try {
        const replies = await Comment.find({ parent: commentId }).populate('account', 'username');
        res.status(200).json({ message: "Replies fetched successfully", data: replies });
    } catch (err) {
        next(err);
    }
}

// Get all comments
async function getAllComments(req, res, next) {
    try {
        const comments = await Comment.find()
            .populate('account', 'username') // Populate account field to get username
            .populate('post', 'title') // Populate post field to get post title
            .populate('replyOnUser', 'username') // Populate replyOnUser field to get username
            .exec();
        
        res.status(200).json({
            message: "Comments fetched successfully",
            data: comments,
        });
    } catch (err) {
        next(err);
    }
}


const CommentController = { addComment, updateComment, deleteComment, reportComment, getReplies, getAllComments };

module.exports = CommentController;
