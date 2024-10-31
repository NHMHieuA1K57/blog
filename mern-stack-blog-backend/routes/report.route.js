// routes/reports.js
const express = require('express');
const { getReportedComments } = require('../controllers/report.controller');
const router = express.Router();

router.get('/comments/reports', getReportedComments);

module.exports = router;
