const express = require("express");
const {
    createNotification,
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification
} = require("../controllers/notification.controller");
const { authenticationToken } = require("../authMiddleware/authenticationToken");

const notificationRoute = express.Router();

// Route để tạo thông báo mới (cần xác thực)
notificationRoute.post("/api/notifications", authenticationToken, createNotification);

// Route để lấy danh sách thông báo của một người dùng (cần xác thực)
notificationRoute.get("/api/notifications/:userId", authenticationToken, getUserNotifications);

// Route để đánh dấu thông báo là đã đọc (cần xác thực)
notificationRoute.patch("/api/notifications/:notificationId/read", authenticationToken, markNotificationAsRead);

// Route để xóa thông báo (cần xác thực)
notificationRoute.delete("/api/notifications/:notificationId", authenticationToken, deleteNotification);

module.exports = notificationRoute;
