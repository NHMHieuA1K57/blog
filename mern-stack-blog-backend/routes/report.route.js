// routes/reports.js
const express = require('express');
const { getReportedComments, deleteReport } = require('../controllers/report.controller');
const router = express.Router();

router.get('/comments/reports', getReportedComments);

// Route để xóa report của một comment
router.delete('/comments/reports/:commentId', deleteReport);

module.exports = router;
