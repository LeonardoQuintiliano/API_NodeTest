const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");

const User = require("../models/user");

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
    } catch (error) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});