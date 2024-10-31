// reportsController.js
const Comment = require('../models/comment.model');

async function getReportedComments(req, res) {
    try {
        const reportedComments = await Comment.find({ reported_by: { $exists: true, $ne: [] } })
            .populate('post', 'title')  // Assuming 'title' is a field in the Post model
            .populate('account', 'name') // Assuming 'name' is a field in the Account model
            .populate('reported_by', 'name') // To get names of users who reported
            .exec();

        res.status(200).json(reportedComments);
    } catch (error) {
        console.error("Error fetching reported comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const reportController =
{
    getReportedComments
};
module.exports = reportController;
