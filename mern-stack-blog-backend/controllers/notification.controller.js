const Notification = require("../models/notification.model");

// Hàm để tạo thông báo mới
const createNotification = async (req, res) => {
    const { recipient, content, type, reference, onModel } = req.body;

    try {
        const notification = new Notification({
            recipient,
            content,
            type,
            reference,
            onModel
        });
        await notification.save();
        res.status(201).json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi tạo thông báo", error: error.message });
    }
};

// Hàm để lấy danh sách thông báo của một người dùng
const getUserNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy danh sách thông báo", error: error.message });
    }
};

// Hàm để đánh dấu thông báo là đã đọc
const markNotificationAsRead = async (req, res) => {
    const { notificationId } = req.params;

    try {
        const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
        if (!notification) return res.status(404).json({ success: false, message: "Thông báo không tồn tại" });
        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi cập nhật trạng thái thông báo", error: error.message });
    }
};

// Hàm để xóa thông báo
const deleteNotification = async (req, res) => {
    const { notificationId } = req.params;

    try {
        const notification = await Notification.findByIdAndDelete(notificationId);
        if (!notification) return res.status(404).json({ success: false, message: "Thông báo không tồn tại" });
        res.status(200).json({ success: true, message: "Đã xóa thông báo thành công" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi xóa thông báo", error: error.message });
    }
};


const NotificationController = {
    createNotification,
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification,
};

module.exports = NotificationController;