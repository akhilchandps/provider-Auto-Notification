const Notification = require("../models/Notification")
const Provider = require('../models/Provider')
const { sendEmail } = require('../utils/emailService');

exports.sendSystemDowntimeNotification = async (req, res) => {
    try {
        const { message } = req.body;

        const providers = await Provider.findAll();

        const notifications = await Promise.all(
            providers.map(provider => 
                Notification.create({
                    provider_id: provider.id,
                    type: 'system',
                    message: message,
                    status: 'unread'
                })
            )
        );

        for (const provider of providers) {
            const subject = 'System Downtime Notification';
            await sendEmail(provider.email, subject, message);
        }

        res.status(201).json({ message: 'System downtime notification sent successfully', notifications });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByPk(id);
        if (!notification) return res.status(404).json({ error: 'Notification not found' });

        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Mark Notification as Read

exports.markNotificationAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByPk(id);
        if (!notification) return res.status(404).json({ error: 'Notification not found' });

        await notification.update({ status: 'read' });

        res.json({ message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete Notification (Admins Only)
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByPk(id);
        if (!notification) return res.status(404).json({ error: 'Notification not found' });

        // ✅ Find the Provider
        const provider = await Provider.findByPk(notification.provider_id);
        if (!provider) return res.status(404).json({ error: 'Provider not found' });
      // ✅ Store Notification Details Before Deleting
      const message = `Your notification regarding "${notification.message}" has been removed from the system.`;

      // ✅ Delete Notification
      await notification.destroy();

      // ✅ Send Email to Provider
      const subject = `Notification Removed: ${notification.type}`;
      await sendEmail(provider.email, subject, message);

        res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


