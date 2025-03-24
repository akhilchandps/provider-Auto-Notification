const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

// ✅ Create a new billing record
router.post('/billing', billingController.createBilling);

// ✅ Get all billing records
router.get('/billing', billingController.getAllBilling);

// ✅ Get billing records by provider ID
router.get('/billing/:provider_id', billingController.getBillingByProvider);

// ✅ Delete a billing record & send email
router.delete('/billing/:id', billingController.deleteBilling);

// ✅ Update a billing record
router.put('/billing/:id', billingController.updateBilling);

module.exports = router;
