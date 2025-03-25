require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const billingRoutes = require('./routes/billingRoutes');
const sequelize = require('./config/database');
const providerRoutes = require('./routes/providerRoutes');
const notificationRoutes = require('./routes/notificationRoutes')
const swaggerUi = require('swagger-ui-express');
const consultationRoutes = require("./routes/consultationRoutes");
const licenseRoutes = require("./routes/licenseRoutes");
const fs = require('fs');
const path = require('path');

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());


// Swagger UI
const swaggerFilePath = path.join(__dirname, 'swagger', 'swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));

// Billing API Routes
app.use('/api', billingRoutes);
app.use('/api', providerRoutes);
app.use('/api', notificationRoutes);



// Routes
app.use("/api/consultations", consultationRoutes);
app.use("/api/license", licenseRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));






// Test database connection

sequelize.sync({ alter: true })
    .then(() => console.log('✅ Database & tables synced successfully!'))
    .catch(err => console.error('❌ Database sync error:', err));

// Routes
app.get('/', (req, res) => res.send('API is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


