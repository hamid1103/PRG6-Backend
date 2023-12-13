import express from 'express'
import {adminAuthorize, authenticate} from "../Middlewares/auth.js";
import {findCrop, findCrops, getCrops} from "../Controllers/cropController.js";
import {deleteCrop, registerNewCrop} from "../Controllers/Creator/cropControllerCreator.js";
import {creatorRouter} from "./creator.js";

const cropRouter = express.Router();

cropRouter.delete('/:name', authenticate, adminAuthorize, deleteCrop)

cropRouter.options("/:name", (req, res) => {
    res.header('Allow', 'DELETE');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

cropRouter.post('/', registerNewCrop)

cropRouter.get('/', getCrops)
cropRouter.options("/", (req, res) => {
    res.header('Allow', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

cropRouter.get('/findCrops/:name', findCrops)
cropRouter.get('/:name',findCrop)

export {cropRouter}