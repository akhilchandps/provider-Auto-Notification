const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Billing API Documentation',
            version: '1.0.0',
            description: 'API documentation for managing billing records',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local server'
            }
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
