const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            required: true,
        },
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },
        reason: {
            type: String,
            required: [true, "Reason for report is required"],
        },
        status: {
            type: String,
            enum: ["Pending", "Resolved", "Dismissed"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
