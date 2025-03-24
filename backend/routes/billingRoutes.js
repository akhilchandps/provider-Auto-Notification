const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

// Create a new billing record
/**
 * @swagger
 * /api/billing:
 *   post:
 *     summary: Create a new billing record
 *     tags: [Billing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider_id:
 *                 type: string
 *                 format: uuid
 *               consultation_id:
 *                 type: string
 *                 format: uuid
 *               duration_minutes:
 *                 type: integer
 *               billing_amount:
 *                 type: number
 *                 format: float
 *               date_range:
 *                 type: string
 *     responses:
 *       201:
 *         description: Billing record created successfully
 *       500:
 *         description: Server error
 */

router.post('/billing',billingController.createBilling);




/**
 * @swagger
 * /api/billing:
 *   get:
 *     summary: Get all billing records
 *     tags: [Billing]
 *     responses:
 *       200:
 *         description: Returns all billing records
 *       500:
 *         description: Server error
 */
router.get('/billing', billingController.getAllBilling);




/**
 * @swagger
 * /api/billing/{provider_id}:
 *   get:
 *     summary: Get billing records by provider ID
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: provider_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The provider ID to fetch billing records for
 *     responses:
 *       200:
 *         description: Returns billing records for the provider
 *       500:
 *         description: Server error
 */
router.get('/billing/:provider_id', billingController.getBillingByProvider);


/**
 * @swagger
 * /api/billing/{id}:
 *   delete:
 *     summary: Delete a billing record, remove notifications, and send email
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Billing record deleted and email sent
 *       404:
 *         description: Billing record or provider not found
 *       500:
 *         description: Server error
 */
router.delete('/billing/:id', billingController.deleteBilling);

/**
 * @swagger
 * /api/billing/{id}:
 *   put:
 *     summary: Update a billing record
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               duration_minutes:
 *                 type: integer
 *               billing_amount:
 *                 type: number
 *               date_range:
 *                 type: string
 *     responses:
 *       200:
 *         description: Billing record updated successfully
 *       404:
 *         description: Billing record not found
 *       500:
 *         description: Server error
 */
router.put('/billing/:id', billingController.updateBilling);

module.exports = router;



