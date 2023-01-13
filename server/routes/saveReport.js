// request to save report to a file
const express = require('express')
const router = express.Router()
const reports = require('../controllers/reportController')

router.post('/', reports.export);

module.exports = router;