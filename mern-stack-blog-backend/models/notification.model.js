const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    recipient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account',  // Người nhận thông báo, có thể là admin hoặc user
        required: true 
    },
    content: { 
        type: String,  // Nội dung chi tiết của thông báo
        required: true 
    },
    type: { 
        type: String, 
        enum: ['comment', 'report', 'ban', 'other'],  // Loại thông báo
        required: true 
    },
    reference: { 
        type: mongoose.Schema.Types.ObjectId,  // Tham chiếu đến đối tượng liên quan, ví dụ: comment, post
        refPath: 'onModel' 
    },
    onModel: {
        type: String, 
        enum: ['Comment', 'Post'],  // Cho phép tham chiếu đến các collection khác nhau
        required: true
    },
    isRead: { 
        type: Boolean, 
        default: false  // Trạng thái đã đọc hoặc chưa
    },
},{
    timestamps: true,
    versionKey: false
})

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;