const express = require("express");
const bodyParser = require("body-parser");
const { ReportController } = require("../controllers");
const { authenticationToken } = require("../authMiddleware/authenticationToken");

const reportRoute = express.Router();
reportRoute.use(bodyParser.json());

// Route tạo báo cáo cho một comment (cần xác thực)
reportRoute.post("/api/reports", authenticationToken, ReportController.createReport);

// Route lấy danh sách các báo cáo
reportRoute.get("/api/reports", authenticationToken, ReportController.getReports);

// Route khóa tài khoản người dùng từ báo cáo
reportRoute.put("/api/reports/:reportId/ban-user", authenticationToken, ReportController.banUserFromReport);

// Route xóa báo cáo
reportRoute.put("/api/reports/:reportId/dismiss", authenticationToken, ReportController.dismissReport);

module.exports = reportRoute;
