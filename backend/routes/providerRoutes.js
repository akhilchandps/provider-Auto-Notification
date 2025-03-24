const express = require('express');

const router = express.Router();
const providerController = require('../controllers/providerController');


router.post('/providers', providerController.createProvider);

module.exports = router;
