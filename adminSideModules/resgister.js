const express = require('express');
const router = express.Router();

const Admin = require('../models/adminSchema');

//User Regestration 
module.exports = router.post('/resgister', async (req, res) => {
    const { adminName, phone, email, adminPassword, cPassword } = req.body;

    try {
        if (!adminName || !phone || !email || !adminPassword || !cPassword) {
            return res.status(422).json({ error: "Please filled the form properly" })
        }
        const userExist = await Admin.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Please filled the form properly" })
        }
        else if (adminPassword != cPassword) {
            return res.status(422).json({ error: "Passowrds are not matching" })
        }
        else {
            const admin = new Admin({ adminName, phone, email, adminPassword });

            await admin.save();

            res.status(201).json({ message: "user registered successfully" });
        }

    } catch (error) {
        console.log(error);
    }
});
