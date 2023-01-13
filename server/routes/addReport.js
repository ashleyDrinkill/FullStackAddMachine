const express = require('express')
const router = express.Router()
const reports = require('../controllers/reportController')

// POST request with the report name
router.post('/', reports.create)

module.exports = router;