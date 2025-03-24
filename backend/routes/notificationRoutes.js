const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// ✅ Send a system downtime notification
router.post('/notifications/system-downtime', notificationController.sendSystemDowntimeNotification);

// ✅ Get all notifications
router.get('/notifications', notificationController.getAllNotifications);

// ✅ Get a specific notification by ID
router.get('/notifications/:id', notificationController.getNotificationById);

// ✅ Mark a notification as read
router.put('/notifications/:id/mark-read', notificationController.markNotificationAsRead);

// ✅ Delete a notification (Admin Only)
router.delete('/notifications/:id/delete', notificationController.deleteNotification);


module.exports = router;
