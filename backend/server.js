require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const billingRoutes = require('./routes/billingRoutes');
const sequelize = require('./config/database');
const providerRoutes = require('./routes/providerRoutes');
const notificationRoutes = require('./routes/notificationRoutes')
const { swaggerUi, specs } = require('./swagger'); // Import Swagger

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());


// Billing API Routes
app.use('/api', billingRoutes);
app.use('/api', providerRoutes);
app.use('/api', notificationRoutes);
// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



// Test database connection

sequelize.sync({ alter: true })
    .then(() => console.log('✅ Database & tables synced successfully!'))
    .catch(err => console.error('❌ Database sync error:', err));

// Routes
app.get('/', (req, res) => res.send('API is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


