const express = require("express");

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

module.exports = app => app.use("/auth", router);