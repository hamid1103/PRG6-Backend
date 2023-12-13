import express from 'express'
import {adminAuthorize, authenticate} from "../Middlewares/auth.js";
import {findCrop, findCrops, getCrops} from "../Controllers/cropController.js";
import {deleteCrop, registerNewCrop, updateCrop} from "../Controllers/Creator/cropControllerCreator.js";
import {creatorRouter} from "./creator.js";

const cropRouter = express.Router();

cropRouter.delete('/:id', deleteCrop)
cropRouter.put('/:id', updateCrop)

cropRouter.post('/', registerNewCrop)

cropRouter.get('/', getCrops)
cropRouter.options("/", (req, res) => {
    res.header('Allow', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

cropRouter.get('/findCrops/:id', findCrops)
cropRouter.get('/:id',findCrop)
cropRouter.options("/:id", (req, res) => {
    res.header('Allow', 'GET, DELETE, PUT, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, DELETE, PUT, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

export {cropRouter}