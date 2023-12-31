import express from "express";
import {adminAuthorize, authenticate} from "../Middlewares/auth.js";
const userRouter = express.Router();

userRouter.get('/profile', authenticate, (req, res) => {
    res.json(req.user);
});
userRouter.get('/admin', authenticate, adminAuthorize, (req, res) => {
    res.json({ message: `Welcome admin ${req.user.username}` });
});

export {userRouter}