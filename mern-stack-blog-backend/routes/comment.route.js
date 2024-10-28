const bodyParser = require("body-parser");
const express = require("express");
const { CommentController } = require("../controllers");
const { authenticationToken } = require("../authMiddleware/authenticationToken");

const commentRoute = express.Router();
commentRoute.use(bodyParser.json());

// Route thêm mới comment (cần xác thực)
commentRoute.post("/api/comments", authenticationToken, async (req, res, next) => {
    CommentController.addComment(req, res, next);
});

// Route cập nhật comment (cần xác thực)
commentRoute.patch("/api/comments/:commentId", authenticationToken, async (req, res, next) => {
    CommentController.updateComment(req, res, next);
});

// Route xóa comment (cần xác thực)
commentRoute.delete("/api/comments/:commentId", authenticationToken, async (req, res, next) => {
    CommentController.deleteComment(req, res, next);
});

// Route báo cáo comment (cần xác thực)
commentRoute.post("/api/comments/:commentId/report", authenticationToken, async (req, res, next) => {
    CommentController.reportComment(req, res, next);
});

// Route lấy danh sách replies của một comment (không yêu cầu xác thực)
commentRoute.get("/api/comments/:commentId/replies", async (req, res, next) => {
    CommentController.getReplies(req, res, next);
});

// Route lấy danh sách tất cả comment
commentRoute.get("/api/allComments", async (req, res, next) => {
    CommentController.getAllComments(req, res, next);
});

commentRoute.get("/api/posts/:postId/comments", async (req, res, next) => {
    CommentController.getCommentsByPost(req, res, next);
});


module.exports = commentRoute;
