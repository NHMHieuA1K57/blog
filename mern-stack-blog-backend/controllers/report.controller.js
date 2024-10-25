const Report = require("../models/report.model");
const Account = require("../models/account.model");
const Comment = require("../models/comment.model");

// Tạo báo cáo mới
async function createReport(req, res, next) {
    const { commentId, reason } = req.body;
    const userId = req.user.id;

    try {
        const existingReport = await Report.findOne({ comment: commentId, reportedBy: userId });

        if (existingReport) {
            return res.status(400).json({ message: "Bạn đã báo cáo comment này rồi" });
        }

        const newReport = new Report({
            comment: commentId,
            reportedBy: userId,
            reason,
        });

        await newReport.save();
        res.status(201).json({ message: "Báo cáo đã được gửi thành công", data: newReport });
    } catch (err) {
        next(err);
    }
}

// Lấy danh sách các báo cáo (dành cho admin)
async function getReports(req, res, next) {
    try {
        const reports = await Report.find({ status: "Pending" })
            .populate("comment", "content")
            .populate("reportedBy", "name");
        res.status(200).json({ message: "Danh sách báo cáo", data: reports });
    } catch (err) {
        next(err);
    }
}

// Ban user từ một báo cáo
async function banUserFromReport(req, res, next) {
    const { reportId } = req.params;

    try {
        const report = await Report.findById(reportId).populate("comment");

        if (!report) {
            return res.status(404).json({ message: "Report không tồn tại" });
        }

        const comment = await Comment.findById(report.comment._id).populate("account");
        if (!comment) {
            return res.status(404).json({ message: "Comment không tồn tại" });
        }

        const user = await Account.findById(comment.account._id);
        if (!user) {
            return res.status(404).json({ message: "Tài khoản không tồn tại" });
        }

        user.isBan = true;
        await user.save();

        report.status = "Resolved";
        await report.save();

        res.status(200).json({ message: "Tài khoản đã bị khóa thành công" });
    } catch (err) {
        next(err);
    }
}

// Xóa báo cáo (chuyển trạng thái thành "Dismissed")
async function dismissReport(req, res, next) {
    const { reportId } = req.params;

    try {
        const report = await Report.findById(reportId);

        if (!report) {
            return res.status(404).json({ message: "Report không tồn tại" });
        }

        report.status = "Dismissed";
        await report.save();

        res.status(200).json({ message: "Report đã được xóa thành công" });
    } catch (err) {
        next(err);
    }
}
const ReportController = {
    createReport,
    getReports,
    banUserFromReport,
    dismissReport,
};

module.exports = ReportController;

