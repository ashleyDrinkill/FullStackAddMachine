const express = require('express')
const router = express.Router()
const reports = require('../controllers/reportController')

// POST request with report ID to get the numbers accociated with that report
router.post('/', reports.findByPk);

module.exports = router;