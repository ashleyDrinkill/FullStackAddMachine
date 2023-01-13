const express = require('express')
const router = express.Router()
const reports = require('../controllers/reportController')

router.post('/', reports.delete);

module.exports = router;