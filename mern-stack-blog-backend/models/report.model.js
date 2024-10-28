const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    reportedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account', // Tham chiếu đến người dùng bị báo cáo
        required: true
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account', // Tham chiếu đến người dùng thực hiện báo cáo
        required: true
    },
    reason: {
        type: String,
        required: true // Lý do báo cáo
    },
    reportedComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // Tham chiếu đến bình luận bị báo cáo (nếu có)
        default: null
    }
}, {
    timestamps: true, // Tự động tạo các trường createdAt và updatedAt
    versionKey: false,
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
