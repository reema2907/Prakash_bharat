const express = require('express');
const router = express.Router();
const Form = require('../models/ComplaintForm');

router.post('/Form-Submit', async (req, res) => {
    const { description, address, latitude, longitude } = req.body;

    try {
        const newForm = new Form({
            description,
            address,
            latitude,
            longitude
        });

        await newForm.save();
        res.status(201).json({ message: 'Form submitted successfully', newForm });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
