const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

/**
 * @swagger
 * /api/notifications/system-downtime:
 *   post:
 *     summary: Send a system downtime notification
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Scheduled maintenance on March 20, 2025 from 2 AM to 5 AM."
 *     responses:
 *       201:
 *         description: Notification sent successfully
 *       403:
 *         description: Permission denied
 *       500:
 *         description: Server error
 */
router.post('/notifications/system-downtime', notificationController.sendSystemDowntimeNotification);

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: List of notifications
 *       500:
 *         description: Server error
 */
router.get('/notifications', notificationController.getAllNotifications);

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Get a specific notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Notification details
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */
router.get('/notifications/:id', notificationController.getNotificationById);

/**
 * @swagger
 * /api/notifications/{id}/mark-read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */
router.put('/notifications/:id/mark-read', notificationController.markNotificationAsRead);

/**
 * @swagger
 * /api/notifications/{id}/delete:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Notification deleted
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Server error
 */
router.delete('/notifications/:id/delete',notificationController.deleteNotification);



/**
 * @swagger
 * /api/notifications/admin-message:
 *   post:
 *     summary: Send an admin message to a provider
 *     tags: [Provider Messages]
 *     security:
 *       - BearerAuth: []
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
 *               message:
 *                 type: string
 *                 example: "Reminder: Please complete compliance training by March 30."
 *     responses:
 *       201:
 *         description: Admin message sent successfully
 *       403:
 *         description: Permission denied
 *       500:
 *         description: Server error
 */
router.post('/notifications/admin-message', notificationController.sendAdminMessage);

module.exports = router;
