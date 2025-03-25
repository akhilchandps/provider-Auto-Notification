const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Notification = sequelize.define('Notification', {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    provider_id: {  
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'providers',
            key: 'id'
        }
    },
    type: { type: DataTypes.ENUM('consultation', 'system', 'billing', 'license_expiry'), allowNull: false },

    message: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    status: { 
        type: DataTypes.ENUM('unread', 'read'), 
        defaultValue: 'unread' 
    }
}, { 
    timestamps: true,
    tableName: 'notifications'
});

module.exports = Notification;
