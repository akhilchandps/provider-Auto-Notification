const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Provider = sequelize.define('Provider', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    license_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'providers'
});

module.exports = Provider;
