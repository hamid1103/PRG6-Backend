import express from 'express'
import {authenticate} from "../Middlewares/auth.js";
import {findCrop, findCrops, getCrops} from "../Controllers/cropController.js";

const cropRouter = express.Router();

cropRouter.get('/', getCrops)
cropRouter.options("/", (req, res) => {
    res.header('Allow', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

cropRouter.get('/findCrops/:name', findCrops)
cropRouter.get('/:name',findCrop)

export {cropRouter}