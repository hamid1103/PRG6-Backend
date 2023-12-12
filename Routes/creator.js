import {deleteCrop, registerNewCrop} from "../Controllers/Creator/cropControllerCreator.js";
import express from "express";
import {adminAuthorize, authenticate} from "../Middlewares/auth.js";
const creatorRouter = express.Router();

//Crops Stuff
creatorRouter.post('/newCrop', authenticate, adminAuthorize, registerNewCrop)
creatorRouter.options("/newCrop", (req, res) => {
    res.header('Allow', 'POST');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

creatorRouter.delete('/removeCrop/:name', authenticate, adminAuthorize, deleteCrop)

creatorRouter.options("/removeCrop", (req, res) => {
    res.header('Allow', 'DELETE');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

export {creatorRouter}