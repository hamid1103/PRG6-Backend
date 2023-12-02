const express = require('express');
const { authenticate } = require('../Middlewares/auth.js')

const userRouter = express.Router();

userRouter.get('/profile', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

module.exports = userRouter;