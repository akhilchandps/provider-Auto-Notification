const express = require('express');
const { licenseExpiry } = require('../controllers/licenseController');
const router = express.Router();


// license expiry

router.get("/check-license-expiry", licenseExpiry);

module.exports = router;
