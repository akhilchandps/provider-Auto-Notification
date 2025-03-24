const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Billing = sequelize.define('Billing', {
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
    consultation_id: {  
        type: DataTypes.UUID,  
        allowNull: false  
    },
    duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    billing_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    date_range: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'billing'
});

module.exports = Billing;
