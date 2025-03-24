const  Provider = require('../models/Provider');

exports.createProvider = async (req, res) => {
    try {
        const { name, email, license_number, specialization } = req.body;

        const existingProvider = await Provider.findOne({ where: { email } });
        if (existingProvider) {
            return res.status(400).json({ error: 'Provider with this email already exists' });
        }

        const provider = await Provider.create({ name, email, license_number, specialization });

        res.status(201).json({
            message: 'Provider created successfully',
            provider
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
