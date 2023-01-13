const express = require('express')
const router = express.Router()
const reports = require('../controllers/reportController')

// GET request to get all reports from database
router.get('/', reports.findAll);

module.exports = router;