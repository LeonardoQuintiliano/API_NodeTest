const express = require("express");
const bcrypt = require('bcryptjs');

const User = require("../models/user");

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body;
        if(await User.findOne({ email }))
            return res.status(400).send({ error: "User already exists" });
        
        const user = await User.create(req.body);
        return res.send({ user });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/autenticate', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Invalid password' });

        res.send({ user });
    } catch (error) {
        console.log(error);
    }
})

module.exports = app => app.use("/auth", router);