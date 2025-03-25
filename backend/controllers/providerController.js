const  Provider = require('../models/Provider');


// ✅ Create a new provider
exports.createProvider = async (req, res) => {
    try {
        const { name, email, specialization, license_number, license_expiry_date, state } = req.body;

        // ✅ Check if the provider already exists
        const existingProvider = await Provider.findOne({ where: { email } });
        if (existingProvider) {
            return res.status(400).json({ error: 'Provider with this email already exists' });
        }

        // ✅ Create a new provider
        const provider = await Provider.create({
            name,
            email,
            specialization,
            license_number,
            license_expiry_date,
            state
        });

        res.status(201).json({ message: 'Provider created successfully', provider });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};